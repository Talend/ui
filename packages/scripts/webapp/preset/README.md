# Talend Preset

This is a preset for @talend/scripts. It holds most of Talend projects tools configuration.

This preset allows some customisation through specific entry points. The configuration is done via `talend-scripts.json` configuration file.

## Convention

You folder hierarchy should follow

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
| html | `html-webpack-plugin` template and options customisation. |
| sass | `sass-loader` custom data. |
| css | `css-loader` custom data. |
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

All those options are passed as `html-webpack-plugin` options. It goes in pair with your index.html template.
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

## Webpack dev server

By default, a devServer proxy is in place, mapping all `/api` urls to `http://localhost`. You can change it to adapt to your backend api url.

```json
{
  "preset": "talend",
  "webpack": {
    "api-url": "http://localhost:3000"
  }
}
```

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

1. Create your `settings.json`, be careful not to create it in one of the folders copied by `copy-webpack-plugin`. Otherwise the merge will be overridden.
2. Create a `cmf.json` at your app root folder and configure it. *Important* : remove the destination property. `cmf-webpack-plugin` will output the result in a `settings.json` in the webpack output folder.
3. In your cmf app index file, you can fetch the settings from `/settings.json`.

## Babelrc

You can use your own babelrc if you want but please extends our babelrc in that case.

```json
{
  "extends": "node_modules/@talend/scripts/webapp/preset/config/babelrc.json",
  ...
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
  "extends": "@talend/scritps/preset/config/.eslintrc"
}
```

3. Configure your IDE plugin to enable eslint with your root eslintrc configuration.

## Next

Let's see the configuration details.

Go to next step: [Talend preset details](./details.md).
