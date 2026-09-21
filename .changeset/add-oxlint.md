---
"@talend/scripts-config-oxlint": minor
"@talend/json-schema-form-core": patch
"@talend/module-to-cdn": patch
"@talend/react-bootstrap": patch
"@talend/react-a11y": patch
"@talend/react-cmf-cqrs": patch
"@talend/react-cmf-router": patch
"@talend/react-cmf": patch
"@talend/react-components": patch
"@talend/react-containers": patch
"@talend/react-dataviz": patch
"@talend/design-system": patch
"@talend/design-tokens": patch
"@talend/react-faceted-search-query-client": patch
"@talend/react-faceted-search": patch
"@talend/react-flow-designer": patch
"@talend/react-forms": patch
"@talend/http": patch
"@talend/router-bridge": patch
"@talend/react-sagas": patch
"@talend/react-stepper": patch
"@talend/react-storybook-cmf": patch
"@talend/storybook-docs": patch
"@talend/ui-storybook-one": patch
"@talend/bootstrap-theme": patch
"@talend/utils": patch
"@talend/eslint-plugin": patch
"@talend/scripts-cmf": patch
"@talend/scripts-config-babel": patch
"@talend/eslint-config": patch
"@talend/scripts-config-prettier": patch
"@talend/scripts-config-storybook-lib": patch
"@talend/scripts-config-stylelint": patch
"@talend/scripts-config-typescript": patch
"@talend/scripts-core": patch
"@talend/scripts-locales": patch
"@talend/scripts-utils": patch
---

Add `oxlint` alongside `eslint` in every package that has eslint configured, for comparison purposes.

- New `@talend/scripts-config-oxlint` shared oxlint configuration package.
- Each package gains an `oxlint.config.mts` and an `oxlint:run` script (`oxlint --format=json > oxlint-report.json`).
- New `oxlint:run` turbo task, orchestrated via the root `oxlint:run` script.
- The lint report merge script now also merges `oxlint-report.json` alongside `eslint-report.json` and `stylelint-report.json`.
- CI now runs oxlint alongside eslint and stylelint on pull requests.

`eslint` and `stylelint` remain unchanged and continue to be the source of truth; this only adds oxlint output for comparison.
