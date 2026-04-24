import type { DocumentSession } from '../../document-core/src/index';
import type { TemplateDefinition, TemplatePayload } from '../../field-schema/src/index';

export interface FillReport {
  appliedFields: string[];
  warnings?: string[];
}

export interface TemplateEngine {
  detectTargets(session: DocumentSession, template: TemplateDefinition): Promise<Record<string, unknown>>;
  fillTemplate(session: DocumentSession, template: TemplateDefinition, payload: TemplatePayload): Promise<{ session: DocumentSession; report: FillReport }>;
  validateFilledDocument(session: DocumentSession, template: TemplateDefinition): Promise<{ ok: boolean; warnings?: string[] }>;
}
