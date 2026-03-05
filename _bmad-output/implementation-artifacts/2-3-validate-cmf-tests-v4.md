# Story 2.3: Validate cmf test suite with v4

Status: ready-for-dev

## Story

As a developer,
I want the full cmf test suite to pass after the import migrations,
so that the core framework is certified v4-compatible.

## Acceptance Criteria

1. `yarn workspace @talend/react-cmf test` passes with zero failures
2. No Immutable-related deprecation warnings in test output
3. All reducers (componentsReducers, collectionsReducers) pass — they already use named imports
4. All selectors (collections.js) pass — already uses named import

## Tasks / Subtasks

- [ ] Run full cmf test suite (AC: #1)
- [ ] Review test output for deprecation warnings (AC: #2)
- [ ] Fix any unexpected failures in reducers (AC: #3)
- [ ] Fix any unexpected failures in selectors (AC: #4)

## Dev Notes

- Stories 2.1 and 2.2 must be completed first.
- The reducers (`componentsReducers.js`, `collectionsReducers.js`) already use `import { Map, fromJS } from 'immutable'` — no changes expected.
- The selector `collections.js` already uses `import { List } from 'immutable'` — no changes expected.
- This story is primarily a validation gate.

### References

- [Source: packages/cmf/src/reducers/componentsReducers.js#L6]
- [Source: packages/cmf/src/reducers/collectionsReducers.js#L4]
- [Source: packages/cmf/src/selectors/collections.js#L1]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
