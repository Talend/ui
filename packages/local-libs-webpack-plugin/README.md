# @talend/local-libs-webpack-plugin

Easier local development on libraries. Skip the prepublish, npm link, copying libs into node_modules steps.

**This plugin is meant to be used in development only**

LocalLibsWebpackPlugin will let you do 2 things:

- import npm modules from local paths, without using npm link or modifying import paths.
- Use the **source** files of your library to avoid the manual compilation step after each code change.

# Requirements for using source files

- The library must have a `"mainSrc"` field in its package.json. This field specifies where the **source** entry file is. `"main"` usually refer to a dist or lib folder where the compiled files are located.
- Your app's webpack config and its loaders must be able to bundle the library code on its own.

# Install

`$ yarn add --dev @talend/local-libs-webpack-plugin`

# Usage

`$ webpack-dev-server --env.mylib --env.myotherlib`

Add the relative paths to the package.json of the packages you want to use locally. If you specify a lerna.json path it will automatically use all packages listed in lerna.json `packages` field. 
```js
// webpack.config.js
const LocalLibsWebpackPlugin = require('@talend/local-libs-webpack-plugin');

module.exports = (env = {}) => ({
	plugins: [
		new LocalLibsWebpackPlugin({
			'../mylib/package.json': env.mylib,
			'../myotherlib/lerna.json': env.myotherlib,
		}),
	],
});
```

This example uses webpack's env variables, but you can use Node environment variables or anything you prefer.

# Tips

If you have your webpack command in an npm script you can use that as well. The flags will be passed to webpack.

`$ yarn start --env.myLib`

package.json

```json
{
	"scripts": {
		"start": "webpack-dev-server mode=development --config webpack.config.dev.js"
	}
}
```

This combination will run `webpack-dev-server mode=development --config webpack.config.dev.js --env.myLib`

## LICENSE

Copyright (c) 2006-2019 Talend

Licensed under the Apache V2 License
