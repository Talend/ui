# I18n Fetcher webpack plugin

This module fetches the i18n files at build time.
If the file is a zip, it expects to be a zip of a folder (like github archives).
* it will unzip it
* it will get rid of the root folder

## Installation

```shell
> yarn add --dev @talend/i18n-fetcher-webpack-plugin
```

## Configuration

```javascript
modules.exports = {

    plugins: [
        new I18nFetcherPlugin({
            cache: 3600000,
            debug: true,
            headers: { Authorization: 'GITHUB_TOKEN' },
            target: './locales',
            urlPattern: 'https://github.com/jsomsanith/locales/archive/{project}/{version}.zip',
            resources: [
                { project: 'TMC' },
                { project: 'UI', dependency: '@talend/react-components' },
            ],
        }),
    ],
}
```

| Property | Type | Default | Description |
|---|---|---|---|
| cache | `number` | 1 day | If you already have fetched locales . |
| debug | `boolean` | `false` | Turn on/off debug logs. |
| headers | `object` | `{ Authorization: 'GITHUB_TOKEN' }` | An object containing the headers to pass to the request. Each value is resolved with environment variables. With the default value (`{ Authorization: 'GITHUB_TOKEN' }`), the headers will be { Authorization: '<process.env.GITHUB_TOKEN>' } |
| target | `string` | `./` | Relative path in the output folder where to put the i18n files. |
| urlPattern | `string` | `https://github.com/talend/locales/archive/{project}/{version}.zip` | The url to fetch. You can use `project` and `version` as variables. The version is automatically resolved, see [version](#versions) section for more details. |
| resources | `array` | - | The resources to fetch. It contains the variables to resolve from `urlPattern`. |
| resources.dependency | `string` | - | The dependency to check to get the version. If not provided, the current project version is taken. |

## Version

For each resources, a version is resolved from your `package.json` and only the `major.minor` are extracted.
It is used to resolve any `{version}` in the url pattern.

By default, it will take the version of your app (`package.json` > `version`).

```javascript
// package.json
{
    "version": "1.3.6"
}


// webpack.config.js
new I18nFetcherPlugin({
    urlPattern: 'https://myLocals.com/{project}/{version}.zip',
    resources: [
        { project: 'TMC' }, // this will fetch https://myLocals.com/TMC/1.3.zip
    ],
}),
```

For dependencies, you need to add a `dependency` value that refers the package name to check.

```javascript
// package.json
{
    "dependencies": {
        "@talend/react-components": "2.0.1"
    }
}


// webpack.config.js
new I18nFetcherPlugin({
    urlPattern: 'https://myLocals.com/{project}/{version}.zip',
    resources: [
        { project: 'TUI', dependency: '@talend/react-components' }, // this will fetch https://myLocals.com/TUI/2.0.zip
    ],
}),
```
