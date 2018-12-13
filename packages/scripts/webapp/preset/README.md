# Preset Talend

This is a preset for @talend/scripts. It holds most of Talend projects tools configuration.

This preset allows some customisation through specific entry points. The configuration is done via `Talend/scripts` configuration file `talend-scripts.json`.

## Configuration overview

```json
{
  "preset": "talend",
  "cmf": false,
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
  "webpack": {
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

## Sass

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

## Webpack

By default, a devServer proxy is in place, mapping all `/api` urls to `http://localhost`. You can change it to adapt to your backend api url.

```json
{
  "preset": "talend",
  "webpack": {
    "api-url": "http://localhost:3000"
  }
}
```

## CMF

Talend preset integrates `cmf-webpack-plugin`. By default it is active, it is possible to disable the plugin with a flag

```json
{
  "preset": "talend",
  "cmf": false
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
  "extends": "node_modules/@talend/scripts/preset/config/babelrc.json",
  ...
}
```

If you don't do so the app will fail in Error describe the above need.
Also please be sure to have read that file.
