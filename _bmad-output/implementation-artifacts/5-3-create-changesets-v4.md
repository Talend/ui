# Story 5.3: Create changesets for v4 migration

Status: ready-for-dev

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

- [ ] Create changeset for cmf (AC: #1, #3, #4)
- [ ] Create changeset for components (AC: #2, #3, #4)
- [ ] Create additional changesets for any other packages that required code changes

## Dev Notes

- cmf and components are the only packages that required code changes (import fixes).
- cmf-cqrs, cmf-router, sagas, containers, flow-designer may not need changesets if they only had version bumps in `package.json`.
- Use `yarn changeset` to create changesets interactively.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Étape 1.6]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
