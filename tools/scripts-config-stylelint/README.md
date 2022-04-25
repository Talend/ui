# Stylelint config customization

To use the jest configuration in your IDE, or to add customization

1. Create an `.stylelintrc.js` at your project root folder
2. Make it extend the one from talend preset

```javascript
const defaults = require('@talend/scripts-config-stylelint/.stylelintrc.js');

module.exports = {
	...defaults,

	// add/change default config here
};
```
