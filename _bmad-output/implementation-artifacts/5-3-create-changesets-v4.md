# Story 5.3: Create changesets for v4 migration

Status: done

## Story

As a developer,
I want changesets created for each modified package,
so that version bumps and changelogs are properly tracked.

## Acceptance Criteria

1. Changeset exists for `@talend/react-cmf` (minor)
2. Changeset exists for `@talend/react-components` (minor)
3. Each changeset references the Immutable v4 migration
4. Changeset type is `minor` (non-breaking for consumers)

## Tasks / Subtasks

- [x] Create changeset for cmf (AC: #1, #3, #4)
- [x] Create changeset for components (AC: #2, #3, #4)
- [x] Create additional changesets for any other packages that required code changes

## Dev Notes

- cmf, components, and flow-designer are the packages that required source code changes (import fixes).
- cmf-cqrs, cmf-router, sagas, containers only had version bumps in `package.json` — no changesets needed.
- stepper had `immutable@^3.8.2` removed from `devDependencies` only — no changeset needed (devDependency change, no consumer impact).
- Use `yarn changeset` to create changesets interactively.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Étape 1.6]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

N/A

### Completion Notes List

- Identified packages with real code changes via `git diff master` (excluding package.json and lock files).
- Three packages had source code changes: `@talend/react-cmf`, `@talend/react-components`, `@talend/react-flow-designer`.
- `flow-designer` had reducer and renderer component changes (not just version bumps), justifying its own changeset.
- All changesets use `minor` bump type (non-breaking API change for consumers).
- All changesets reference the Immutable v4 migration in their description.
- Changeset format validated against `.changeset/config.json` and existing changeset files.
- `@talend/stepper` had `immutable@^3.8.2` removed from `devDependencies` — no changeset created (devDependency, no consumer impact).

### File List

- `.changeset/proud-neat-jolly.md` (created) — changeset for `@talend/react-cmf`
- `.changeset/brave-warm-light.md` (created) — changeset for `@talend/react-components`
- `.changeset/calm-eager-merry.md` (created) — changeset for `@talend/react-flow-designer`

## Senior Developer Review (AI)

**Reviewer:** Smouillour — 2026-03-06
**Outcome:** Approved

**Findings fixed (LOW):**
- [LOW-1] Differentiated changeset summary lines per package for clearer CHANGELOG readability
- [LOW-2] Updated Dev Notes to reflect actual flow-designer code changes (removed speculative language)
- [LOW-3] Added Completion Note on stepper devDependency removal
- [LOW-4] Added explicit immutable version range (`^3.8.2` → `^4.0.0`) in all changeset bodies

**All ACs verified as implemented. No HIGH or MEDIUM issues found.**

## Change Log

- 2026-03-06: Created changesets for Immutable v4 migration — 3 packages: react-cmf (minor), react-components (minor), react-flow-designer (minor)
- 2026-03-06: Code review passed — 4 LOW issues fixed (changeset summaries, Dev Notes, completion notes, version specificity)
