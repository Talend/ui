# @talend/html-webpack-plugin

This plugin is to provide some default [hooks](https://github.com/jantimon/html-webpack-plugin#events) into `html-webpack-plugin`

## options

The plugin support the following options:

| name | description |
| -- | -- |
| loadCSSAsync | Put all CSS in the body and use a trick to not block the rendering of the App |
| bodyBefore | Usefull to add some assets (script / link) into the body before the app |
| headerStyles | Usefull to add styles in the HEAD (to display a loader) |

example:

```javascript
const TalendHTML = require('@talend/html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Loader = require('@talend/react-components/lib/AppLoader/constant').default;
const ICON = "url('data:image/svg+xml;base64,PHN2...')";
const EXTENSION = process.env.NODE_ENV === ENV.DEV ? 'js' : 'min.js';

//... plugins
    new HtmlWebpackPlugin({
        // ... your options
    }),
    new TalendHTML({
        loadCSSAsync: true,
        headerStyles: [
            { tagName: 'style', closeTag: true, innerHTML: Loader.getLoaderStyle(ICON) },
        ],
        bodyBefore: [
            { tagName: 'script', closeTag: true, innerHTML: 'alert("hello");' },
        ],
    }),
```
## LICENSE

Copyright (c) 2006-2018 Talend

Licensed under the Apache V2 License
