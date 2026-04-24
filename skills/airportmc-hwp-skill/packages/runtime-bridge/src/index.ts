export type RuntimeKind = 'browser' | 'server' | 'desktop';

export interface RuntimeInfo {
  kind: RuntimeKind;
  online?: boolean;
  canAccessLocalFilesystem?: boolean;
  canPrint?: boolean;
}

export interface RuntimeBridge {
  getRuntimeInfo(): Promise<RuntimeInfo>;
  pickOpenFile?(): Promise<{ name: string; bytes: Uint8Array } | null>;
  pickSaveLocation?(suggestedName: string): Promise<string | null>;
  downloadFile?(name: string, bytes: Uint8Array, contentType?: string): Promise<void>;
  printDocument?(target: string): Promise<void>;
}
