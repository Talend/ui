# React CMF Bootstrap

This library provide a set of widgets to be ready to start with [react-cmf](https://github.com/Talend/react-cmf)


[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![peerdependencies][peerdependencies-image] ][peerdependencies-url]
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c7b3baa7ac56473aa18a34d585a3c861)](https://www.codacy.com/app/Talend/react-cmf-bootstrap)

[npm-icon]: https://nodei.co/npm/react-cmf-bootstrap.png?downloads=true
[npm-url]: https://npmjs.org/package/react-cmf-bootstrap
[travis-ci-image]: https://travis-ci.org/Talend/react-cmf-bootstrap.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/react-cmf-bootstrap

[dependencies-image]: https://david-dm.org/Talend/react-cmf-bootstrap.png
[dependencies-url]: https://david-dm.org/Talend/react-cmf-bootstrap
[devdependencies-image]: https://david-dm.org/Talend/react-cmf-bootstrap/dev-status.png
[devdependencies-url]: https://david-dm.org/Talend/react-cmf-bootstrap#info=devDependencies
[peerdependencies-image]: https://david-dm.org/Talend/react-cmf-bootstrap/peer-status.svg
[peerdependencies-url]: https://david-dm.org/Talend/react-cmf-bootstrap?type=peer

[quality-badge]: http://npm.packagequality.com/shield/react-cmf-bootstrap.svg
[quality-url]: http://packagequality.com/#?package=react-cmf-bootstrap

## Dependencies

* react
* react-cmf
* react-bootstrap
* classnames

## Architecture

This library is architectured around one concept:
Provide a set of components which implement our [style guide](http://guidelines.talend.com)

Each components exists in two versions:
* pure
* connected

The pure component is responsible of the rendering from props.
Everythings are props here.
We avoid state because we are using redux with CMF.
For the style we are using sass with [react-css-themr](https://github.com/javivelasco/react-css-themr).

To get a connected component just do the following:

```
import { AppHeaderBar } from 'react-cmf-bootstrap';
```


Next we provide a connected version which only map to props of the pure version.

If you import a widget from the package you will have the connected version.
If you want to import the pure version use the following import path:

```
import { AppHeaderBar } from 'react-cmf-bootstrap/lib/pure';
```

## How to contribute

First please take a look at our contributing guildelines.

To create a new widget, you can use the [talend yeoman generator](https://github.com/Talend/generator-talend)
