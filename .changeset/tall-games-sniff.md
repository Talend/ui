---
'@talend/utils': major
'@talend/react-components': patch
'@talend/react-forms': patch
---

utils: remove default export, use named exports instead
* WHAT the breaking change is
Remove default export of @talend/utils package, use named exports instead
* WHY the change was made
The utils package used a default export. so we can't do a destruction import as readme described:
```
import { validation } from '@talend/utils';
```
* HOW a consumer should update their code
Use destruction import like `import { validation, date } from '@talend/utils';` to replace default import.
