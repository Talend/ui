# Story 6.1: Create reusable immutable PropType validators

Status: done

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

- [x] Create validator for Immutable Map (AC: #1, #3)
  - [x] Function checks `Map.isMap(props[propName])` when prop is defined
  - [x] Returns `Error` with descriptive message if check fails
- [x] Create validator for Immutable List (AC: #2, #3)
  - [x] Function checks `List.isList(props[propName])` when prop is defined
  - [x] Returns `Error` with descriptive message if check fails
- [x] Add `.isRequired` support (AC: #4)
  - [x] Wrap each validator to produce a version that also fails when prop is `undefined`/`null`
- [x] Place in shared location accessible by cmf, components, containers (AC: #5)
- [x] Write unit tests for validators

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

Claude Sonnet 4.6

### Debug Log References

- Phase RED: tests echouaient sur `Cannot find module './immutable'` — confirmé avant implémentation.
- Phase GREEN: 20/20 tests passent après création de `immutable.js`.

### Completion Notes List

- Créé `packages/cmf/src/propTypes/immutable.js` avec `immutableMapPropType` et `immutableListPropType`.
- Chaque validateur suit la signature standard PropTypes `(props, propName, componentName) => Error | null`.
- `.isRequired` implémenté via une factory `makeRequired()` commune aux deux validateurs.
- 20 tests unitaires couvrant : valeurs valides, null/undefined (optionnel), valeurs invalides, `.isRequired` sur undefined/null/valide/invalide.
- Tous les tests passent, aucune régression.

### File List

- `packages/cmf/src/propTypes/immutable.js` (created)
- `packages/cmf/src/propTypes/immutable.test.js` (created)
- `packages/cmf/src/index.js` (modified — added exports)

### Review Follow-ups (AI)

- [x] [AI-Review][MEDIUM] Validators not exported from cmf public API — fixed: added named exports in `index.js`
- [ ] [AI-Review][MEDIUM] `packages/components` does not depend on `@talend/react-cmf` — story 6-3 will need to use a deep import or add the dependency. Flag for story 6-3 dev.

## Change Log

- 2026-03-06: Created custom immutable PropType validators (`immutableMapPropType`, `immutableListPropType`) with `.isRequired` support in `packages/cmf/src/propTypes/immutable.js`. Added 20 unit tests.
- 2026-03-06: [Code Review] Added `immutableMapPropType` and `immutableListPropType` to cmf named exports in `index.js`.
