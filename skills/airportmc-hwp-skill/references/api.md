# Initial API Draft

## Health

### `GET /health`
Returns service health.

## Template listing

### `GET /templates`
Returns registered templates with field definitions.

## Fill endpoint

### `POST /templates/:templateId/fill`
Current behavior:
- loads template schema
- validates required fields
- loads mapping
- if `template.txt` exists, performs placeholder substitution preview
- returns a fill preview payload

Current PoC scope:
- text-template preview only
- real HWP/HWPX mutation is not wired yet

This endpoint is the first integration point for:
- OpenClaw skill orchestration
- future web UI form-fill flow
- future desktop local helper flow
