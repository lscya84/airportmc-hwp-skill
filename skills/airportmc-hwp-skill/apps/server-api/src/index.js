import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../../..');
const templatesDir = path.join(root, 'templates');
const port = process.env.PORT || 4000;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function listTemplates() {
  if (!fs.existsSync(templatesDir)) return [];
  return fs.readdirSync(templatesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const schemaPath = path.join(templatesDir, d.name, 'schema.json');
      if (!fs.existsSync(schemaPath)) return null;
      return readJson(schemaPath);
    })
    .filter(Boolean);
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload, null, 2));
}

function collectBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function validatePayload(schema, payload) {
  const errors = [];
  for (const field of schema.fields || []) {
    const value = payload[field.key];
    if (field.required && (value === undefined || value === null || value === '')) {
      errors.push(`${field.key} is required`);
    }
  }
  return { ok: errors.length === 0, errors };
}

function fillTemplateText(templateText, mapping, payload) {
  let output = templateText;
  const appliedFields = [];
  for (const [key, placeholder] of Object.entries(mapping.placeholders || {})) {
    const raw = payload[key] ?? '';
    output = output.split(placeholder).join(String(raw));
    appliedFields.push(key);
  }
  return { output, appliedFields };
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/health') {
      return sendJson(res, 200, { ok: true, service: 'airportmc-hwp-server-api' });
    }

    if (req.method === 'GET' && req.url === '/templates') {
      const templates = listTemplates().map(({ templateId, title, fields }) => ({ templateId, title, fields }));
      return sendJson(res, 200, { templates });
    }

    if (req.method === 'POST' && req.url?.startsWith('/templates/') && req.url?.endsWith('/fill')) {
      const [, , templateId] = req.url.split('/');
      const body = await collectBody(req);
      const payload = body ? JSON.parse(body) : {};
      const schemaPath = path.join(templatesDir, templateId, 'schema.json');
      const mappingPath = path.join(templatesDir, templateId, 'mapping.json');
      const templateTextPath = path.join(templatesDir, templateId, 'template.txt');
      if (!fs.existsSync(schemaPath)) {
        return sendJson(res, 404, { error: 'template_not_found', templateId });
      }
      const schema = readJson(schemaPath);
      const mapping = fs.existsSync(mappingPath) ? readJson(mappingPath) : {};
      const validation = validatePayload(schema, payload);
      if (!validation.ok) {
        return sendJson(res, 400, { error: 'validation_failed', validation });
      }

      let filledPreview = null;
      let appliedFields = [];
      if (fs.existsSync(templateTextPath)) {
        const templateText = fs.readFileSync(templateTextPath, 'utf8');
        const result = fillTemplateText(templateText, mapping, payload);
        filledPreview = result.output;
        appliedFields = result.appliedFields;
      }

      return sendJson(res, 200, {
        ok: true,
        templateId,
        payload,
        validation,
        appliedFields,
        filledPreview,
        message: filledPreview
          ? 'Preview fill completed using template.txt placeholder substitution.'
          : 'Template preview file not present yet. Document mutation engine not wired.'
      });
    }

    return sendJson(res, 404, { error: 'not_found' });
  } catch (error) {
    return sendJson(res, 500, { error: 'internal_error', message: String(error) });
  }
});

server.listen(port, () => {
  console.log(`airportmc-hwp server-api listening on :${port}`);
});
