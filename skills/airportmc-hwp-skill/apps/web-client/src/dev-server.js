import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 3000;
const htmlPath = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
  const html = fs.readFileSync(htmlPath, 'utf8');
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(port, () => {
  console.log(`airportmc-hwp web-client listening on :${port}`);
});
