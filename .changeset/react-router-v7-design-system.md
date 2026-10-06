---
'@talend/design-system': major
---

Use `react-router` v7 in tests and stories (dev dependency only, no runtime import of
`react-router`/`react-router-dom` in this package). Consumers running their own tests or stories
against this package with react-router must upgrade to `react-router@^7.18.4` and replace any
`react-router-dom` import by `react-router`.
