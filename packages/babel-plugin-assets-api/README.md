# @talend/babel-plugin-assets-api

This plugin is underground friends of [@talend/assets-api](https://npmjs.com/package/@talend/assets-api) package.

Because we care about developer experience and because no one want to maintain in the code base versions of packages we have decided to propose this babel plugin.

It transform the following code:

```javascript
import assetsAPI from '@talend/assets-api';

assetsAPI.getURL('/', 'react');
assetsAPI.getJSON('/foo.json', 'react');
assetsAPI.getUMD('react');
```

into this code needed for runtime:

```javascript
import assetsAPI from '@talend/assets-api';

assetsAPI.getURL('/', 'react', '16.14.0');
assetsAPI.getJSON('/foo.json', 'react', '16.14.0');
assetsAPI.getUMD('react', '16.14.0', 'React', '/umd/react.production.min.js');
```
