export interface StoredObject {
  path: string;
  contentType?: string;
  bytes?: Uint8Array;
  meta?: Record<string, unknown>;
}

export interface StorageProvider {
  put(path: string, bytes: Uint8Array, meta?: Record<string, unknown>): Promise<StoredObject>;
  get(path: string): Promise<StoredObject>;
  delete(path: string): Promise<void>;
  signedUrl?(path: string): Promise<string>;
}
