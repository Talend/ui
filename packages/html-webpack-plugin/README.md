# @talend/html-webpack-plugin

This plugin is to provide some default [hooks](https://github.com/jantimon/html-webpack-plugin#events) into `html-webpack-plugin`

## options

The plugin support the following options:

| name | description |
| -- | -- |
| loadCSSAsync | Put all CSS in the body and use a trick to not block the rendering of the App |
| appLoaderIcon | This activate the AppLoader from @talend/react-components |
| versions | This setup the TALEND_APP_INFO global var to add some informations about the versions used |
| bodyBefore | Array of assets to add before the scripts |

example:

```javascript
const TalendHTML = require('@talend/html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ICON = "url('data:image/svg+xml;base64,PHN2...')";
const VERSIONS = {
	version: require('./package.json').version,
};

//... plugins
    new HtmlWebpackPlugin({
        // ... your options
    }),
    new TalendHTML({
        loadCSSAsync: true,
        appLoaderIcon: ICON,
        versions: VERSIONS,
        bodyBefore: [
            { tagName: 'script', closeTag: true, innerHTML: 'alert("hello");' },
        ],
    }),
```
## LICENSE

Copyright (c) 2006-2018 Talend

Licensed under the Apache V2 License
