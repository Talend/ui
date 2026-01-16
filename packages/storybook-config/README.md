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
import { createMainConfig } from '@talend/storybook-config';

export default createMainConfig();
```

#### Preview Configuration (`.storybook/preview.ts`)

```typescript
import '@talend/bootstrap-theme/dist/bootstrap.css';
import { createPreviewConfig, initI18n } from '@talend/storybook-config';

export default createPreviewConfig({}, initI18n);
```

#### Preview Head (`.storybook/preview-head.html`)

```html
<script type="text/javascript">
	window.process = window.process || { env: { NODE_ENV: 'production' } };
</script>
```

### Advanced Configuration

#### With Custom Stories and Addons

```typescript
// .storybook/main.ts
import { createMainConfig } from '@talend/storybook-config';

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
import { createPreviewConfig, initI18n } from '@talend/storybook-config';

export default createPreviewConfig(
	{
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
	},
	initI18n,
);
```

#### With Remote Locales

```typescript
// .storybook/preview.ts
import '@talend/bootstrap-theme/dist/bootstrap.css';
import { createPreviewConfig, initI18n } from '@talend/storybook-config';

export default createPreviewConfig(
	{
		i18n: {
			namespaces: ['my-app'],
			remoteLocalesMap: {
				'my-app': 'https://example.com/locales/{{lng}}/my-app.json',
			},
		},
	},
	initI18n,
);
```

#### With CMF (Component Metadata Framework)

```typescript
// .storybook/preview.ts
import '@talend/bootstrap-theme/dist/bootstrap.css';
import { createPreviewConfig, initI18n, configureCmfModules } from '@talend/storybook-config';
import MyModule from '../src/cmf-module';

export default createPreviewConfig(
	{
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
	},
	initI18n,
	configureCmfModules,
);
```

#### With Custom Decorators and Parameters

```typescript
// .storybook/preview.tsx
import '@talend/bootstrap-theme/dist/bootstrap.css';
import React from 'react';
import { createPreviewConfig, initI18n } from '@talend/storybook-config';
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
}, initI18n);
```

#### With Custom Webpack Configuration

```typescript
// .storybook/main.ts
import { createMainConfig } from '@talend/storybook-config';

export default createMainConfig({
	webpackFinal: async config => {
		// Add custom webpack configuration
		config.resolve = config.resolve || {};
		config.resolve.alias = {
			...config.resolve.alias,
			'@': path.resolve(__dirname, '../src'),
		};
		return config;
	},
});
```

## API Reference

### `createMainConfig(options?: MainConfigOptions)`

Creates the main Storybook configuration with Talend's defaults.

**Options:**

- `stories?: string[]` - Custom stories glob patterns
- `addons?: string[]` - Additional addons
- `staticDirs?: string[]` - Static directories to serve
- `webpackFinal?: Function` - Custom webpack configuration
- `features?: object` - Additional features configuration
- `core?: object` - Core configuration options
- `typescript?: object` - TypeScript configuration options
- `cwd?: string` - Current working directory (defaults to `process.cwd()`)

### `createPreviewConfig(options: PreviewConfigOptions, initI18nFunc, configureCmfFunc?)`

Creates the preview configuration with decorators, loaders, and global types.

**Options:**

- `i18n?: I18nextOptions` - i18next configuration
- `cmf?: CMFOptions` - CMF configuration
- `globalTypes?: object` - Additional global types for toolbar controls
- `decorators?: Array` - Additional decorators
- `parameters?: object` - Additional parameters
- `loaders?: Array` - Additional loaders

**Parameters:**

- `initI18nFunc` - The `initI18n` function from this package
- `configureCmfFunc` - (Optional) The `configureCmfModules` function from this package

### `initI18n(options?: I18nextOptions)`

Initializes i18next for Storybook.

**Options:**

- `namespaces?: string[]` - List of namespaces
- `locales?: object` - Locale resources organized by language and namespace
- `remoteLocalesMap?: object` - Map of namespace to remote URL for loading translations

### `configureCmfModules(modules, settings?)`

Configures CMF modules for Storybook.

**Parameters:**

- `modules` - CMF modules to bootstrap
- `settings` - Optional CMF settings

**Returns:** `{ loader, decorator }` - Loader and decorator functions for CMF

### `getPreviewHead(customContent?: string)`

Returns the HTML content for `preview-head.html`.

**Parameters:**

- `customContent` - Optional custom HTML content to append

## Features Included

### Global Types (Toolbar Controls)

- **Bootstrap Theme**: Toggle Bootstrap CSS on/off
- **Theme**: Switch between Light, Dark, and Qlik light themes
- **Locale**: Switch between Chinese, English, French, German, and Japanese

### Default Addons

- `@storybook/addon-essentials`
- `@storybook/addon-a11y`
- `@storybook/addon-links`
- `@storybook/addon-interactions`
- `@storybook/addon-storysource`

### Decorators

- **i18next Provider**: Wraps stories with i18next context
- **Icons Provider**: Provides Talend icon bundles
- **Theme Provider**: Applies selected theme
- **Bootstrap Toggle**: Controls Bootstrap CSS
- **CMF Provider** (optional): Wraps stories with CMF context

## Migration from Template-based CLI

If you were previously using the template-based CLI from `@talend/scripts-config-storybook-lib`, here's how to migrate:

**Before:**

- Templates were copied to `.storybook` folder
- Configuration was static and required manual merging

**After:**

```typescript
// Simply import and call the functions
import { createMainConfig, createPreviewConfig, initI18n } from '@talend/storybook-config';
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
