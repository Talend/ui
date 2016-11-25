# Talend Bootstrap Theme

STATUS: this is a Work In Progress.

[![Build Status](https://travis-ci.org/Talend/bootstrap-theme.svg?branch=travis)](https://travis-ci.org/Talend/bootstrap-theme)
[![dependencies Status](https://david-dm.org/Talend/bootstrap-theme/status.svg)](https://david-dm.org/Talend/bootstrap-theme)

This theme is a base theme free of colors that must be configured to be used.

It provides layout that follow Talend Style Guidelines.

Note: The example has been taken from the excellent project Bootstwatch.
But we have decided to rewrite the build using webpack and bootstrap-sass.

# Docs & Help
* [Example page](https://talend.github.io/bootstrap-theme)
* [Sass Api](https://talend.github.io/bootstrap-theme/sassdoc)

<!---* Frontify (soon &trade;))-->

# How to use

## Install dependency

```bash
npm install --save bootstrap-talend-theme
```

## Configure your project

In every project, we use webpack with sass-loader + css modules.

Create your webpack file and fill it with your own configuration.
You should at least just change the `$brand-primary` first to get your own colors;

```javascript
const SASS_DATA = `
  $brand-primary: #77828A;
  @import '~bootstrap-talend-theme/src/theme/guidelines';
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
				loaders: ['style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'],
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
import '!style!css!sass!bootstrap-talend-theme/src/theme/theme.scss';
```

sassLoader data is a sassLib params which inject the content on every @import directive.

You can now add [Bootstrap](http://getbootstrap.com/) markup!

# How to contribute

```bash
npm install
npm start
```
Open [http://localhost:8080/](http://localhost:8080/) to see your changes.
