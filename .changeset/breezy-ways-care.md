---
'@talend/react-cmf-router': major
'@talend/react-cmf': major
---

BREAKING CHANGE: Upgraded path-to-regexp from 3.x to 8.x

This upgrade was necessary to resolve security vulnerabilities. The new version introduces two breaking changes that require updates to your application:

1. Optional Path Parameter Syntax Change
- Old syntax: `/resources/:id?`
- New syntax: `/resources{/id}`

This change is required because in path-to-regexp 8.x, the `?` character is reserved for query parameters and will throw a parsing error when used at the end of a path.

2. Root Path Matching Behavior Change
- In v3.x, root path `/` would match any path starting with `/`
- In v8.x, root path `/` only matches exactly `/`
- To match both root and child paths, use the wildcard pattern `/{*path}`

Example migration:
```javascript
// Before
const routes = {
    '/': rootSaga,
    '/resources/:id?': resourceSaga
};

// After
const routes = {
    '/{*path}': rootSaga,  // if you want to match all routes
    '/resources{/id}': resourceSaga
};
```
For more details about path matching and troubleshooting, see [path-to-regexp documentation](https://github.com/pillarjs/path-to-regexp#errors).