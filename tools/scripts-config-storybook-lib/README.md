# @talend/storybook-config

Storybook configuration utilities for Talend UI. This package provides TypeScript functions to easily configure Storybook with Talend's defaults, replacing the previous template-based CLI approach.

## Installation

```bash
yarn add -D @talend/storybook-config
```

## Features

- 🎨 **Pre-configured themes**: Light, Dark, and Qlik themes with toolbar switcher
- 🌍 **i18n support**: Built-in i18next configuration with locale switcher
- 🎭 **Design system integration**: IconsProvider and ThemeProvider decorators
- 🧪 **MSW integration**: Mock Service Worker support for API mocking
- 📦 **Bootstrap theme toggle**: Easy on/off switch for Bootstrap CSS
- ⚛️ **CMF support**: Optional Component Metadata Framework integration
- 🔧 **TypeScript-first**: Full TypeScript support with type definitions

## Usage

### Basic Setup

#### Main Configuration (`.storybook/main.ts`)

```typescript
import { createMainConfig } from '@talend/scripts-config-storybook-lib/main';

export default createMainConfig();
```

#### Preview Configuration (`.storybook/preview.ts`)

```typescript
import '@talend/bootstrap-theme/dist/bootstrap.css';
import { createPreviewConfig } from '@talend/scripts-config-storybook-lib/preview';

export default createPreviewConfig({});
```

### Advanced Configuration

#### With Custom Stories and Addons

```typescript
// .storybook/main.ts
import { createMainConfig } from '@talend/scripts-config-storybook-lib/main';

export default createMainConfig({
	stories: ['../src/**/*.stories.@(js|jsx|tsx|mdx)', '../custom-stories/**/*.stories.tsx'],
	addons: ['@storybook/addon-themes'],
	staticDirs: ['../public'],
});
```

#### With i18n Configuration

```typescript
// .storybook/preview.ts
import '@talend/bootstrap-theme/dist/bootstrap.css';
import { createPreviewConfig, initI18n } from '@talend/scripts-config-storybook-lib/preview';

export default createPreviewConfig({
	i18n: {
		namespaces: ['my-app', 'common'],
		locales: {
			en: {
				'my-app': {
					hello: 'Hello',
					welcome: 'Welcome to my app',
				},
				common: {
					save: 'Save',
					cancel: 'Cancel',
				},
			},
			fr: {
				'my-app': {
					hello: 'Bonjour',
					welcome: 'Bienvenue dans mon app',
				},
				common: {
					save: 'Enregistrer',
					cancel: 'Annuler',
				},
			},
		},
	},
});
```

#### With Remote Locales

```typescript
// .storybook/preview.ts
import '@talend/bootstrap-theme/dist/bootstrap.css';
import { createPreviewConfig } from '@talend/scripts-config-storybook-lib/preview';

export default createPreviewConfig({
	i18n: {
		namespaces: ['my-app'],
		remoteLocalesMap: {
			'my-app': 'https://example.com/locales/{{lng}}/my-app.json',
		},
	},
});
```

#### With CMF (Component Metadata Framework)

```typescript
// .storybook/preview.ts
import '@talend/bootstrap-theme/dist/bootstrap.css';
import { createPreviewConfig } from '@talend/scripts-config-storybook-lib/preview';
import MyModule from '../src/cmf-module';

export default createPreviewConfig({
	i18n: {
		namespaces: ['my-app'],
	},
	cmf: {
		modules: [MyModule],
		settings: {
			views: {
				// Your CMF settings
			},
		},
	},
});
```

#### With Custom Decorators and Parameters

```typescript
// .storybook/preview.tsx
import '@talend/bootstrap-theme/dist/bootstrap.css';
import React from 'react';
import { createPreviewConfig } from '@talend/scripts-config-storybook-lib/preview';
import { MyCustomProvider } from '../src/providers';

export default createPreviewConfig({
	decorators: [
		(Story) => (
			<MyCustomProvider>
				<Story />
			</MyCustomProvider>
		)
	],
	parameters: {
		layout: 'centered',
		actions: { argTypesRegex: '^on[A-Z].*' }
	},
	globalTypes: {
		customControl: {
			name: 'Custom Control',
			defaultValue: 'option1',
			toolbar: {
				icon: 'cog',
				items: ['option1', 'option2']
			}
		}
	}
});
```

## API Reference

### `createMainConfig(options?: MainConfigOptions)`

Creates the main Storybook configuration with Talend's defaults.

**Options:**

- `stories?: string[]` - Custom stories glob patterns
- `addons?: string[]` - Additional addons
- `staticDirs?: string[]` - Static directories to serve
- `features?: object` - Additional features configuration
- `core?: object` - Core configuration options
- `typescript?: object` - TypeScript configuration options
- `cwd?: string` - Current working directory (defaults to `process.cwd()`)

### `configureCmfModules(modules, settings?)`

Configures CMF modules for Storybook.

**Parameters:**

- `modules` - CMF modules to bootstrap
- `settings` - Optional CMF settings

**Returns:** `{ loader, decorator }` - Loader and decorator functions for CMF

## Features Included

### Global Types (Toolbar Controls)

- **Bootstrap Theme**: Toggle Bootstrap CSS on/off
- **Theme**: Switch between Light, Dark, and Qlik light themes
- **Locale**: Switch between Chinese, English, French, German, and Japanese

### Default Addons

- `@storybook/addon-a11y`
- `@storybook/addon-links`

### Decorators

- **i18next Provider**: Wraps stories with i18next context
- **Icons Provider**: Provides Talend icon bundles
- **Theme Provider**: Applies selected theme
- **Bootstrap Toggle**: Controls Bootstrap CSS
- **CMF Provider** (optional): Wraps stories with CMF context

## Migration from Template-based CLI

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
import '@talend/bootstrap-theme/dist/bootstrap.css';
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

The new approach is:

- ✅ Type-safe with full TypeScript support
- ✅ Easier to customize and extend
- ✅ No file copying or template processing
- ✅ Better IDE support with autocomplete

## License

Apache-2.0

## Support

For issues and questions, please visit [GitHub Issues](https://github.com/Talend/ui/issues).
