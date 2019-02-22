# Customisation

Unlike react-scripts, we enable customisation. To start to customize it, just add a `talend-scripts.json` in your project root folder.

## talend-scripts.json

```json
{
  "preset" : "talend",
  "webpack": {
    "config": {
      "development": "./webpack.config.dev.js",
      "production": "./webpack.config.prod.js"
    }
  }
}
```

| Option | Description |
|---|---|
| preset | Default: `talend` We support presets. Please refer to the next section for more information. |
| webpack.config.developement | User custom webpack configuration in dev mode. It will be merged with the webpack dev config preset. With that, user can add/override the configuration. It requires the default webpack config format. |
| webpack.config.production | Same as previous one, but for production mode. |

## Next

Let's learn about talend preset configurations details, and what options it offers.

Got to next step: [Talend preset](../preset/README.md).
