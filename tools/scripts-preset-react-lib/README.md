# Talend Preset

This is a preset for @talend/scripts-core. It holds most of Talend projects tools configuration for hybrid angularJS/react webapp.

This preset allows some customisation through specific entry points. The configuration is done via `talend-scripts` configuration file.

## Customisation

* [Babel customisation](../config-babel/README.md)
* [Eslint customisation](../config-eslint/README.md)
* [Jest customisation](../config-jest/README.md)
* [Typescript customisation](../config-typescript/README.md)

## Details

### Babel

* [Babel configuration](../config-babel/.babelrc.json)

### Jest

| Configuration | Description |
|---|---|
| moduleNameMapper | * `jpg/jpeg/png/gif/eot/otf/webp/svg/woff/woff2` are mocked with an empty object<br/>* `css/scss` are mocked with an object that adds a `theme` prefix to the requested classname. Example: `drawer` will result to `theme-drawer`. This is used to spot the classnames that come from css modules. |
| rootDir | You app root folder |
| setupFilesAfterEnv | * It configures enzyme with react 16 adapter<br/>* It mocks fetch with `(url, { response }) => promise that resolved response` |
| testEnvironment | It uses [`jest-environment-jsdom-global`](https://github.com/simon360/jest-environment-jsdom-global/blob/master/README.md) |
| testRegex | Jest will execute all the files that ends with `.test.js` in your `src/` folder. |
| transform | It transforms js files via babel, using the same [babel configuration](../config-babel/.babelrc.json) as webpack. |

### Eslint

The linter is based on airbnb configuration, with some customisation.
[Eslint configuration](../config-eslint/.eslintrc)

### Typescript

* [Typescript configuration](../config-typescript/tsconfig.json)
