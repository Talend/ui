# Jest config customisation

To use the jest configuration in your IDE, or to add customisation

1. Create an `jest.config.js` at your project root folder
2. Make it extend the one from talend preset

```javascript
const defaults = require('@talend/scripts-config-jest/jest.config.js');

module.exports = {
	...defaults,

	// add/change default config here
};
```
