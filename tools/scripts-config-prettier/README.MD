# Prettier config customisation

To use the jest configuration in your IDE, or to add customisation

1. Create an `.prettierrc.js` at your project root folder
2. Make it extend the one from talend preset

```javascript
const defaults = require('@talend/scripts-config-prettier');

module.exports = {
	...defaults,

	// add/change default config here
};
```

3. Config includes import order configuration for `@trivago/prettier-plugin-sort-imports`
