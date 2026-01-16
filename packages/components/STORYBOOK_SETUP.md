# Storybook 10 Setup for @talend/react-components

## Configuration Files Created/Updated

### 1. `.storybook/main.ts` (TypeScript Configuration)

- Defines story patterns: `src/**/*.stories.tsx` and `src/**/*.stories.ts`
- Configured with Storybook 10 React Vite builder
- Includes addons: links, essentials, interactions, a11y
- Enables automatic docstring generation from JSDoc/TSDoc
- Vite config path configured

### 2. `.storybook/preview.ts` (Storybook Preview)

- Contains preview parameters and global decorators
- Configured with i18n namespaces for Talend locale packages
- Story sort order defined for organizing components
- TypeScript-based configuration

### 3. `.storybook/tsconfig.json` (TypeScript Configuration)

- Extends root tsconfig.json
- Configured for JSX with `react-jsx`
- Includes Storybook and testing library types
- Stories pattern matching for TypeScript files

### 4. `.storybook/vite.config.ts` (Vite Builder Configuration)

- Includes React plugin for Vite
- Configured for optimal Storybook Vite building

### 5. `.storybook/manager.ts` (Manager Configuration)

- Custom theme configuration
- Branding setup for @talend/react-components

## Package.json Updates

### Scripts Added

- `start`: `storybook dev` - Start Storybook development server
- `build-storybook`: `storybook build` - Build static Storybook site

### Dependencies Added (Storybook 10.x)

- `@storybook/react`: ^8.6.0
- `@storybook/react-vite`: ^8.6.0
- `@storybook/addon-links`: ^8.6.0
- `@storybook/addon-essentials`: ^8.6.0
- `@storybook/addon-interactions`: ^8.6.0
- `@storybook/addon-a11y`: ^8.6.0
- `@vitejs/plugin-react`: ^4.2.0
- `vite`: ^5.0.0

## How to Use

### Start Development Server

```bash
cd packages/components
yarn start
```

This will launch Storybook in dev mode at `http://localhost:6006`

### Build Static Site

```bash
cd packages/components
yarn build-storybook
```

This will create a static build in the `storybook-static` folder

## Writing Stories

Create story files following the naming convention:

- `src/ComponentName/ComponentName.stories.tsx`
- `src/ComponentName/ComponentName.stories.ts`

Example story structure:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
	component: MyComponent,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

## Notes

- Uses Storybook 10 with React Vite builder for fast development
- TypeScript support is fully configured
- Accessibility addon included for a11y testing
- i18n support integrated with Talend locale packages
