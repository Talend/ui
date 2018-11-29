# 1.0 -> 2.0

## extract out react-router (#1842)

[PR #1842](https://github.com/Talend/ui/pull/1842)
[jira TUI-271](https://jira.talendforge.org/browse/TUI-271)

First setup it reading the [@talend/react-cmf-router documentation](https://www.npmjs.com/package/@talend/react-cmf-router).

### matchPath

```javascript
//before
import matchPath from '@talend/react-cmf/lib/sagaRouter/matchPath';
//after
import matchPath from '@talend/react-cmf/lib/matchPath';
```

### selectors

```javascript
//before
import cmf from '@talend/react-cmf';
cmf.selectors.router.getPath(state);
cmf.selectors.router.getLocation(state);
//after
import { routerAPI } from '@talend/react-router';
routerAPI.selectors.getPath(state);
routerAPI.selectors.getLocation(state);
```

### context

```javascript
// before
function myActionCreator(event, data, context) {
    if (context.router.params.myParamId) {
        return {
            type: 'MY_ACTION_WITH_PARAM',
            id: context.router.params.myParamId
        };
    }
    return {
        type: 'MY_ACTION_WITHOUT_ROUTER',
    };
}
// after
function myActionCreator(event, data, context) {
    const match = routerAPI.selectors.matchPath(context.store.getState(), {
        path: '/your/path/:myParamId', // you need that extra
    });
    if (match) {
        return {
            type: 'MY_ACTION_WITH_PARAM',
            id: match.params.myParamId
        };
    }
    return {
        type: 'MY_ACTION_WITHOUT_ROUTER',
    };
}
```

Why do I need to write down a path here ?
Because before you rely on the router configuration, so you may without know it
adding a route that will match this and provide a `myParamId`. This is not enough explicit, your code should not rely on configuration.

Worse, action creators should not rely on the current router params. That means your action is not an event, it s an entier effect. Your sagas should do that kind of check.

## saga documentTitle

This saga is started by the module so if you have written down the following you have to update:

```javascript
// before
import cmf from '@talend/react-cmf';

function* mainSaga() {
    yield fork(cmf.sagas.changeDocumentTitle);
    //...
}
// after
// just remove that the setup of the addon is doing it.
```
