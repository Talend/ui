---
'@talend/json-schema-form-core': patch
'@talend/react-forms': patch
---

fix(SSO-2658): evaluate JSON Schema regex patterns with linear-time re2js engine

Schema `pattern` and `patternProperties` values in both `tv4` (`@talend/json-schema-form-core`) and `Ajv` (`@talend/react-forms`) are now evaluated using the linear-time RE2 engine (`re2js`) instead of JavaScript's backtracking `RegExp`, eliminating catastrophic backtracking (ReDoS) without rejecting valid patterns.
