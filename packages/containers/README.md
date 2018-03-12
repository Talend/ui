# React Talend Containers

This library provide a set of widgets to be ready to start with [react-cmf](https://github.com/Talend/ui/blob/master/packages/cmf/README.md)

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![peerdependencies][peerdependencies-image] ][peerdependencies-url]

[npm-icon]: https://nodei.co/npm/@talend/react-containers.png?downloads=true
[npm-url]: https://npmjs.org/package/@talend/react-containers
[travis-ci-image]: https://travis-ci.org/Talend/react-talend-containers.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/react-talend-containers
[dependencies-image]: https://david-dm.org/Talend/ui/status.svg?path=packages/containers
[dependencies-url]: https://david-dm.org/Talend/ui?path=packages/containers
[devdependencies-image]: https://david-dm.org/Talend/ui/dev-status.png?path=packages/containers
[devdependencies-url]: https://david-dm.org/Talend/ui?path=packages/containers&type=dev
[peerdependencies-image]: https://david-dm.org/Talend/ui/peer-status.svg?path=packages/containers
[peerdependencies-url]: https://david-dm.org/Talend/ui?path=packages/containers&type=peer
[quality-badge]: http://npm.packagequality.com/shield/react-talend-containers.svg
[quality-url]: http://packagequality.com/#?package=react-talend-containers

## Breaking changes log

Before 1.0, `@talend/react-containers` does NOT follow semver in releases.
You will find a [list of breaking changes here](https://github.com/Talend/ui/wiki/BREAKING-CHANGE).

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

# List of containers

You can find full demo at http://talend.surge.sh/containers

* [SubHeaderBar](src/SubHeaderBar/SubHeaderBar.md)
