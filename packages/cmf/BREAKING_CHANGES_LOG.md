# Breaking changes log

Before 1.0, `react-cmf` do NOT follow semver version in releases.
This document aims to ease the WIP migration from a version to another by providing intels about what to do to migrate.

## v0.15.0

* PR #67 [chore: remove Icon component]

```javascript
import { Icon } from 'react-cmf';
```

```javascript
import { Icon } from 'react-talend-component';
```

## v0.10.0

* PR #52 [feat: add redux-batched-actions support](https://github.com/Talend/react-cmf/pull/52)

In your project you must add the following dependency

```javascript
"redux-batched-actions": "^0.1.4"
```

