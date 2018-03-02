# Talend Scripts

## Description

This project, inspired by react-scripts and kcd-scripts, aims to abstract all tools and configuration from your project.
For now there are 3 goals : 
* build and dev-serve: based on webpack
* lint: based on eslint
* test: based on jest and enzyme

## How to use

### Default usage

1. Add @talend/scripts as dev dependency.
```bash
yarn add --dev @talend/scripts
```

2. This is the only tool you'll need. You can remove all the devDependencies related to the 3 goals (build/test/lint).

3. Define the npm scripts
```json
{
  "start": "talend-scripts start",
  "prepublish": "talend-scripts build",
  "lint:es": "talend-scripts lint:es"
}
```

4. You're good to go

### Customization

Unlike react-scripts, we enable customisation. To start to customize it, just add a `talend-scripts.json` in your project root folder.

```json
{
  "preset" : "talend",
  "webpack": {
    "config": {
      "development": "./webpack.config.dev.js",
      "production": "./webpack.config.prod.js"
    }
  },
  "my-preset-other-configuration": {}
}
```

| Option | Description |
|---|---|
| preset | Default: `talend` We support presets. Please refer to the next section for more information. |
| webpack.config.developement | User custom webpack configuration in dev mode. It will be merged with preset default webpack configuration. With that, user can add/override the configuration. |
| webpack.config.production | Same as previous one, but for production mode. |
| other | This json object is available for the preset you use. This is the entry point to set the presets specific variables. It allows the preset to set some customisation points, instead of redefining a whole preset for some specificities. Refers to your preset documentation. |

## Presets

@Talend/scripts allows to define the webpack/linter/test configuration. Those are called presets.

### How to create

A preset is a node module `talend-scripts-preset-${presetName}`. It exports 3 functions 

```javascript
module.exports = {
	getWebpackConfiguration(presetApi) { },
	getEslintConfigurationPath(presetApi) { },
}
```
| Preset function | Description |
|---|---|
| getWebpackConfiguration | Returns the webpack configuration object. |
| getEslintConfigurationPath | Returns the path to .eslintrc file. It will be passed to eslint --config option. This path should be absolute or relative from cwd. |


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

### How to use

1. Install the preset

```bash
yarn add --dev talend-scripts-preset-${presetName}
```

2. Update the preset in talend-scripts.json

```
{
  "preset": ${presetName}
}
```

3. Add any preset variables in talend-scripts.json, following your preset documentation.

### Preset talend configuration

```json
{
  "preset": "talend",
  "html": {
    "title": "Talend Data Preparation"
  },
  "sass": {
    "data": {
      "$brand-primary": "#4F93A7",
      "$brand-primary-t7": "#00A1B3",
      "$brand-secondary-t7": "#168AA6"
    }
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
| html.title | The title to display on the browser tab. |
| sass.data | Define a set of sass variables to customise @talend/theme. |
| webpack.api-url | Default: `http://localhost`. The preset adds a proxy to `/api` urls. |
