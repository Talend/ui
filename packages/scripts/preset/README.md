# Preset Talend

This is a preset for @talend/scripts. It holds most of Talend projects tools configuration.

This preset allows some customisation through specific entry points. The configuration is done via `Talend/scripts` configuration file `talend-scripts.json`.

## Configuration overview

```json
{
  "preset": "talend",
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

## Webapck

By default, a devServer proxy is in place, mapping all `/api` urls to `http://localhost`. You can change it to adapt to your backend api url.

```json
{
  "preset": "talend",
  "webpack": {
    "api-url": "http://localhost:3000"
  }
}
```
