---
'@talend/router-bridge': major
---

Upgrade react-router from 6.3 to 7 and drop the `history` and `react-router-dom` dependencies.

- Peer dependency `react-router-dom@~6.3.0` is replaced by `react-router@^7.18.4` (still optional).
  With another version of `react-router` (v3), the bridge stays in legacy mode.
- `Router` follows the bridge history; `Redirect` (based on `Navigate`, replaces the location)
  and `useRouteMatch` (react-router v5 compatible `match`) are now provided: they were `undefined`
  with react-router v6.
- The bridge loads `react-router` with `require`. Bundlers resolving the `require` condition load
  the CommonJS build while `import` loads the ESM one: do not mix bridge exports with direct
  imports of the same react-router components in one app unless your bundler dedupes them.
