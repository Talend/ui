---
'@talend/react-cmf-cqrs': major
---

chore: refactor to use new Context API

rewrite tests using RTL

## breaking changes:

If you are using this component in a test you must wrap it in CMF mock Provider to have redux, registry and router.

As this provider is set by CMF bootstrap you should have no issue in app.