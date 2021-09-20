# Talend Bootstrap Theme

[![npm version](https://badge.fury.io/js/@talend/bootstrap-theme.svg)](https://badge.fury.io/js/@talend/bootstrap-theme)
[![Build Status](https://travis-ci.org/Talend/bootstrap-theme.svg?branch=travis)](https://travis-ci.org/Talend/bootstrap-theme)
[![dependencies Status](https://david-dm.org/Talend/bootstrap-theme/status.svg)](https://david-dm.org/Talend/bootstrap-theme)

Base theme following Talend Style Guidelines.

Note: The example has been taken from the excellent project [Bootstwatch](https://bootswatch.com/).

# Docs & Help

* [Example page](https://talend.github.io/bootstrap-theme)
* [Sass Api](https://talend.github.io/bootstrap-theme/sassdoc)


# How to use

## Install dependency

```bash
npm install --save @talend/bootstrap-heme
```

or

```bash
yarn add --dev @talend/bootstrap-theme
```

## Configure your project

In every project, we use webpack with sass-loader + css modules.

Create your webpack file and fill it with your own configuration.
You should at least just change the `$brand-primary` first to get your own colors;

```javascript
const SASS_DATA = `
  $brand-primary: #77828A;
  @import '~@talend/bootstrap-theme/src/theme/guidelines';
`;

module.exports = {
	plugins: [
		// your custom plugins
	],
	module: {
		loaders: [
			{
				test: /\.scss$/,
				exclude: /bootstrap.scss/,
				loaders: [
					'style',
					'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass',
				],
			},
		],
	},
	sassLoader: {
		data: SASS_DATA,
	},
};
```

and in your app you can do the following

```javascript
import '!style!css!@talend/bootstrap-theme/dist/bootstrap.css';
```

sassLoader data is a sassLib params which inject the content on every @import directive.

You can now add [Bootstrap](http://getbootstrap.com/) markup!

# How to contribute

```bash
yarn && yarn start
```

Open [http://localhost:1337/](http://localhost:1337/) to see your changes.
