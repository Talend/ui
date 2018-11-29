# setup localStorage with CMF

You can use this API to setup your redux state using localStorage.

```javascript
import cmf from '@talend/react-cmf';

const localStorageKey = 'myApp-v1';
const preloadedState = cmf.localStorage.getState(localStorageKey);
const storeCallback = cmf.localStorage.getStoreCallback(localStorageKey, [
    ['cmf', 'components', 'Container(List)', 'foo'],
    ['cmf', 'components', 'Container(SidePanel)'],
]);

cmf.bootstrap({
    preloadedState,
    storeCallback,
});
```

From now the redux-storage api provided in CMF is DEPRECATED.
It will be removed in the next major release.
