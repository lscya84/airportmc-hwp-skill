export type DocumentFormat = 'hwp' | 'hwpx' | 'pdf';

export interface DocumentSource {
  id?: string;
  name?: string;
  bytes?: Uint8Array;
  format?: DocumentFormat;
  path?: string;
}

export interface DocumentSession {
  id: string;
  format: DocumentFormat;
  title?: string;
  meta?: Record<string, unknown>;
}

export interface DocumentOperation {
  type: string;
  payload?: Record<string, unknown>;
}

export interface DocumentCore {
  openDocument(source: DocumentSource): Promise<DocumentSession>;
  applyOperations(session: DocumentSession, ops: DocumentOperation[]): Promise<DocumentSession>;
  saveDocument(session: DocumentSession): Promise<Uint8Array>;
  inspectDocument(session: DocumentSession): Promise<Record<string, unknown>>;
}
