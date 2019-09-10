# React CMF Webpack Plugin (aka @talend/react-cmf-webpack-plugin)

Simplifies merging of CMF settings files to serve your webpack bundles.

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f1e353b0f69c4cf99a4cb3f68b70ea7d)](https://www.codacy.com/app/Talend/ui/packages/cmf-webpack-plugin)

[npm-icon]: https://nodei.co/npm/@talend/react-cmf-webpack-plugin.png?downloads=true
[npm-url]: https://npmjs.org/package/@talend/react-cmf-webpack-plugin
[travis-ci-image]: https://travis-ci.org/Talend/@talend/react-cmf-webpack-plugin.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/@talend/react-cmf-webpack-plugin
[dependencies-image]: https://david-dm.org/Talend/@talend/react-cmf-webpack-plugin/status.svg
[dependencies-url]: https://david-dm.org/Talend/@talend/react-cmf-webpack-plugin
[devdependencies-image]: https://david-dm.org/Talend/@talend/react-cmf-webpack-plugin/dev-status.svg
[devdependencies-url]: https://david-dm.org/Talend/@talend/react-cmf-webpack-plugin#info=devDependencies
[quality-badge]: http://npm.packagequality.com/shield/@talend/react-cmf-webpack-plugin.svg
[quality-url]: http://packagequality.com/#?package=@talend/react-cmf-webpack-plugin

## Content

This package provides Webpack plugin to deal with several React CMF settings files.

## Installation

Install dependency:

```bash
$> yarn add @talend/react-cmf-webpack-plugin
```

## Basic Usage

You must have a _cmf.json_ file at root folder of your project:

```json
{
	"settings": {
		"sources": ["src/settings", "node_modules/another_package_name/lib/settings/"],
		"sources-dev": ["src/settings", "../../another_package_name/src/settings/"],
		"destination": "dist/settings.json"
	}
}
```

Edit your webpack.config.js file:

```javascript
const ReactCMFWebpackPlugin = require('@talend/react-cmf-webpack-plugin');

const webpackConfig = {
	entry: 'index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
	},
	plugins: [new ReactCMFWebpackPlugin()],
};
```

## Configuration

You can pass a bunch of configuration options to ReactCMFWebpackPlugin. Allowed values are as follows:

| Option      | Type    | Default | Description                                                                |
| ----------- | ------- | ------- | -------------------------------------------------------------------------- |
| `dev`       | Boolean | false   | `devSource` entry will be used instead of `sources` one in _cmf.json_ file |
| `quiet`     | Boolean | false   | No output at all                                                           |
| `recursive` | Boolean | false   | Recursive search for JSON files                                            |
| `watch`     | Boolean | false   | Watch settings in dev mode                                                 |

Here's an example webpack config illustrating how to use these options:

```javascript
const ReactCMFWebpackPlugin = require('@talend/react-cmf-webpack-plugin');

const webpackConfig = {
	entry: 'index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
	},
	plugins: [
		new ReactCMFWebpackPlugin({
			dev: false,
			quiet: false,
			recursive: false,
			watch: process.env.NODE_ENV === 'developement',
		}),
	],
};
```
