---
'@talend/utils': patch
'@talend/react-forms': patch
'@talend/react-containers': patch
---

chore(utils): add shared `isSafeUrl` utility and de-duplicate it across consumers

`@talend/utils` now exports `isSafeUrl(url)`, which checks that a value is a string
resolving to an `http(s)` url (same parsing rules as the browser, SSR-safe fallback
when `document` is unavailable).

This logic was copy-pasted in three places with slightly different (and in one case
less robust) implementations:

- `packages/forms/src/UIForm/utils/url.js` (`isSafeUrl`, SSR-safe) — now re-exports
  `@talend/utils`'s implementation.
- `packages/forms/src/UIForm/fields/Text/Text.component.jsx` (local `isSafeUrl`, hardcoded
  `https://localhost` base, not SSR-aware) — now reuses `../../utils/url`.
- `packages/containers/src/HeaderBar/HeaderBar.sagas.js` (local `isSafeUrl`, used
  `document.baseURI` directly, would throw during SSR) — now imports `isSafeUrl` from
  `@talend/utils` directly.

No behavior change for existing valid/invalid urls; the SSR edge case in `HeaderBar.sagas.js`
is now also covered.
