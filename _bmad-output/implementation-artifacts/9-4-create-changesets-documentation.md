# Story 9.4: Create changesets and documentation

Status: ready-for-dev

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

- [ ] Create changeset for cmf (AC: #1, #7, #8)
- [ ] Create changeset for components (AC: #2, #7, #8)
- [ ] Create changeset for containers (AC: #3, #7, #8)
- [ ] Create changeset for flow-designer (AC: #4, #7, #8)
- [ ] Create changeset for cmf-cqrs (AC: #5, #7, #8)
- [ ] Create changeset for sagas (AC: #6, #7, #8)
- [ ] Write BREAKING-CHANGE documentation (AC: #7, #8)

## Dev Notes

- All changesets are `major` because this is a breaking change for consumers who depend on Immutable v3.
- BREAKING-CHANGE documentation should cover:
  - Immutable.js upgraded from v3.8.2 to v5.x
  - `react-immutable-proptypes` removed — custom validators used instead
  - `OrderedMap` replaced with `Map` (v5 `Map` preserves insertion order)
  - Default import `import Immutable from 'immutable'` no longer supported — use named imports
  - `Iterable` replaced with `isImmutable()`
- Use `yarn changeset` to create changesets interactively.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Décisions]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
