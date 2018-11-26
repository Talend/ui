# 1.0 -> 2.0

## extract out react-router (#1842)

[PR #1842](https://github.com/Talend/ui/pull/1842)
[jira TUI-271](https://jira.talendforge.org/browse/TUI-271)

update the following imports

```javascript
//before
import matchPath from '@talend/react-cmf/lib/sagaRouter/matchPath';
//after
import matchPath from '@talend/react-cmf/lib/matchPath';

//before
import cmf from '@talend/react-cmf';
cmf.selectors.router.getPath(state);
cmf.selectors.router.Location(state);
//after
import { routerAPI } from '@talend/react-router';
routerAPI.selectors.getPath(state);
routerAPI.selectors.Location(state);
```

projects: getPath is used in dataset
