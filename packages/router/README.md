# @talend/react-cmf-router

This is the old router of react-cmf.

## Migration path

First add it to your bootstrap app

```javascript
import cmf from '@talend/react-cmf';
import getRouter from '@talend/react-router';

const routerModule = getRouter({ history, sagaRouterConfig });

cmf.bootstrap({
    modules: [routerModule],
});
```
