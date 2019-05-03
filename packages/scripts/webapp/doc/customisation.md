# Customisation

Unlike `react-scripts`, we enable customisation. To start to customize it, just add a `talend-scripts.json` in your project root folder.

## Webpack

To start to customize webpack, just add a `talend-scripts.json` in your project root folder.

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
| preset | Default: `talend`. The preset name. |
| webpack.config.developement | User custom webpack configuration in dev mode. It will be merged with the webpack dev config preset. With that, you can add/override some configuration. It requires the default webpack config format. |
| webpack.config.production | Same as previous one, but for production mode. |

## Other tools

To customise babel, jest, eslint you need to create the corresponding configuration file at your project root folder.

Note that your configuration file will override the preset configuration. To extend it, you can use
```shell
> talend-scripts extends
```

This command will create
* a `jest.config.js` file
* a `.eslintrc` file
* a `.babelrc.json`file
All those files will extend the selected preset configuration.

## Next

Let's learn about talend preset configurations details, and what options it offers.

Got to next step: [Talend preset](../preset/README.md).
