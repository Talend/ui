# Talend Preset

This is a preset for @talend/scripts. It holds most of Talend projects tools configuration.

This preset allows some customisation through specific entry points. The configuration is done via `talend-scripts.json` configuration file.

## Convention

Your folder hierarchy should follow

```
<root>
    |_ src
        |_ app
            |_ index.js
            |_ index.html
        |_ assets
        |_ settings
    |_ cmf.json
    |_ package.json
    |_ talend-scripts.json
```

| Folder/File | Description |
|---|---|
| src/app | Your application code |
| src/app/index.js | Your entry point |
| src/app/index.html | Your html template |
| assets | The assets such as images. This folder content is copied via `copy-webpack-plugin`. |
| settings | Your settings. This can be changed, depending or your `cmf.json` configuration, but [DO NOT put the settings in assets](#cmf). |


## Configuration overview

```json
{
  "preset": "talend",
  "angular": true,
  "cmf": true,
  "html": {
    "title": "Talend Data Preparation",
    "other-options": "Option value passed to html-webpack-plugin"
  },
  "sass": {
    "data": {
      "$brand-primary": "#4F93A7",
      "$brand-primary-t7": "#00A1B3",
      "$brand-secondary-t7": "#168AA6"
    },
    "theme": "tdp"
  },
  "css": {
    "modules": false
  },
  "webpack": {
    "debug": true,
    "config": {
      "development": "./webpack.config.dev.js",
      "production": "./webpack.config.prod.js"
    },
    "api-url": "http://localhost:3030"
  }
}
```

| Preset variable | Description |
|---|---|
| cmf | `cmf-webpack-plugin` flag. |
| angular | Set this flag to tru to indicate that the project contains angular code. |
| html | `html-webpack-plugin` template and options customisation. |
| sass | `sass-loader` customisation. |
| css | `css-loader` customisation. |
| webpack | `webpack` and `devServer` customisation. |

## HTML

```json
{
  "preset": "talend",
  "html": {
    "title": "Talend Data Preparation",
    "other-options": "Option value passed to html-webpack-plugin"
  }
}
```

All those options are passed as `html-webpack-plugin` options. It goes in pair with your `index.html` template.
By default, your html template is located in `src/app/index.html`, which can be overridden with the preset html configuration.

```json
{
  "preset": "talend",
  "html": {
    "template": "my-template-path"
  }
}
```

## App loader

By default, a static app loader is available to be displayed during your webapp download. The loader contains the Talend logo.

To use it, you have the `html-webpack-plugin` option named `appLoader`.

```html
<html>
    <body>
        <div id="app">
            <%= htmlWebpackPlugin.options.appLoader %>
        </div>
    </body>
</html>
```

To change the logo, you can customise the `appLoaderIcon` variable in configuration.

```json
{
  "preset": "talend",
  "html": {
    "appLoaderIcon": "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDov+"
  }
}
```

## Sass/Css

You can pass all sass variables you need. Those will be loaded before any sass file.

```json
{
  "preset": "talend",
  "sass": {
    "data": {
      "$brand-primary": "red"
    }
  }
}
```

In case you want to load one of T7+ @talend/bootstrap-theme variation, you can pass the variation name.

```json
{
  "preset": "talend",
  "sass": {
    "theme": "tdp"
  }
}
```

By default, css modules are activated. To deactivate them,

```json
{
  "preset": "talend",
  "css": {
    "modules": false
  }
}
```

## Webpack

You can add the debug option to true so the webpack configuration will be printed to the output.

```json
{
  "preset": "talend",
  "webpack": {
    "debug": true
  }
}
```

## CMF

Talend preset integrates `cmf-webpack-plugin`. By default it is deactived, to enable it:

```json
{
  "preset": "talend",
  "cmf": true
}
```

It has an incompatibility with `copy-webpack-plugin`. To use it correctly

1. Create your `settings.json`, be careful not to create it in one of the folders copied by `copy-webpack-plugin`. Otherwise you'll end up in an infinite loop.
2. Create a `cmf.json` at your app root folder and configure it. *Important* : remove the destination property. `cmf-webpack-plugin` will output the result in a `settings.json` in the webpack output folder.
3. In your cmf app index file, you can fetch the settings from `/settings.json`.

## Versions

Some variables are injected as global.

| Variable | Description |
|---|---|
| BUILD_TIMESTAMP | The built timestamp. |
| TALEND_APP_INFO | Versioning of current app and @talend libs. To get the libs git SHA1, you need to provide `sha1.json` containing the sha of the packages (example below). |
| TALEND_APP_INFO.version | Current app version (from `package.json`). |
| TALEND_APP_INFO.revision | Current app version last commit SHA1 (determined with `git rev-parse HEAD`). |
| TALEND_APP_INFO.talendLibraries | @talend libs infos (name, SHA1 if provided in `sha1.json`, version from `package.json`). |

To include the git SHA1 of each talend libraries version, you need to provide a `sha1.json`, mapping the libraries with their SHA1.
Note that the librairies from `@talend/ui` will be gather into 1 library info.

**Example**

sha1.json
```json
{
    "@talend/dataset": "785a5552a4b",
    "@talend/rating": "156c32bc15",
    "@talend/ui": "8c8cb6544fe",
}
```

package.json
```json
{
    "version": "3.6.0",
    "dependencies": {
        "@talend/react-components": "^2.6.0",
        "@talend/react-forms": "^2.6.0",
        "@talend/dataset": "1.5.0"
        "@talend/sharing": "1.2.1"
    }
}
```

Result (`TALEND_APP_INFO`)
```javascript
{
    "version": "3.6.0",
    "revision": "654fe645b5c84",
    "talendLibraries": [
        {
            "name": "@talend/ui",
            "version": "^2.6.0",
            "revision": "8c8cb6544fe"
        },
        {
            "name": "@talend/dataset",
            "version": "1.5.0",
            "revision": "785a5552a4b"
        },
        {
            "name": "@talend/sharing",
            "version": "1.2.1",
            "revision": undefined
        },
    ]
}
```


## Babelrc

You can use your own babelrc but it is not recommanded. To do so, you will need to extend the preset babelrc.

```json
{
  "extends": "@talend/scripts/webapp/preset/config/.babelrc.json",
}
```

If you don't do so the app will fail in Error describe the above need.
Also please be sure to have read that file.

## Eslint

To use the eslint configuration in your IDE

1. Create an `.eslintrc` at your project root folder
2. Make it extend the one from talend preset

```json
{
  "extends": "./node_modules/@talend/scripts/webapp/preset/config/.eslintrc"
}
```

3. Configure your IDE plugin to enable eslint with your root eslintrc configuration.

## Angular tests via Karma

To run angular tests via karma, you need to create a `spec.bundle.js` in your project root.
It must include everything that Karma needs to load to run your tests.

Example
```javascript
import '@babel/polyfill';

// load the app files
import './src/app';

import 'angular-mocks';

// load tests files
const context = require.context('./src', true, /\.spec\.js/);
context.keys().forEach(context);
```


## Next

Let's see the configuration details.

Go to next step: [Talend preset details](./details.md).
