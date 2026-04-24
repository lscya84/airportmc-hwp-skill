# Runtime Adapter Design

## Purpose

Runtime adapters isolate environment-dependent behavior so that shared document modules do not care whether they run in:
- a browser
- a server process
- a Windows desktop app

## Adapter categories

### Browser adapter
Responsibilities:
- file upload/download
- browser storage/session support
- print/download behavior
- HTTP calls to server APIs

Limitations:
- no unrestricted filesystem access
- limited local printer/native integration
- offline behavior depends on browser caching strategy

### Server adapter
Responsibilities:
- persistent storage
- API execution
- export jobs
- template registry access
- auth/logging/audit later if needed

### Desktop adapter
Responsibilities:
- local file open/save dialogs
- direct filesystem access
- printer integration
- local temp/cache directory management
- optional shared-folder or intranet connectivity

## Runtime info contract

A minimal runtime info object should tell the app:
- runtime type: `browser | server | desktop`
- online/offline status
- local filesystem capability
- print capability
- export capability

## Example adapter boundary

The UI should not do this directly:
- `window.showSaveFilePicker()`
- desktop shell commands
- direct Node file writes

Instead the UI should call a neutral interface like:
- `runtime.pickSaveLocation()`
- `runtime.saveOutput(result)`

## Why this matters

Without runtime adapters, the first web implementation tends to leak browser assumptions everywhere.
That makes the future desktop app much harder.

With adapters, the same template-fill flow can remain unchanged while only the last-mile behavior differs.
