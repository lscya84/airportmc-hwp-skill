# rhwp Integration Notes

## Current direction

For the first platform stage, prefer embedding rhwp through its iframe-based editor surface.

Relevant upstream package:
- `@rhwp/editor`

This package exposes a small API surface:
- `createEditor(container, options?)`
- `loadFile(data, fileName?)`
- `pageCount()`
- `getPageSvg(page?)`
- `destroy()`

## Why this is a good first step

It lets the platform:
- validate editor embedding quickly
- avoid rebuilding editor UI concerns immediately
- keep the OpenClaw/template orchestration logic outside the editor itself

## Recommended phased integration

### Phase 1
- embed the rhwp editor through iframe
- verify readiness and loadFile behavior
- verify document preview/review loop

### Phase 2
- self-host rhwp-studio instead of pointing at the public demo URL
- serve it from the platform deployment
- keep the editor API wrapper stable

### Phase 3
- connect real HWP/HWPX document output from the fill engine
- use rhwp for human review and manual correction

## Important note

The current PoC may use placeholder text preview or non-HWP bytes to test request flow boundaries.
That does not prove true HWP editing yet.
The next real milestone is loading a genuine HWP/HWPX file produced or preserved by the platform.
