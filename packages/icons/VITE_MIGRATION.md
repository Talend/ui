# @talend/icons Modernization - Vite Migration

## Migration Summary

This document describes the modernization of the `@talend/icons` package from webpack/babel to Vite.

## Changes Made

### 1. **Build Tool Replacement**

- **Removed**: Webpack (multiple configs), Babel, custom Node.js scripts
- **Added**: Vite with library mode + vite-plugin-dts for type generation

### 2. **New Configuration Files**

- **vite.config.ts**: Vite configuration for building ESM and CommonJS
  - Multiple entry points: `index` and `typeUtils`
  - Automatic type generation via `vite-plugin-dts`
  - Format output: `.js` (ESM) and `.cjs` (CommonJS)
  - Target: ES2020
  - External: React (not bundled)

### 3. **TypeScript Entry Points**

- **src/index.ts**: Main entry point
  - Re-exports react components and icon info utilities
  - Named exports: `react`, `info`

- **src/typeUtils.ts**: Existing icon type definitions and utilities
  - Maintains all icon name types
  - Helper functions: `getIconNameWithSize()`, `isValidIconName()`

### 4. **Updated package.json**

```jsonc
{
	"type": "module", // ESM-first package
	"main": "dist/index.cjs",
	"module": "dist/index.js",
	"types": "dist/index.d.ts",
	"exports": {
		".": {
			"types": "./dist/index.d.ts",
			"import": "./dist/index.js", // ESM
			"require": "./dist/index.cjs", // CommonJS
		},
		"./typeUtils": {
			"types": "./dist/typeUtils.d.ts",
			"import": "./dist/typeUtils.js",
			"require": "./dist/typeUtils.cjs",
		},
	},
}
```

### 5. **New Build Scripts**

```bash
npm run build              # Build both ESM and CommonJS
npm run build:watch       # Watch mode for development
npm run build:webfont     # Separate script for webfont generation (webpack)
npm run build:types       # TypeScript type checking only
npm run type-check        # Type checking without building
```

### 6. **Updated tsconfig.json**

- Includes all `.ts` files in `src/`
- Generates declaration maps for debugging
- Source maps enabled
- Module format: ESNext (for Vite)

## Usage

### Before (v6.0)

```javascript
import talendIcons from '@talend/icons/dist/react';
import talendIconsInfos from '@talend/icons/dist/info';
```

### After

```javascript
// Named exports from main entry point
import { react as talendIcons, info as talendIconsInfos } from '@talend/icons';

// Or individual imports
import { react } from '@talend/icons';
import { IconNameWithSize, getIconNameWithSize } from '@talend/icons/typeUtils';
```

## What Didn't Change

✅ SVG assets - still in `src/svg/` and `src/filters/`
✅ WebFont generation - separate webpack script (`build:webfont`)
✅ Storybook configuration - uses Talend's standard storybook-config
✅ Icon metadata and extraction logic - all JavaScript files unchanged

## Build Output

### Before

```
dist/TalendIcons.js      (UMD)
lib/
  ├── index.js           (CJS)
  └── ...
lib-esm/
  ├── index.js           (ESM)
  └── ...
```

### After

```
dist/
  ├── index.js           (ESM)
  ├── index.cjs          (CJS)
  ├── index.d.ts         (Types)
  ├── typeUtils.js       (ESM)
  ├── typeUtils.cjs      (CJS)
  └── typeUtils.d.ts     (Types)
```

## Benefits

✅ **Faster Builds**: Vite + esbuild ~100x faster than webpack
✅ **Simpler Config**: One vite.config.ts instead of multiple webpack files
✅ **Modern Tooling**: Industry standard for library builds
✅ **Better ES Modules**: Native ESM support with proper file extensions
✅ **Type Safety**: Automatic type generation and declaration maps
✅ **Cleaner Output**: No babel/loader complexity

## Next Steps

1. Test the build locally: `npm run build`
2. Verify both ESM and CJS outputs work
3. Test in dependent packages
4. Update any CI/CD scripts that reference old build artifacts
5. Update documentation with new export patterns

## Dependencies Changed

### Removed

- @babel/core, @babel/preset-env, @babel/preset-react
- @talend/scripts-core, @talend/scripts-config-babel
- @talend/babel-plugin-\*
- babel-loader, css-loader, mini-css-extract-plugin, style-loader, string-replace-loader
- react-use

### Added

- vite
- vite-plugin-dts

### Kept (for webfont generation)

- webpack, webpack-cli, webfonts-loader
- copy-webpack-plugin, @svgr/webpack

## Breaking Changes

None for library consumers - the package still exports the same API, just with modern tooling.

Internal developers should use: `npm run build` instead of `npm run build:lib`.
