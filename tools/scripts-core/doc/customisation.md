# Customisation

Unlike `react-scripts`, we enable customisation. To start to customize it, just add a `talend-scripts.json` or a `talend-scripts.config.js` file in your project root folder.

## Webpack

To start to customize webpack, just add a `talend-scripts` configuration file in your project root folder.

```json
{
  "preset" : "@talend/scripts-preset-react",
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
| preset | The preset name. |
| webpack.config.development | User custom webpack configuration in dev mode. It will be merged with the webpack dev config preset. With that, you can add/override some configuration. It requires the default webpack config format. |
| webpack.config.production | Same as previous one, but for production mode. |

## Other tools

To customise babel, jest, eslint or typescript you need to create the corresponding configuration file at your project root folder.

Note that your configuration file will override the preset configuration. To extend it, you can use
```shell
> talend-scripts extends
```

This command will create
* a `jest.config.js` file
* a `.eslintrc` file
* a `.babelrc.json` file
* a `.tsconfig.json` file
* a `.stylelintrc.js` file
All those files will extend the selected preset configuration.

## Next

Let's learn about talend preset configurations details, and what options it offers.

Got to next step: Talend presets
* [preset react app](../preset-react/README.md).
* [preset react lib](../preset-react-lib/README.md).
* [preset react/angularjs hybrid app](../preset-react-ng/README.md).
