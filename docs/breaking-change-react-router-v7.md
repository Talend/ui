# Breaking Changes: react-router v7 Migration

This document covers the breaking changes introduced by the react-router v6.3 → v7 migration
across the following packages:

- `@talend/react-cmf-router`
- `@talend/connected-react-router` (Talend fork)
- `@talend/router-bridge`

`@talend/react-components`, `@talend/design-system`, `@talend/design-docs` and
`@talend/storybook-one` only use react-router in tests and stories (dev dependency).

---

## 1. `react-router` v7, no more `history` nor `react-router-dom`

| Before                    | After                         |
| ------------------------- | ----------------------------- |
| `react-router@~6.3.0`     | `react-router@^7.18.4`        |
| `react-router-dom@~6.3.0` | (removed, use `react-router`) |
| `history@^5.3.0`          | (removed)                     |

**Action required:** replace `react-router-dom` by `react-router` in your imports and dependencies
(`BrowserRouter`, `Link`, `useParams`, ... are exported by `react-router` in v7).
Applications that pass their own `history` object to `@talend/connected-react-router`
(`connectRouter`, `routerMiddleware`, `ConnectedRouter`) must create it with a history
implementation providing `location`, `action`, `push`, `replace`, `go` and a
`listen(({ action, location }) => void)` returning an unlisten function.

## 2. `@talend/react-cmf-router`

The exported `history` (`getModule(...).history`) is now created from react-router's
`UNSAFE_createBrowserHistory`, wrapped to keep the `history` v5 behavior applications relied on:

- several `listen` callbacks are supported (react-router's own history accepts only one),
- `back()` / `forward()` are available,
- the `basename` is still prepended to `push` / `replace`, and the location `state`
  is now forwarded (it was silently dropped before): `push('/foo', state)` and
  `push({ pathname, state })` both work.

The public contract is unchanged: `@@router/LOCATION_CHANGE`, `state.router = { location, action }`,
`cmf.routerPush` / `cmf.routerReplace`, `routerAPI`, `sagaRouter`.

Behavior change: location `state` is `null` (not `undefined`) when there is none, like in
react-router v7. Custom `stateCompareFunction` written for `ConnectedRouter` still receive `undefined`.

## 3. `@talend/connected-react-router`

- Peer dependencies: `react-router@^7.18.4` and `react@^18.3.1`. `history` is no longer a peer dependency.
- `ConnectedRouter` renders react-router's `Router` with the history location (there is no `history` prop on `Router` anymore).
- The history listener uses the `history` v5 / react-router v7 signature `({ location, action })`.
  `history` v4 (`(location, action)`) is no longer supported.
- `createMatchSelector(path)` still returns the react-router v5 `match` shape
  (`{ path, url, isExact, params }`) but is now built on v7 `matchPath`. Only a path string or
  `{ path, exact, sensitive }` is supported: `strict` and path arrays are not supported anymore.
- TypeScript: the `history` types are replaced by local structural types (`History`, `Location`, `match`, ...).

## 4. `@talend/router-bridge`

- Peer dependency `react-router-dom@~6.3.0` is replaced by `react-router@^7.18.4` (still optional).
  With another version of `react-router` (v3), the bridge stays in legacy mode.
- `Router` follows the bridge history; `Redirect` (based on `Navigate`, replaces the location)
  and `useRouteMatch` (react-router v5 compatible `match`) are now provided: they were `undefined` with react-router v6.
- The bridge loads `react-router` with `require`. Bundlers resolving the `require` condition
  load the CommonJS build while `import` loads the ESM one: do not mix bridge exports with
  direct imports of the same react-router components in one app unless your bundler dedupes them.

## Known issues kept as is (pinned by tests)

Tests in `packages/cmf-router` document existing behavior that was not changed by this migration:

- `documentTitle` saga does not follow navigation (reads `payload.pathname` instead of `payload.location.pathname`).
- `getLocation` selectors read `state.routing.locationBeforeTransitions` while the reducer is mounted on `state.router`.
- the message of the `cmf.router.matchPath` `params` error is empty.
