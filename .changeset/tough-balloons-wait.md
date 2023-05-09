---
'@talend/react-components': patch
---

- fix: Remove wrong proptypes from Action (overlay).
Make a lots of noise for nothing the overlay is not required on Action.

- chore: refactor HeaderBar. move into private primitives each internal components
- tests: rewrite tests of Inject and HTTPError
- chore: rewrite Inject using Typescript
- chore: rename index files of Icons and IconsProvider to index.ts
