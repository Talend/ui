# @talend/module-to-cdn

[![Build Status](https://travis-ci.org/toutpt/module-to-cdn.svg?branch=jmfrancois/chore/fork)](https://travis-ci.org/toutpt/module-to-cdn)
[![NPM][npm-icon] ][npm-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]

[npm-icon]: https://img.shields.io/npm/v/@talend/module-to-cdn.svg
[npm-url]: https://npmjs.org/package/@talend/module-to-cdn
[travis-ci-image]: https://travis-ci.org/toutpt/module-to-cdn.svg?branch=jmfrancois/chore/fork
[travis-ci-url]: https://travis-ci.org/toutpt/module-to-cdn
[dependencies-image]: https://david-dm.org/toutpt/module-to-cdn/status.svg
[dependencies-url]: https://david-dm.org/toutpt/module-to-cdn
[devdependencies-image]: https://david-dm.org/toutpt/module-to-cdn/dev-status.svg
[devdependencies-url]: https://david-dm.org/toutpt/module-to-cdn?type=dev


> Get cdn config from npm module name

## Fork

This module is fork of module-to-cdn from [Thomas Sileghem](http://mastilver.com).

Because unpkg is great for free usage [but not for production usage](https://kentcdodds.com/blog/unpkg-an-open-source-cdn-for-npm) we decided to made some changes to go forward.

After the following [big PR]() on the repository  and an email to the author we have got no news from the author as all other PRs. So we decided to fork.


## Install

```
$ npm install --save @talend/module-to-cdn
```


## Usage

```js
const moduleToCdn = require('@talend/module-to-cdn');

moduleToCdn('react', '15.3.0');
/* => {
    name: 'react',
    var: 'React',
    url: 'https://unpkg.com/react@15.3.0/dist/react.min.js',
    version: '15.3.0',
    path: '/dist/react.min.js',
    local: '/Users/me/module-to-cdn/node_modules/react/dist/react.min.js'
}
*/
```


## API

### moduleToCdn(moduleName, version, options)

return the result `Object` or null (if module couldn't be find)

#### moduleName

Type: `string`

The name of the module

#### version

Type: `string`

The version of the module

#### options

##### options.env

Type: `string`<br>
Values: `development`, `production`<br>
Default: `development`

### Result

* `name`: name of the module
* `var`: name of the global variable exposing the module
* `url`: url where the module is available
* `version`: the version asked for
* `path`: relative path of the umd file in the distributed package
* `local`: absolute path on the current system to the file

## Configuration of the resolver

By default the URL resolver just resolve to unpkg.
You can change that using the following API.

```javascript
import moduleToCdn from '@talend/module-to-cdn';

function myResolver(...args) {
    const info = moduleToCdn(...args);
    if (process.env.NODE_ENV !== 'development') {
        return {
            ...info,
            url: `https://cdn.talend.com/${info.name}/${info.version}${info.path}`
        };
    }
    return info;
}
moduleToCdn.configure(myResolver);
```

## Support private CDN

The module.json file is an open effort on existing opensource libs. If you want to support custom internal library you can add entries in this file using the following API:

```javascript
import moduleToCdn from '@talend/module-to-cdn';

moduleToCdn.add({
    '@talend/my-private-module': {
        var: 'TalendMyPrivateModule',
        versions: {
            '>= 0.0.0' : {
                'development': '/dist/build.js',
                'production': '/dist/build.min.js',
            }
        }
    }
});
```

This will affect all future call to moduleToCdn;

## Tests

This module do integration tests so it requests npm / unpkg for every packages on the limit of each version and also it tries to fetch the @next version to be as future proof as possible

So if you want to focus on a given module you can use the LIMIT env variable

```
LIMIT=";ag-grid;ag-grid-community;ag-grid-enterprise;" ava -v
```

## Excluded modules


* hoist-non-react-statics: the umd build contains JS errors (process.env.NODE and require) on every versions.

## Contribute

To add your modules you have to

* checkout this package on github
* install and run the tests (it will load the cache for the tests)
* add your module in the module.json file
* ensure everytime the provided umd path exists and is valid.

Example of not valid umd: https://unpkg.com/browse/react-popper@1.3.7/dist/index.umd.js
createContext,deepEqual dependencies are always null.

## License

MIT © [Thomas Sileghem](http://mastilver.com)
