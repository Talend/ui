---
'@talend/eslint-plugin': major
'@talend/eslint-config': minor
---

Remove the `@talend/import-depth` rule

The rule was tied to the UMD/CDN build constraints which are no longer relevant.
It is removed from the plugin and from the shared eslint config, along with the
now useless `eslint-disable` directives across the repository.
