# PoC Plan

## PoC objective

Prove that one AirportMC form/template can be:
1. loaded
2. filled from structured input
3. reviewed in a web editor
4. exported and returned

in a way that will still support a future Windows desktop app.

## PoC stages

### Stage 1 — platform skeleton
- set up repository/module layout
- choose shared package boundaries
- stand up rhwp-based web editor container
- confirm open/save/edit cycle

### Stage 2 — template flow
- select one real AirportMC template
- define field schema
- define fill mapping
- build simple fill API
- return updated file

### Stage 3 — export and review
- add PDF export path if feasible
- verify reopened output consistency
- verify the filled document can be reviewed and corrected manually

### Stage 4 — desktop-ready boundaries
- confirm runtime adapter boundaries are respected
- list browser-specific assumptions to remove
- prepare the desktop shell plan (Tauri preferred)

## First template selection criteria

Choose a template that is:
- frequently reused
- text/field oriented
- low-risk if formatting shifts slightly
- easy to validate manually

Avoid for the first PoC:
- extremely complex tables
- highly sensitive official forms with zero layout tolerance
- documents requiring unsupported Hancom-specific features

## Success criteria

The PoC is successful if:
- the template fills correctly from structured data
- the output reopens correctly
- users can edit the result further in the web UI
- the system boundaries still make sense for a future Windows shell
