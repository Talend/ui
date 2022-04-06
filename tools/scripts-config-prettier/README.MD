# Prettier config customisation

To use the jest configuration in your IDE, or to add customisation

1. Create an `.prettierrc.js` at your project root folder
2. Make it extend the one from talend preset

```javascript
const defaults = require('@talend/scripts-config-prettier/.prettierrc.js');

module.exports = {
	...defaults,

	// add/change default config here
};
```
