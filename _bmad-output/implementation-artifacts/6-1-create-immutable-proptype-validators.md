# Story 6.1: Create reusable immutable PropType validators

Status: ready-for-dev

## Story

As a developer,
I want a set of custom PropType validator functions for Immutable types (Map, List),
so that they can replace `react-immutable-proptypes` across all packages.

## Acceptance Criteria

1. A custom `immutableMapPropType` validator is created using `Map.isMap()`
2. A custom `immutableListPropType` validator is created using `List.isList()`
3. Each validator follows the standard PropTypes signature `(props, propName, componentName) => Error | null`
4. Each validator supports `.isRequired` chaining
5. Validators are placed in a shared location (e.g., `packages/cmf/src/propTypes/immutable.js` or similar)

## Tasks / Subtasks

- [ ] Create validator for Immutable Map (AC: #1, #3)
  - [ ] Function checks `Map.isMap(props[propName])` when prop is defined
  - [ ] Returns `Error` with descriptive message if check fails
- [ ] Create validator for Immutable List (AC: #2, #3)
  - [ ] Function checks `List.isList(props[propName])` when prop is defined
  - [ ] Returns `Error` with descriptive message if check fails
- [ ] Add `.isRequired` support (AC: #4)
  - [ ] Wrap each validator to produce a version that also fails when prop is `undefined`/`null`
- [ ] Place in shared location accessible by cmf, components, containers (AC: #5)
- [ ] Write unit tests for validators

## Dev Notes

- Standard PropTypes custom validator pattern:
  ```js
  function immutableMapPropType(props, propName, componentName) {
  	if (props[propName] != null && !Map.isMap(props[propName])) {
  		return new Error(
  			`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected an Immutable.Map.`,
  		);
  	}
  	return null;
  }
  ```
- For `.isRequired`, create a wrapper that adds the `null`/`undefined` check.
- Consider placing in `packages/cmf/src/` since cmf is a dependency of components/containers.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Étape 2.1]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
