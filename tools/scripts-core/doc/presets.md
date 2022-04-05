# Presets

`@talend/scripts-core` allows to define the webpack/babel/eslint/jest/karma/typescript configuration. Those are called presets.

### How to create a preset ?

A preset is a node module that exposes functions in their `index.js`.

```javascript
module.exports = {
	getEslintConfigurationPath(presetApi) { },
	getJestConfigurationPath(presetApi) { },
	getKarmaConfigurationPath(presetApi) { },
	getBabelConfigurationPath(presetApi) { },
	getTypescriptConfigurationPath(presetApi) { },
	getWebpackConfiguration(presetApi) { },
}
```
| Preset function | Description |
|---|---|
| getEslintConfigurationPath | Returns the path to `.eslintrc` file. It will be passed to eslint --config option. This path should be absolute or relative from cwd. |
| getJestConfigurationPath | Returns the path to jest config file (js/json). It will be passed to jest --config option. This path should be absolute or relative from cwd. |
| getKarmaConfigurationPath | Returns the path to karma config file. It will be passed to karma cli. This path should be absolute or relative from cwd. |
| getBabelConfigurationPath | Returns the path to babel config file. It will be passed to babel --config-file option. This path should be absolute or relative from cwd. |
| getTypescriptConfigurationPath | Returns the path to typescript config file. It will be used the webpack configuration if configured on the root project. This path should be absolute or relative from cwd. |
| getWebpackConfiguration | Returns the webpack configuration object. |

The preset api contains the run mode and utility functions

```javascript
const {
	mode,
	getUserConfig,
} = presetApi;
```

| Preset api | Description |
|---|---|
| mode | The run mode : `development` or `production` |
| getUserConfig(path: array or string, defaultValue: any) | User configuration getter. They are defined in the `talend-scrips.json` file. It uses lodash.get under the hood, the object path can be an array of keys of a dot-separated string. |

### How to change the preset ?

1. Install the preset

```bash
yarn add --dev ${presetName}
```

2. Create a `talend-scripts` [configuration file](./customisation.md) at your project root.

```
{
  "preset": ${presetName}
}
```

3. Complete `talend-scripts` configuration file, following your preset documentation.

## Next

We know that your project will have some custom needs, and it would be painful to write a whole preset for that (duplication, a new module, etc).
It's possible to extend a preset with additional configuration without writing a preset.

Got to next step: [Preset customisation](./customisation.md).
