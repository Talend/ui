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
            debug: true,
            target: './locales',
            urlPattern: 'https://github.com/jsomsanith/locales/archive/{project}/{version}.zip',
            resources: [
                { project: 'TMC-test' },
                { project: 'UI-test', dependency: '@talend/react-components' },
            ],
        }),
    ],
}
```

| Property | Type | Default | Description |
|---|---|---|---|
| debug | boolean | `false` | Turn on/off debug logs. |
| target | `string` | `./` | Relative path in the output folder where to put the i18n files. |
| urlPattern | `string` | `` |  |
| resources.project | string |  |  |
