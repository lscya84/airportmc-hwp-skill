import type { DocumentSession, DocumentFormat } from '../../document-core/src/index';

export interface ExportResult {
  format: DocumentFormat;
  filename: string;
  bytes: Uint8Array;
}

export interface ExportEngine {
  export(session: DocumentSession, format: DocumentFormat): Promise<ExportResult>;
}
