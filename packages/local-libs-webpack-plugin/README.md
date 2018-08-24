# @talend/local-libs-webpack-plugin

Easier local development on libraries. Skip prepublish, npm link, and copying libs into node_modules. 

**This plugin is meant to be used in development only**

LocalLibsWebpackPlugin will let you use npm modules locally, without using npm link or modifying import paths. For best experience the library you want to use should have a `"mainSrc"` field in package.json, specifying where the **source** entry file is. `"main"` usually refer to a dist or lib folder. 

# Install
`$ yarn add --dev @talend/local-libs-webpack-plugin`

# Usage

webpack.config.js
```js
const LocalLibsWebpackPlugin = require('@talend/local-libs-webpack-plugin');

module.exports = {
	plugins: [
		new LocalLibsWebpackPlugin: [
			'../relative/path/to/package.json',
			'/can/also/use/lerna.json',
		],
	],
};
```

It can also be useful to use webpack's env variables for conditional options:

Example command (webpack): `$ yarn start --env.mylib --env.myotherlib`

webpack.config.js
```js
const LocalLibsWebpackPlugin = require('@talend/local-libs-webpack-plugin');

module.exports = {
	plugins: [
		new LocalLibsWebpackPlugin: {
			'../mylib/package.json': env.mylib,
			'../myotherlib/lerna.json': env.myotherlib,
		},
	],
};
```

## LICENSE

Copyright (c) 2006-2016 Talend

Licensed under the Apache V2 License
