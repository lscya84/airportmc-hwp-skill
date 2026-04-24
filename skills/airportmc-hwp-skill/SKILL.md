---
name: airportmc-hwp-skill
description: Work with AirportMC HWP/Hancom documents and related office-document workflows. Use when creating, editing, organizing, converting, or extracting content from `.hwp` / Hancom Office files used in AirportMC processes, especially when paired with ERP, groupware, approvals, forms, templates, or internal document handling.
---

# AirportMC HWP Skill

Use this skill for AirportMC workflows involving Hancom Office / HWP documents.

## When to use

Use this skill when the user asks to:
- create or edit an HWP document
- fill an AirportMC form or template delivered as HWP
- extract text or structured fields from `.hwp`
- convert HWP to another format for review or delivery
- organize AirportMC document workflows that depend on HWP artifacts

## Initial workflow

1. Identify the exact input file and desired output.
2. Check whether the task is:
   - content editing
   - field/template filling
   - conversion/export
   - extraction/summary
3. Prefer deterministic scripts when a repeated HWP workflow emerges.
4. Keep original files unchanged unless the user asked for in-place edits.
5. Save follow-on helpers under `scripts/` and workflow notes under `references/` as the skill grows.

## Architecture references

Read these references as needed:
- `references/architecture.md` — overall web-now / desktop-later architecture
- `references/module-design.md` — recommended module boundaries and contracts
- `references/runtime-adapters.md` — how web and desktop should differ safely
- `references/poc-plan.md` — staged proof-of-concept plan
- `references/openclaw-integration.md` — how this platform should be exposed through an OpenClaw skill
- `references/api.md` — initial API surface for web/app/OpenClaw integration
- `references/rhwp-integration.md` — phased plan for embedding and self-hosting rhwp editor

## Notes

- AirportMC workflows may combine HWP with ERP, groupware, approvals, payroll, or internal reporting.
- Preserve document meaning and layout expectations unless the user asks for restructuring.
- The preferred long-term direction is shared document/template modules with separate web and desktop runtime shells.
- The repository should grow as a platform skeleton with `apps/`, `packages/`, `templates/`, and `deployments/` boundaries.
- If a specific HWP toolchain becomes standard, document it here and move detailed procedures into `references/`.
