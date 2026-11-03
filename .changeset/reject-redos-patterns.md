---
'@talend/json-schema-form-core': patch
'@talend/react-forms': patch
---

fix(SSO-2658): bound backend JSON Schema pattern evaluation against ReDoS

Schema `pattern` values with nested or overlapping repetitions (e.g. `^(a|a)+$`) are no longer evaluated by the backtracking RegExp engine. `validate` returns an invalid result and the exported `utils.validate` throws instead of freezing the tab.
