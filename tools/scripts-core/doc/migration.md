# Migration from `@talend/scripts`

# Dependencies

```bash
# remove the old @talend/scripts package
pnpm remove @talend/scripts

# install the new @talend/scripts-core package
pnpm add --dev @talend/scripts-core
```

# Configuration file

In `talend-scripts` configuration file

# Extensions

Eslint/jest/babel extensions path have changed

- Eslint

```json
{
	"extends": "@talend"
}
```

- Babel

```json
{
	"extends": "@talend/scripts-config-babel"
}
```

- Jest

```javascript
const defaults = require('@talend/scripts-config-jest');

module.exports = {
	...defaults,

	// add/change default config here
};
```
