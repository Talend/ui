# Talend preset configuration details

## Webpack

* [Common configuration](./config/webpack.config.js)
* [Development configuration](./config/webpack.config.dev.js)
* [Production configuration](./config/webpack.config.prod.js)
* [Babel configuration](./config/.babelrc.json)

## Jest

| Configuration | Description |
|---|---|
| moduleNameMapper | * `jpg/jpeg/png/gif/eot/otf/webp/svg/woff/woff2` are mocked with an empty object<br/>* `css/scss` are mocked with an object that adds a `theme` prefix to the requested classname. Example: `drawer` will result to `theme-drawer`. This is used to spot the classnames that come from css modules. |
| rootDir | You app root folder |
| setupFilesAfterEnv | * It configures enzyme with react 16 adapter<br/>* It mocks fetch with `(url, { response }) => promise that resolved response` |
| testEnvironment | It uses [`jest-environment-jsdom-global`](https://github.com/simon360/jest-environment-jsdom-global/blob/master/README.md) |
| testRegex | Jest will execute all the files that ends with `.test.js` in your `src/` folder. |
| transform | It transforms js files via babel, using the same [babel configuration](./config/.babelrc.json) as webpack. |

## Eslint

The linter is based on airbnb configuration, with some customisation.
[Eslint configuration](./config/.eslintrc)

## Karma

[Karma configuration](./config/karma.conf.js)
[Karma webpack configuration](./config/webpack.conf.js)
