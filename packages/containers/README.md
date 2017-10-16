# React Talend Containers

This library provide a set of widgets to be ready to start with [react-cmf](https://github.com/Talend/react-cmf)


[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![peerdependencies][peerdependencies-image] ][peerdependencies-url]
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c7b3baa7ac56473aa18a34d585a3c861)](https://www.codacy.com/app/Talend/react-cmf-bootstrap)

[npm-icon]: https://nodei.co/npm/react-talend-containers.png?downloads=true
[npm-url]: https://npmjs.org/package/@talend/react-containers
[travis-ci-image]: https://travis-ci.org/Talend/react-talend-containers.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/react-talend-containers

[dependencies-image]: https://david-dm.org/Talend/react-talend-containers.png
[dependencies-url]: https://david-dm.org/Talend/react-talend-containers
[devdependencies-image]: https://david-dm.org/Talend/react-talend-containers/dev-status.png
[devdependencies-url]: https://david-dm.org/Talend/react-talend-containers#info=devDependencies
[peerdependencies-image]: https://david-dm.org/Talend/react-talend-containers/peer-status.svg
[peerdependencies-url]: https://david-dm.org/Talend/react-talend-containers?type=peer

[quality-badge]: http://npm.packagequality.com/shield/react-talend-containers.svg
[quality-url]: http://packagequality.com/#?package=react-talend-containers

## Dependencies

* react
* @talend/react-cmf
* @talend/react-components
* classnames

## Architecture

This library is architectured around one concept:
Connect components provided by react-talend-components which implement our [style guide](http://guidelines.talend.com)

A component here should never embed HTML or CSS.
Only connection to the store and behavior should be done.

All the state should be synchronised with redux using react-cmf API.

Every component do not change the API of the stateless componet which is behind. They add some APIs to let you use react-cmf's actions.

## How to contribute

First please take a look at our contributing guildelines.

To create a new widget, you can use the [talend yeoman generator](https://github.com/Talend/generator-talend)
