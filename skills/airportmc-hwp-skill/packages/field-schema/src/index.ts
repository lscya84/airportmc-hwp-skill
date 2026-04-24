export interface TemplateField {
  key: string;
  label: string;
  required?: boolean;
  type?: 'text' | 'date' | 'number' | 'select';
  helpText?: string;
}

export interface TemplateDefinition {
  templateId: string;
  title: string;
  sourcePath: string;
  fields: TemplateField[];
  mappingPath?: string;
}

export type TemplatePayload = Record<string, unknown>;

export interface ValidationResult {
  ok: boolean;
  errors?: string[];
  warnings?: string[];
  normalized?: TemplatePayload;
}

export interface FieldSchemaRegistry {
  getTemplateSchema(templateId: string): Promise<TemplateDefinition>;
  validatePayload(templateId: string, payload: TemplatePayload): Promise<ValidationResult>;
}
