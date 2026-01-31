# ESLint Configuration (ESLint 9)

This package provides the shared ESLint 9 configuration using the new flat config format for Talend UI projects.

## Migration from ESLint 8

This package has been migrated to ESLint 9 and uses the new flat config format (`eslint.config.js`). The old `.eslintrc` formats are no longer supported.

## Usage

### In Your Project

1. Create an `eslint.config.js` file at your project root:

```javascript
module.exports = require('@talend/eslint-config');
```

2. Add a lint script to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

3. Run linting:

```bash
npm run lint
# or
yarn lint
```

### Customizing Rules

To add custom rules or override existing ones, you can extend the base config:

```javascript
const baseConfig = require('@talend/eslint-config');

module.exports = [
  ...baseConfig,
  {
    rules: {
      // Your custom rules here
      'no-console': 'warn',
    },
  },
];
```

## Features

- **ESLint 9** with flat config format
- **TypeScript support** with automatic detection
- **React** and **JSX** support
- **Prettier** integration
- **Import** plugin for managing imports
- Automatic detection of TypeScript projects

## Configuration Details

The configuration automatically:

- Detects if your project uses TypeScript (checks for `tsconfig.json`)
- Applies TypeScript-specific rules when detected
- Configures React settings
- Sets up appropriate globals for browser, Node.js, Jest, and Jasmine

## IDE Configuration

### VS Code

Install the ESLint extension. Modern versions of the VS Code ESLint extension (v3.0.0+) automatically detect and use flat config when available. No additional configuration is needed.

If you're using an older version of the extension, you may need to update it or add to your `.vscode/settings.json`:

```json
{
  "eslint.useFlatConfig": true
}
```

### Other IDEs

Ensure your IDE's ESLint plugin is updated to support ESLint 9 and flat config format.

## Breaking Changes from v13.x

- Requires ESLint 9.x (was 8.x)
- Uses flat config format instead of `.eslintrc` format
- Removed support for old ESLint 8 configurations
- Updated plugin dependencies to ESLint 9 compatible versions
- `talend-scripts lint` command has been removed - use `eslint .` directly

## Compatibility

- Node.js: 18.x or higher
- ESLint: 9.17.0 or higher
- TypeScript: 5.x (optional)

