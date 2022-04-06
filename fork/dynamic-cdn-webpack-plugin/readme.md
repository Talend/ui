# dynamic-cdn-webpack-plugin

[![NPM][npm-icon] ][npm-url]

[npm-icon]: https://img.shields.io/npm/v/@talend/dynamic-cdn-webpack-plugin.svg
[npm-url]: https://npmjs.org/package/@talend/dynamic-cdn-webpack-plugin

> Dynamically get your dependencies from a cdn rather than bundling them in your app


Warning: This module is a fork from https://github.com/mastilver/dynamic-cdn-webpack-plugin. We start to fork after month without update and because we need to ship our libs and project over CDN leverage UMD builds.

The underlying module-to-cdn for the same reason has also been forked https://npmjs.org/package/@talend/module-to-cdn.


## Install

```
$ npm install --save-dev @talend/dynamic-cdn-webpack-plugin @talend/module-to-cdn
```

## Compatibility with webpack

If you are using `webpack --version <= 3` then you should be installing with the following command.

```
$ npm install --save-dev dynamic-cdn-webpack-plugin@3.4.1 module-to-cdn
```

## Usage with HtmlWebpackPlugin

`webpack.config.js`<br>
```js
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('@talend/dynamic-cdn-webpack-plugin');

module.exports = {
    entry: {
        'app.js': './src/app.js'
    },

    output: {
        path.resolve(__dirname, './build'),
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new DynamicCdnWebpackPlugin()
    ]
}
```

`app.js`<br>
```js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// ... do react stuff
```

`webpack --mode=production` will generate:

```js
/* simplified webpack build */
[function(module, __webpack_exports__, __webpack_require__) {
    module.exports = React;
}),
(function(module, __webpack_exports__, __webpack_require__) {
    module.exports = ReactRouterDOM;
}),
(function(module, __webpack_exports__, __webpack_require__) {
    var react = __webpack_require__(0);
    var reactRouterDOM = __webpack_require__(1);

    /* ... */
})]
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
    <script type="text/javascript" src="https://unpkg.com/react@15.5.3/dist/react.min.js"></script><script type="text/javascript" src="https://unpkg.com/react-router-dom@4.1.1/umd/react-router-dom.min.js"></script><script src="build/app.js"></script></body>
</html>
```

## Usage with ManifestPlugin

`webpack.config.js`<br>
```js
const path = require('path');

const ManifestPlugin = require('webpack-manifest-plugin');
const DynamicCdnWebpackPlugin = require('@talend/dynamic-cdn-webpack-plugin');

module.exports = {
    entry: {
        'app': './src/app.js'
    },

    output: {
        path.resolve(__dirname, './build'),
    },

    plugins: [
        new ManifestPlugin({
            fileName: 'manifest.json'
        }),
        new DynamicCdnWebpackPlugin()
    ]
}
```

`app.js`<br>
```js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// ... do react stuff
```

`webpack --mode=production` will generate:

```js
/* simplified webpack build */
[function(module, __webpack_exports__, __webpack_require__) {
    module.exports = React;
}),
(function(module, __webpack_exports__, __webpack_require__) {
    module.exports = ReactRouterDOM;
}),
(function(module, __webpack_exports__, __webpack_require__) {
    var react = __webpack_require__(0);
    var reactRouterDOM = __webpack_require__(1);

    /* ... */
})]
```

```json
{
    "app.js": "app.js",
    "react.js": "https://unpkg.com/react@15.5.3/dist/react.min.js",
    "react-router-dom.js": "https://unpkg.com/react-router-dom@4.1.1/umd/react-router-dom.min.js"
}
```


## API

### DynamicCdnWebpackPlugin(options)

`webpack.config.js`<br>
```js
const DynamicCdnWebpackPlugin = require('@talend/dynamic-cdn-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new DynamicCdnWebpackPlugin(options)
    ]
}
```

#### options.disable

Type: `boolean`<br>
Default: `false`

Useful when working offline, will fallback to webpack normal behaviour

#### options.env

Type: `string`<br>
Default: `mode`<br>
Values: `development`, `production`

Determine if it should load the development or the production version of modules

#### options.only

Type: `Array<string>`
Default: `null`

List the only modules that should be served by the cdn

#### options.exclude

Type: `Array<string>`
Default: `[]`

List the modules that will always be bundled (not be served by the cdn)

#### options.loglevel

Type: `string`<br>
Default: `ERROR`
Options: ERROR, INFO, DEBUG

ERROR:
* module XX could not be loaded because peerDependency YY is not loaded

INFO:
* module XX already loaded in another version

DEBUG:
* module XX could not be found in cdn config
* module XX will be served http://mycdn.com/XX/version/xx.min.js


#### options.resolver
Type: `string`, `function`<br>
Default: `'@talend/module-to-cdn'`

Allow you to define a custom module resolver, it can either be a `function` or an npm module.
The resolver should return (or resolve as a Promise) either `null` or an `object` with the keys: `name`, `var`, `url`, `version`.

#### options.addURL
Type: `function`<br>

This function should be aligned with the resolver to support dependencies manifest. It take builted info from it and add cdn url to the info structure to have align values.

## Related

- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
- [@talend/module-to-cdn](https://github.com/toutpt/module-to-cdn)


## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/mastilver"><img src="https://avatars3.githubusercontent.com/u/4112409?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Thomas Sileghem</b></sub></a><br /><a href="https://github.com/mastilver/dynamic-cdn-webpack-plugin/commits?author=mastilver" title="Code">💻</a> <a href="https://github.com/mastilver/dynamic-cdn-webpack-plugin/commits?author=mastilver" title="Documentation">📖</a> <a href="https://github.com/mastilver/dynamic-cdn-webpack-plugin/commits?author=mastilver" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/aulisius"><img src="https://avatars2.githubusercontent.com/u/6629172?v=4?s=100" width="100px;" alt=""/><br /><sub><b>​Faizaan</b></sub></a><br /><a href="#question-aulisius" title="Answering Questions">💬</a> <a href="https://github.com/mastilver/dynamic-cdn-webpack-plugin/commits?author=aulisius" title="Code">💻</a> <a href="https://github.com/mastilver/dynamic-cdn-webpack-plugin/commits?author=aulisius" title="Documentation">📖</a></td>
    <td align="center"><a href="https://twitter.com/mjackson"><img src="https://avatars0.githubusercontent.com/u/92839?v=4?s=100" width="100px;" alt=""/><br /><sub><b>MICHAEL JACKSON</b></sub></a><br /><a href="https://github.com/unpkg/unpkg-demos" title="Examples">💡</a></td>
    <td align="center"><a href="http://blog.fedeoo.cn/"><img src="https://avatars2.githubusercontent.com/u/5313455?v=4?s=100" width="100px;" alt=""/><br /><sub><b>fedeoo</b></sub></a><br /><a href="https://github.com/mastilver/dynamic-cdn-webpack-plugin/pull/21" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!


## License

MIT © [Thomas Sileghem](http://mastilver.com)
