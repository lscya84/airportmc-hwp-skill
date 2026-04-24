# OpenClaw Integration Notes

## Role of the skill

The OpenClaw skill should act as the orchestration layer, not the editor implementation itself.

It should:
- identify the target template or document workflow
- gather missing field values from the user
- call the server API or local automation entrypoint
- return the produced file, link, or next-step instructions

## Recommended integration surfaces

### 1. Web/API mode
Preferred when the document platform is running centrally.

The skill can call endpoints such as:
- `POST /templates/:id/fill`
- `POST /documents/upload`
- `POST /documents/:id/export/pdf`
- `GET /documents/:id/download`

### 2. Local desktop mode
Preferred when the workflow must stay on a local/intranet Windows PC.

The skill should call a local helper or CLI bridge rather than embedding document logic inside the skill.

## Important boundary

Do not duplicate document editing logic inside the OpenClaw skill.
Keep these inside the shared platform modules:
- document-core
- template-engine
- export-engine
- storage provider wiring

The skill should remain focused on:
- conversation
- workflow choice
- missing-value collection
- final delivery
