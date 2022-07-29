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

## how stop ignore transform over packages in node_modules

because jest support of [ECMAPScriptModules](https://github.com/facebook/jest/blob/64de4d7361367fd711a231d25c37f3be89564264/docs/ECMAScriptModules.md) is experiemental we have added possibilities to apply transforms on modules.
Since d3 7.x library use ECMAPScriptModules in it's package.json as main entry point it break jest with this kind of errors:

```

```

You may encounter in your project the neeed to add other modules than just d3. To do so we provide to you the following API:

```javascript
// your project's jest.config.js
const config = require('@talend/scripts-config-jest/jest.config.js');
const testUtils = require('@talend/scripts-config-jest/utils');

testUtils.applyBabelTransformOn(config, ['dexie']);

module.exports = config;
```
