## Storybook configuration for lib

This configuration module contains an opinionated storybook configuration, supporting some extra features around talend libraries and framework.

### How to use

First step is to use it with the default configuration as possible.

This is served with talend presets

``` bash
yarn add @talend/scripts-core @talend/scripts-preset-react-lib
# or
yarn add @talend/scripts-core @talend/scripts-preset-react
# or
yarn add @talend/scripts-core @talend/scripts-preset-react-ng
```

In your package.json

```json
{
    "scripts": {
        "start-storybook": "talend-scripts start-storybook",
        "build-storybook": "talend-scripts build-storybook",
    }
}
```

### Default configuration

Default configuration can be found in ui-scripts repo:
- [main.js](https://github.com/Talend/ui-scripts/blob/master/packages/config-storybook-lib/.storybook-templates/main.js#L22)
- [preview.js](https://github.com/Talend/ui-scripts/blob/master/packages/config-storybook-lib/.storybook-templates/preview.js#L26)
- [preview-head](https://github.com/Talend/ui-scripts/blob/master/packages/config-storybook-lib/.storybook-templates/preview-head.html)

### MSW addon

MSW addon is configured and initialized out of the box. You can use it directly without any other configuration.

### CMF

You can initialize `@talend/react-cmf` with a proper decorator by exporting the cmf modules and settings in `preview.js`.

```javascript
import cmfModule, { settings } from './cmfModule';

export const cmf = {
	modules: [cmfModule],
	settings, // optional
};
```

### i18n

You can initialize `i18next` with a proper decorator by exporting the i18n namespaces and locales  `preview.js`. Locales can be static translations or urls to the translation files.

Static translations example

```javascript
import { locales as datasetLocales } from '@talend/locales-inventory-dataset/locales';
import { namespaces as datasetNamespaces } from '@talend/locales-inventory-dataset/namespaces';
import { locales as ratingLocales } from '@talend/locales-inventory-rating/locales';
import { namespaces as ratingNamespaces } from '@talend/locales-inventory-rating/namespaces';
import { locales as sharingLocales } from '@talend/locales-inventory-sharing/locales';
import { namespaces as sharingNamespaces } from '@talend/locales-inventory-sharing/namespaces';

export const i18n = {
	namespaces: [...datasetNamespaces, ...ratingNamespaces, ...sharingNamespaces],
	locales: merge(sharingLocales, datasetLocales, ratingLocales),
};
```

Remote translations example

```javascript
import { namespaces as tuiNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';

export const i18n = {
	namespaces: [...tuiNamespaces, ...dsNamespaces],
	remoteLocalesMap: {
		'tui-components':
			'https://unpkg.com/@talend/locales-tui-components/locales/{{lng}}/{{ns}}.json',
		'design-system': 'https://unpkg.com/@talend/locales-design-system/locales/{{lng}}/{{ns}}.json',
	},
};
```

### Advanced configuration

It is possible to add custom storybook configurations. They will be merged with default configuration.

To do so, just create a `.storybook/` folder and any storybook configuration files in it, like when you configure your storybook yourself. Keep in mind that using `@talend/scripts` to run/build storybook will always take default settings too.
