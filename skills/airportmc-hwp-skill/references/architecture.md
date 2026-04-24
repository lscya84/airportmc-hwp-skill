# AirportMC HWP Platform Architecture

## Goal

Build a reusable HWP/HWPX document platform whose core modules can run behind:
- a web deployment now
- a local Windows desktop app later

The same document logic should work in both environments. Only runtime adapters and shell behavior should differ.

## Design principle

Separate the system into:
1. **Core modules** — shared business/document logic
2. **Runtime adapters** — environment-specific file/system/network behavior
3. **Execution shells** — web app or desktop app

## High-level model

```text
Core Modules
  ├─ document-core
  ├─ template-engine
  ├─ field-schema
  ├─ export-engine
  ├─ storage-abstraction
  └─ runtime-bridge

Execution Shells
  ├─ web-client
  ├─ server-api
  └─ desktop-client
```

## Core modules

### 1. document-core
Responsible for:
- open/load HWP/HWPX
- in-memory document session
- edit/apply operations
- save/export-ready document state

This layer should hide rhwp-specific complexity from higher-level modules.

### 2. template-engine
Responsible for:
- detecting placeholders and fill targets
- mapping structured input to document positions
- applying field values
- running template-specific transformation rules

Example targets:
- plain placeholders like `{{성명}}`
- known field ids
- table-cell destinations
- repeated sections

### 3. field-schema
Responsible for:
- defining required input fields per template
- validation rules
- display labels and help text
- optional/required behavior

This module should be runtime-neutral and serializable.

### 4. export-engine
Responsible for:
- export to HWP/HWPX
- export to PDF
- future alternate formats if needed

### 5. storage-abstraction
Responsible for a common storage interface.
Different providers can back it:
- local filesystem
- server filesystem
- MinIO/S3
- shared folder
- Drive or other external target later

### 6. runtime-bridge
Responsible for environment-specific capabilities:
- file open/save dialogs
- local file access
- download handling
- print access
- online/offline state
- desktop-only native integrations

This is where web and desktop differ most.

## Execution shells

### Web shell
Components:
- web-client
- server-api
- persistent storage provider
- reverse proxy / HTTPS

Responsibilities:
- browser UI
- upload/download
- centralized storage
- collaboration/central operations later
- OpenClaw/API integrations

### Desktop shell
Components:
- desktop-client (recommended: Tauri-based shell)
- local runtime adapter
- local storage provider
- optional local helper service later

Responsibilities:
- local file open/save
- intranet/offline-friendly use
- printer/native dialog integration
- optional sync to central service later

## Deployment strategy

### Phase 1: web-first
Deploy the editor and APIs in Docker.
Use this to validate:
- document open/edit/save
- template fill
- export
- response delivery

### Phase 2: desktop shell
Wrap the same UI/core modules inside a Windows app shell.
Replace runtime/storage adapters where needed.

### Phase 3: hybrid
Allow both modes:
- central server mode
- local desktop mode
- optional sync or file exchange between them

## Non-goals for the first PoC

Avoid overbuilding these before the first successful template flow:
- full collaboration
- advanced permissions
- complex sync
- many template classes
- large workflow orchestration

## Architecture recommendation

Use the web deployment now, but enforce module boundaries so that the Windows desktop app later reuses:
- document-core
- template-engine
- field-schema
- export-engine

Only these should vary between web and desktop:
- runtime-bridge
- storage provider
- shell startup/integration code
