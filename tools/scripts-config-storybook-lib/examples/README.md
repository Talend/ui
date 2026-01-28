# Example Usage

This directory contains example Storybook configuration files showing how to use `@talend/storybook-config`.

## Basic Setup

### .storybook/main.ts

```typescript
import { createMainConfig } from '@talend/scripts-config-storybook-lib';

export default createMainConfig();
```

### .storybook/preview.ts

```typescript
import { createPreviewConfig, initI18n } from '@talend/scripts-config-storybook-lib';

export default createPreviewConfig({}, initI18n);
```

### .storybook/preview-head.html

```html
<script type="text/javascript">
	window.process = window.process || { env: { NODE_ENV: 'production' } };
</script>
```

## Advanced Setup with Custom Configuration

### .storybook/main.ts

```typescript
import { createMainConfig } from '@talend/scripts-config-storybook-lib';
import path from 'path';

export default createMainConfig({
	stories: ['../src/**/*.stories.@(js|jsx|tsx|mdx)', '../custom-stories/**/*.stories.tsx'],
	addons: ['@storybook/addon-themes', '@storybook/addon-viewport'],
	staticDirs: ['../public'],
});
```

### .storybook/preview.ts

```typescript
import React from 'react';
import { createPreviewConfig, initI18n } from '@talend/scripts-config-storybook-lib';

export default createPreviewConfig({
	i18n: {
		namespaces: ['my-app', 'common'],
		locales: {
			en: {
				'my-app': {
					title: 'My Application',
					welcome: 'Welcome to Storybook'
				},
				common: {
					save: 'Save',
					cancel: 'Cancel',
					delete: 'Delete'
				}
			},
			fr: {
				'my-app': {
					title: 'Mon Application',
					welcome: 'Bienvenue sur Storybook'
				},
				common: {
					save: 'Enregistrer',
					cancel: 'Annuler',
					delete: 'Supprimer'
				}
			}
		}
	},
	decorators: [
		(Story) => (
			<div style={{ padding: '2rem' }}>
				<Story />
			</div>
		)
	],
	parameters: {
		layout: 'centered',
		actions: { argTypesRegex: '^on[A-Z].*' }
	}
}, initI18n);
```
