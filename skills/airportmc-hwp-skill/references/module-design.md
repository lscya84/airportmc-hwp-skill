# Module Design

## Recommended repository layout

```text
apps/
  web-client/
  server-api/
  desktop-client/

packages/
  document-core/
  template-engine/
  field-schema/
  export-engine/
  storage-abstraction/
  runtime-bridge/

templates/
  <template-id>/
    template.hwp|hwpx
    schema.json
    mapping.json
```

## Module contracts

### document-core
Input:
- raw document bytes or file handle

Output:
- document session object
- mutation/apply methods
- serialized output

Key interfaces:
- `openDocument(source)`
- `saveDocument(session)`
- `applyOperations(session, ops)`
- `inspectDocument(session)`

### template-engine
Input:
- document session
- template definition
- field payload

Output:
- updated document session
- fill report
- validation report

Key interfaces:
- `detectTargets(session, template)`
- `fillTemplate(session, template, payload)`
- `validateFilledDocument(session, template)`

### field-schema
Input:
- template metadata
- user payload

Output:
- normalized payload
- validation errors/warnings

Key interfaces:
- `getTemplateSchema(templateId)`
- `normalizePayload(templateId, input)`
- `validatePayload(templateId, input)`

### export-engine
Key interfaces:
- `exportHwp(session)`
- `exportHwpx(session)`
- `exportPdf(session)`

### storage-abstraction
Key interfaces:
- `put(path, bytes, meta)`
- `get(path)`
- `delete(path)`
- `signedUrl(path)` optional

Providers:
- local provider
- server provider
- object storage provider

### runtime-bridge
Key interfaces:
- `pickOpenFile()`
- `pickSaveLocation()`
- `downloadFile(bytes, name)`
- `printDocument(target)`
- `getRuntimeInfo()`

Implementations:
- browser runtime
- desktop runtime

## Shared UI rule

If possible, keep the document editing UI shared between web and desktop.
Desktop should embed or reuse the same UI and only add native bridges.

## Template package structure

Each template should ideally include:
- original source file
- schema describing required fields
- mapping describing how fields map into the document
- optional fixtures/tests

Example:

```text
templates/leave-request/
  template.hwp
  schema.json
  mapping.json
  sample-input.json
```

## Validation philosophy

Validation should happen at three levels:
1. input schema validation
2. template fill validation
3. export/output validation

This matters because HWP formatting failures may not be visible until export or reopen.
