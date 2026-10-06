---
'@talend/json-schema-form-core': major
---

Remove the `jsonref` export and the `json-refs` dependency. `jsonref` was unused by any package in this monorepo and dragged in 8 transitive dependencies (`commander`, `graphlib`, `js-yaml`, `lodash`, `native-promise-only`, `path-loader`, `slash`, `uri-js`) for `$ref` resolution functionality inherited from the upstream fork. If you were importing `jsonref` from `@talend/json-schema-form-core`, you'll need to resolve `$ref`s yourself (e.g. with `json-refs` directly) before calling the other exported utilities.
