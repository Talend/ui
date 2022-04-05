# Migration from `@talend/scripts`

# Dependencies

```bash
# remove the old @talend/scripts package
yarn remove @talend/scripts

# install the new @talend/scripts-core package
yarn add --dev @talend/scripts-core

# install the preset that fits your project
# For react webapp
yarn add --dev @talend/scripts-preset-react
# For react lib
yarn add --dev @talend/scripts-preset-react-lib
# For React/AngularJS hybrid webapp
yarn add --dev @talend/scripts-preset-react-ng

```

# Configuration file

In `talend-scripts` configuration file
* preset is now required, no default preset
```json
{
  "preset": "@talend/scripts-preset-react"
}
```
* angular option is not used anymore. Instead, use the react-ng preset that comes with all the angular specificities by default.

# Extensions

Eslint/jest/babel extensions path have changed

* Eslint
```json
{
  "extends": "./node_modules/@talend/scripts-config-eslint/.eslintrc"
}
``` 

* Babel
```json
{
  "extends": "@talend/scripts-config-babel/.babelrc.json"
}
```

* Jest
```javascript
const defaults = require('@talend/scripts-config-jest/jest.config.js');

module.exports = {
	...defaults,

	// add/change default config here
};
```
