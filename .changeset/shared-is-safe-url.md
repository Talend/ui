---
'@talend/utils': patch
'@talend/react-forms': patch
'@talend/react-containers': patch
---

chore(utils): add shared `isSafeUrl` utility and de-duplicate it across consumers

`@talend/utils` now exports `isSafeUrl(url)`, which checks that a value is a string
resolving to an `http(s)` url (same parsing rules as the browser, SSR-safe fallback
when `document` is unavailable).

Prior to this fix, `packages/forms/src/UIForm/fields/Text/Text.component.jsx` performed
no url validation at all: any `link.href` was rendered as-is. The new validation added
there, along with the already-existing local implementations below, led to the same
`isSafeUrl` logic being duplicated in three places with slightly different (and in one
case less robust) implementations:

- `packages/forms/src/UIForm/utils/url.js` (`isSafeUrl`, SSR-safe) — now re-exports
  `@talend/utils`'s implementation.
- `packages/forms/src/UIForm/fields/Text/Text.component.jsx` (new local `isSafeUrl`,
  hardcoded `https://localhost` base, not SSR-aware) — now reuses `../../utils/url`.
- `packages/containers/src/HeaderBar/HeaderBar.sagas.js` (local `isSafeUrl`, used
  `document.baseURI` directly, would throw during SSR) — now imports `isSafeUrl` from
  `@talend/utils` directly.

Observable behavior changes:

- `Text` password links: previously any `link.href` value was rendered as-is; now only
  urls resolving to `http(s)` (absolute or relative) are rendered, other hrefs are dropped.
- `HeaderBar.sagas.js`'s `handleOpenProduct`: previously `document.baseURI` access
  threw during SSR, which was caught and treated as an invalid url (no navigation).
  The shared `isSafeUrl` is SSR-safe and now validates the url correctly; navigation
  itself remains guarded to browser environments only (`window` access is skipped
  during SSR).
