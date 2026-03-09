# Story 9.4: Create changesets and documentation

Status: done

## Story

As a developer,
I want changesets and breaking change documentation created for the v5 migration,
so that consumers are informed of the upgrade.

## Acceptance Criteria

1. Changeset exists for `@talend/react-cmf` (major)
2. Changeset exists for `@talend/react-components` (major)
3. Changeset exists for `@talend/react-containers` (major)
4. Changeset exists for `@talend/react-flow-designer` (major)
5. Changeset exists for `@talend/react-cmf-cqrs` (major)
6. Changeset exists for `@talend/react-sagas` (major)
7. BREAKING-CHANGE section documents all changes
8. Documentation includes: Immutable v5 upgrade, react-immutable-proptypes removal, OrderedMap→Map, default import removal

## Tasks / Subtasks

- [x] Create changeset for cmf (AC: #1, #7, #8)
- [x] Create changeset for components (AC: #2, #7, #8)
- [x] Create changeset for containers (AC: #3, #7, #8)
- [x] Create changeset for flow-designer (AC: #4, #7, #8)
- [x] Create changeset for cmf-cqrs (AC: #5, #7, #8)
- [x] Create changeset for sagas (AC: #6, #7, #8)
- [x] Write BREAKING-CHANGE documentation (AC: #7, #8)

## Dev Notes

- All changesets are `major` because this is a breaking change for consumers who depend on Immutable v3.
- BREAKING-CHANGE documentation should cover:
  - Immutable.js upgraded from v3.8.2 to v5.x
  - `react-immutable-proptypes` removed — custom validators used instead
  - `OrderedMap` replaced with `Map` (v5 `Map` preserves insertion order)
  - Default import `import Immutable from 'immutable'` no longer supported — use named imports
  - `Iterable` replaced with `isImmutable()`
- Changesets created manually with descriptive names (e.g., `immutable-v5-cmf-major.md`) rather than using `yarn changeset` interactive mode.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Décisions]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

N/A — documentation-only story, no code logic implemented.

### Completion Notes List

- Created 6 major changesets (one per affected package) in `.changeset/` with BREAKING CHANGES sections covering all 4 item types from AC #8.
- Created comprehensive migration guide at `docs/breaking-change-immutable-v5.md` covering: default import removal, `Iterable` → `isImmutable()`, `OrderedMap` → `Map`, `react-immutable-proptypes` removal, and peer dep version bump.
- All 6 changesets declare `major` bump as required — consumers on Immutable v3/v4 will see a major version bump signalling breaking changes.
- No tests were written (pure documentation story); all ACs verified by file inspection.

### File List

- `.changeset/immutable-v5-cmf-major.md`
- `.changeset/immutable-v5-components-major.md`
- `.changeset/immutable-v5-containers-major.md`
- `.changeset/immutable-v5-flow-designer-major.md`
- `.changeset/immutable-v5-cmf-cqrs-major.md`
- `.changeset/immutable-v5-sagas-major.md`
- `docs/breaking-change-immutable-v5.md`

### Senior Developer Review (AI)

**Reviewer:** Smouillour — 2026-03-09
**Outcome:** Changes requested → Fixed

**Issues found and fixed:**

- **[HIGH] Duplicate/Conflicting changesets (H1):** `proud-neat-jolly.md` (react-cmf minor), `brave-warm-light.md` (react-components minor), and `calm-eager-merry.md` (react-flow-designer minor) were pre-existing changesets from Phase 1 that produced fragmented CHANGELOG entries alongside the new major ones. All three deleted and their descriptions merged into the corresponding major changeset files. The `@talend/react-cmf: patch` entry in `curvy-deer-fall.md` was also removed (the other 3 packages in that file were preserved).
- **[MEDIUM] `feat!:` raw commit prefix in changeset body (M1):** All 6 changeset descriptions changed to plain prose heading `Upgrade Immutable.js to v5`.
- **[MEDIUM] No link to migration guide (M2):** Each of the 6 changeset files now ends with a link to `../docs/breaking-change-immutable-v5.md`.
- **[LOW] Misleading Dev Notes about `yarn changeset` (L1):** Updated to reflect that changesets were created manually with descriptive names.

### Change Log

- 2026-03-09: Created major changesets for all 6 packages affected by Immutable v5 migration. Created `docs/breaking-change-immutable-v5.md` with full migration guide covering Immutable v5 upgrade, react-immutable-proptypes removal, OrderedMap→Map, and default import removal.
- 2026-03-09: [Code Review] Fixed H1 (removed 3 superseded minor changesets + cmf patch entry from curvy-deer-fall, merged descriptions), M1 (plain prose headings in all 6 changesets), M2 (migration guide link added to all 6 changesets), L1 (Dev Notes corrected). Status → done.
