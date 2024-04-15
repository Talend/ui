---
"@talend/json-schema-form-core": patch
---

- JSFC is a fork of https://github.com/json-schema-form/json-schema-form-core : its place is in the Fork folder
- Remove local copy of json-refs and use package instead
- add missing type to fix ts compilation error
- add a polyfill for json-refs: path-browserify
