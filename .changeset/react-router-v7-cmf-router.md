---
'@talend/react-cmf-router': major
---

Upgrade react-router from 6.3 to 7 and drop the `history` and `react-router-dom` dependencies.

- `react-router-dom` is removed; `react-router@^7.18.4` is now used directly (`BrowserRouter`, `Link`,
  `useParams`, ... are exported by `react-router` in v7).
- The exported `history` (`getModule(...).history`) is now created from react-router's
  `UNSAFE_createBrowserHistory`, wrapped to keep the `history` v5 behavior applications relied on:
  - several `listen` callbacks are supported (react-router's own history accepts only one),
  - `back()` / `forward()` are available,
  - the `basename` is still prepended to `push` / `replace`, and the location `state`
    is now forwarded (it was silently dropped before): `push('/foo', state)` and
    `push({ pathname, state })` both work.
- The public contract is unchanged: `@@router/LOCATION_CHANGE`, `state.router = { location, action }`,
  `cmf.routerPush` / `cmf.routerReplace`, `routerAPI`, `sagaRouter`.
- Behavior change: location `state` is `null` (not `undefined`) when there is none, like in
  react-router v7. Custom `stateCompareFunction` written for `ConnectedRouter` still receive `undefined`.

Known issues kept as is (pinned by tests, not changed by this migration):

- `documentTitle` saga does not follow navigation (reads `payload.pathname` instead of
  `payload.location.pathname`).
- `getLocation` selectors read `state.routing.locationBeforeTransitions` while the reducer is
  mounted on `state.router`.
- the message of the `cmf.router.matchPath` `params` error is empty.
