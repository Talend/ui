# @talend/connected-react-router

## 7.0.0

### Major Changes

- b9468a0: Upgrade react-router from 6.3 to 7 and drop the `history` and `react-router-dom` dependencies.

  - Peer dependencies: `react-router@^7.18.4` and `react@^18.3.1`. `history` is no longer a peer
    dependency. Applications that pass their own `history` object to `connectRouter`,
    `routerMiddleware` or `ConnectedRouter` must create it with a history implementation providing
    `location`, `action`, `push`, `replace`, `go` and a `listen(({ action, location }) => void)`
    returning an unlisten function.
  - `ConnectedRouter` renders react-router's `Router` with the history location (there is no
    `history` prop on `Router` anymore).
  - The history listener uses the `history` v5 / react-router v7 signature `({ location, action })`.
    `history` v4 (`(location, action)`) is no longer supported.
  - `createMatchSelector(path)` still returns the react-router v5 `match` shape
    (`{ path, url, isExact, params }`) but is now built on v7 `matchPath`. Only a path string or
    `{ path, exact, sensitive }` is supported: `strict` and path arrays are not supported anymore.
  - TypeScript: the `history` types are replaced by local structural types (`History`, `Location`,
    `match`, ...).

## 6.9.5

### Patch Changes

- 8d9d18b: fix: restrict optional `immutable` dependency range to v5

## 6.9.4

### Patch Changes

- 1065a4a: Use the `@talend/connected-react-router` fork (supports immutable v5) instead of upstream `connected-react-router`, which pulled immutable v3.
