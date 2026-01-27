---
'@talend/scripts-core': major
---

chore: remove storybook commands and integration

You should do the following to migrate:

in your package.json
```diff

"scripts": {
-  "start": "talend-scripts start"
+  "start": "storybook dev"
-  "build-storybook": "talend-scripts build-storybook"
+  "build-storybook": "storybook build"
}

"dependencies": {
-  "@talend/scripts-core": "^16.8.0",
+  "@talend/scripts-core": "^17.0.0",

-  "@storybook/addon-actions": "^7.6.21",
-  "@storybook/.*": "^7.6.21",
+  "@storybook/addon-a11y": "^10.1.11",
+  "@storybook/addon-links": "^10.1.11",
+  "@storybook/react": "^10.1.11",
+  "@storybook/react-vite": "^10.1.11",
-  "@talend/scripts-config-storybook-lib": "^5.8.0",
+  "@talend/scripts-config-storybook-lib": "^6.0.0",
+  "storybook": "^10.1.11"
}
```

Then ensure you have update your `.storybook/main.js` and `.storybook/preview` files like this:

- rename to main.mjs to use ESM
- keep main.ts if it was already in TS.

```js
// .storybook/main.mjs
import { createMainConfig } from '@talend/scripts-config-storybook-lib/main';

export default createMainConfig({});
```

```js
// .storybook/preview.mjs
import { createPreviewConfig } from '@talend/scripts-config-storybook-lib/main';

const preview = createPreviewConfig({
	parameters: {},
	i18n: {
		namespaces: [...tuiContainersNamespaces, ...tuiComponentsNamespaces, ...dsNamespaces],
		remoteLocalesMap: {
			'tui-containers':
				'https://statics.cloud.talend.com/@talend/locales-tui-containers/9.1.3/locales/{{lng}}/{{ns}}.json',
			'tui-components':
				'https://statics.cloud.talend.com/@talend/locales-tui-components/16.0.1/locales/{{lng}}/{{ns}}.json',
			'design-system':
				'https://statics.cloud.talend.com/@talend/locales-design-system/7.15.1/locales/{{lng}}/{{ns}}.json',
		},
	},
	cmf: {
		modules: [cmfModule],
		settings: settings,
	},
});
```

