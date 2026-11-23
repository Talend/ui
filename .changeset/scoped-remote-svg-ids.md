---
'@talend/design-system': patch
---

fix(SSO-2658): remote svg classes are dropped and ids are scoped per icon (with local references rewritten), and `IconsProvider` only reads icons from the containers it created instead of any `.tc-iconsprovider` element in the document
