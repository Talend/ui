# @talend/react-cmf-router

This is the old router of react-cmf packaged as external dependency.

## Migration path

First add it to your bootstrap app

```javascript
import cmf from '@talend/react-cmf';
import getRouter from '@talend/react-cmf-router';

const routerModule = getRouter({ history, sagaRouterConfig });

cmf.bootstrap({
    modules: [routerModule],
});
```
