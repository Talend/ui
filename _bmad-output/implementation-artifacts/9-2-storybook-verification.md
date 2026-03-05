# Story 9.2: Storybook visual verification

Status: ready-for-dev

## Story

As a developer,
I want to verify that Storybook renders correctly for components using Immutable data,
so that no visual regressions exist.

## Acceptance Criteria

1. Storybook starts via `yarn workspace @talend/storybook-one start`
2. HeaderBar stories render without errors
3. ActionDropdown stories render without errors
4. List stories render without errors
5. No console errors related to Immutable appear

## Tasks / Subtasks

- [ ] Start Storybook (AC: #1)
- [ ] Verify HeaderBar stories (AC: #2)
- [ ] Verify ActionDropdown stories (AC: #3)
- [ ] Verify List stories (AC: #4)
- [ ] Check browser console for errors (AC: #5)

## Dev Notes

- Manual verification story — requires visual inspection.
- Focus on components that use Immutable data in their stories (`.toJS()` calls in story files).
- `packages/components/src/HeaderBar/HeaderBar.stories.jsx` has 12 `.toJS()` calls.

### References

- [Source: packages/components/src/HeaderBar/HeaderBar.stories.jsx]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
