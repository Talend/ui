## Webpack config customisation

Your folder hierarchy should follow

```
<root>
    |_ src
        |_ app
            |_ index.js
        |_ assets
        |_ settings
    |_ cmf.json
    |_ package.json
    |_ talend-scripts.js(on)
```

| Folder/File      | Description                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| src/app          | Your application code                                                                                                          |
| src/app/index.js | Your entry point                                                                                                               |
| assets           | The assets such as images. This folder content is copied via `copy-webpack-plugin`.                                            |
| settings         | Your settings. This can be changed, depending or your `cmf.json` configuration, but [DO NOT put the settings in assets](#cmf). |

## Configuration overview

```json
{
	"preset": "talend",
	"cmf": true,
	"html": {
		"title": "Talend Data Preparation",
		"other-options": "Option value passed to html-webpack-plugin"
	},
	"sass": {
		"data": {
			"$brand-primary": "#4F93A7",
			"$brand-primary-t7": "#00A1B3",
			"$brand-secondary-t7": "#168AA6"
		},
		"theme": "tdp"
	},
	"css": {
		"modules": false,
		"prefix": "resources/"
	},
	"js": {
		"prefix": "resources/"
	},
	"webpack": {
		"debug": true,
		"config": {
			"development": "./webpack.config.dev.js",
			"production": "./webpack.config.prod.js"
		}
	},
	"sentry": {
		"project": "tmc",
		"authToken": "xxxxxx",
		"include": ["dist"],
		"ignore": ["dist/cdn"]
	}
}
```

| Preset variable | Description                                               |
| --------------- | --------------------------------------------------------- |
| cmf             | `cmf-webpack-plugin` flag.                                |
| html            | `html-webpack-plugin` template and options customisation. |
| sass            | `sass-loader` customisation.                              |
| css             | `css-loader` customisation.                               |
| js              | `js` customisation.                                       |
| webpack         | `webpack` and `devServer` customisation.                  |
| sentry          | `sentry` release config.                                  |

## HTML

```json
{
	"preset": "talend",
	"html": {
		"title": "Talend Data Preparation",
		"other-options": "Option value passed to html-webpack-plugin"
	}
}
```

| html options  | type   | description                                            |
| ------------- | ------ | ------------------------------------------------------ |
| title         | string | fill the title tag in head                             |
| meta          | object | add `<meta name="objectkey" content="object value" />` |
| template      | string | default to `src/app/index.html`                        |
| appId         | string | id of your app will be used in many places             |
| appLoaderIcon | string | base64 encoded version of icon to use as AppLoader     |
| ...rest       |        | rest will be passed to HTML webpack plugins            |

by default the configuration will try to find custom html to add to the default

### Meta tags

You can use the [option](https://www.npmjs.com/package/html-webpack-plugin#options) meta which exists in the HTML webpack plugin like this:

```json
{
	"html": {
		"meta": { "metaname": "metavalue", "bis": "foo" }
	}
}
```

This is quite simple to use and understand but not enough flexible to add other attributes to the tag.

For more advanced use case talend-scripts will try to read .talend/head.html and will insert the results in the head tag.

## Template

By default you don't need to provide a template. The configuration will try to find the file but if not found it will fallback to our default template.

To customize html output you have the following options:

- add `src/app/index.html` only if you need to remove things from the current output
- add `.talend/head.html` so you can add anything in the head.
- add `.talend/body.html` so you can add anything in the body (useful for react portals).

Note: if you do not use our template you will have to add support for options.

## App loader in a custom template

By default, a static app loader is available to be displayed during your webapp download. The loader contains the Talend logo.

If you have a custom template and you want to use it, you must deal with the `html-webpack-plugin` option named `appLoader`.

```html
<html>
	<body>
		<div id="app"><%= htmlWebpackPlugin.options.appLoader %></div>
	</body>
</html>
```

To change the logo, you can customise the `appLoaderIcon` variable in configuration.

```json
{
	"preset": "talend",
	"html": {
		"appLoaderIcon": "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDov+"
	}
}
```

## Sass/Css

You can pass all sass variables you need. Those will be loaded before any sass file.

```json
{
	"preset": "talend",
	"sass": {
		"data": {
			"$brand-primary": "red"
		}
	}
}
```

In case you want to load one of T7+ @talend/bootstrap-theme variation, you can pass the variation name.

```json
{
	"preset": "talend",
	"sass": {
		"theme": "tdp"
	}
}
```

By default, css modules are activated. To deactivate them,

```json
{
	"preset": "talend",
	"css": {
		"modules": false
	}
}
```

## Webpack

You can add the debug option to true so the webpack configuration will be printed to the output.

```json
{
	"preset": "talend",
	"webpack": {
		"debug": true
	}
}
```

## CMF

Talend preset integrates `cmf-webpack-plugin`. By default it is deactived, to enable it:

```json
{
	"preset": "talend",
	"cmf": true
}
```

It has an incompatibility with `copy-webpack-plugin`. To use it correctly

1. Create your `settings.json`, be careful not to create it in one of the folders copied by `copy-webpack-plugin`. Otherwise you'll end up in an infinite loop.
2. Create a `cmf.json` at your app root folder and configure it. _Important_ : remove the destination property. `cmf-webpack-plugin` will output the result in a `settings.json` in the webpack output folder.
3. In your cmf app index file, you can fetch the settings from `/settings.json`.

## Versions

Some variables are injected as global.

| Variable                        | Description                                                                                                                                               |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BUILD_TIMESTAMP                 | The built timestamp.                                                                                                                                      |
| TALEND_APP_INFO                 | Versioning of current app and @talend libs. To get the libs git SHA1, you need to provide `sha1.json` containing the sha of the packages (example below). |
| TALEND_APP_INFO.version         | Current app version (from `package.json`).                                                                                                                |
| TALEND_APP_INFO.revision        | Current app version last commit SHA1 (determined with `git rev-parse HEAD`).                                                                              |
| TALEND_APP_INFO.talendLibraries | @talend libs infos (name, SHA1 if provided in `sha1.json`, version from `package.json`).                                                                  |

To include the git SHA1 of each talend libraries version, you need to provide a `sha1.json`, mapping the libraries with their SHA1.
Note that the librairies from `@talend/ui` will be gather into 1 library info.

**Example**

sha1.json

```json
{
	"@talend/dataset": "785a5552a4b",
	"@talend/rating": "156c32bc15",
	"@talend/ui": "8c8cb6544fe"
}
```

package.json

```json
{
	"version": "3.6.0",
	"dependencies": {
		"@talend/react-components": "^2.6.0",
		"@talend/react-forms": "^2.6.0",
		"@talend/dataset": "1.5.0",
		"@talend/sharing": "1.2.1"
	}
}
```

Result (`TALEND_APP_INFO`)

```javascript
const TALEND_APP_INFO = {
	version: '3.6.0',
	revision: '654fe645b5c84',
	talendLibraries: [
		{
			name: '@talend/ui',
			version: '^2.6.0',
			revision: '8c8cb6544fe',
		},
		{
			name: '@talend/dataset',
			version: '1.5.0',
			revision: '785a5552a4b',
		},
		{
			name: '@talend/sharing',
			version: '1.2.1',
			revision: undefined,
		},
	],
};
```

## whyDidYouRender

This package bundles automatically for dev only [whyDidYouRender](https://github.com/welldone-software/why-did-you-render) library to help you investigate React rendering issues.

### How to use?

```javascript
// log only if rendering occurs while props values are the same
Component.whyDidYouRender = true;

Component.whyDidYouRender = {
	logOnDifferentValues: true, // log on every change of props
	customName: 'Menu', // change the name of the log for this component
};
```

If your component is cmf connected you also can do the following

```json
{ "props": { "MyComponent#its-component-id-or-default": { "whyDidYouRender": true } } }
```

## Route basename

If you want to serve the app under a basename, set a `BASENAME` environment variable before start.

```json
{
	"scripts": {
		"start": "BASENAME=/tdc/ talend-scripts start"
	}
}
```

## Sentry

Sentry config are only used for build script in production mode. If you add this config it will:

1. Create a new release for your project on Sentry. Release version will be taken from `package.json`'s version.
2. Upload sourcemaps to Sentry.

```json
{
	"sentry": {
		"project": "tmc",
		"authToken": "xxxxxx",
		"include": ["dist"],
		"ignore": ["dist/cdn"]
	}
}
```

| sentry options | type                | description                                                                                                                                                                                                                                  |
| -------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| project        | string              | The slug of the Sentry project associated with the app.                                                                                                                                                                                      |
| authToken      | string              | The authentication token to use for all communication with Sentry. Can be obtained from https://sentry.io/settings/account/api/auth-tokens/. Required scopes: project:releases (and org:read if setCommits option is used).                  |
| include        | string/array/object | One or more paths that Sentry CLI should scan recursively for sources. It will upload all `.map` files and match associated .js files. Defaults to `["dist"]`. More info [here].(https://github.com/getsentry/sentry-webpack-plugin#options) |
| ignore         | string/array        | One or more paths to ignore during upload, defaults to ['cdn'], so sourcemaps inside `dist/cdn` won't be uploaded as default.                                                                                                                |

There're several ways to configure `authToken` and `project` other than `talend.json`. You can choose a convient way to configure them for CI. Sentry CLI will pick up these configurations automatically.

1. Environment variables:

```shell
> cross-env SENTRY_AUTH_TOKEN=[yourToken] SENTRY_PROJECT=[yourProjectId(eg. tmc)] talend-scripts build
```

2. Config file: provide a `.sentryclirc` in the root of your app, with your auth token and project ID.

```shell
[defaults]
project=[yourProjectId(eg. tmc)]

[auth]
token=[yourToken]
```

For more information, see [Sentry CLI configuration values](https://docs.sentry.io/product/cli/configuration/#configuration-values)
