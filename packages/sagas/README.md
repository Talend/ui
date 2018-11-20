# @talend/react-sagas

A set of generic sagas that are reusable accross the app(http://guidelines.talend.com)

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![peerdependencies][peerdependencies-image] ][peerdependencies-url]
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2dd69f1168bb43f781fee182a67a00f2)](https://www.codacy.com/app/Talend/react-talend-sagas)

[npm-icon]: https://nodei.co/npm/react-talend-sagas.svg?downloads=true
[npm-url]: https://npmjs.org/package/@talend/react-sagas
[travis-ci-image]: https://travis-ci.org/Talend/react-talend-sagas.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/react-talend-sagas
[dependencies-image]: https://david-dm.org/Talend/react-talend-sagas.svg
[dependencies-url]: https://david-dm.org/Talend/react-talend-sagas
[devdependencies-image]: https://david-dm.org/Talend/react-talend-sagas/dev-status.svg
[devdependencies-url]: https://david-dm.org/Talend/react-talend-sagas#info=devDependencies
[peerdependencies-image]: https://david-dm.org/Talend/react-talend-sagas/peer-status.svg
[peerdependencies-url]: https://david-dm.org/Talend/react-talend-sagas?type=peer
[quality-badge]: http://npm.packagequality.com/shield/react-talend-sagas.svg
[quality-url]: http://packagequality.com/#?package=react-talend-sagas

## Conventions

Please look at our [CONTRIBUTING](https://github.com/Talend/tools/blob/master/tools-root-github/CONTRIBUTING.md) first.

Please read our [style guidelines](http://guidelines.talend.com) first.

## Supported browsers

<img src="https://camo.githubusercontent.com/46a1f6891a7e0d7f74956a056b19d6ba5b76a3be/68747470733a2f2f7777772e62726f77736572737461636b2e636f6d2f696d616765732f6c61796f75742f62726f77736572737461636b2d6c6f676f2d363030783331352e706e67" alt="BrowserStack logo" width="120" height="63">

Thanks to [BrowserStack](https://www.browserstack.com/) for providing real browser testing infrastructure.

### List of sagas

#### maybePenging

##### Description

This saga will trigger a state change after 400ms that consists in adding the component in an up-to-date pending list.
Based on that, any cmf-expression will be evaluated and pure component will be re-rendered.

#### Signature

First argument is about identifying your context: parent entity id or page id or any other way to provide a context id in a unique way.

Second argument is the identifier of the action or component.

=> Following this nomenclature, you will be able to get unique identifier through all your app and sibling entities.

## npm scripts

* npm run prepublish -> build the sources into the lib folder
* npm test -> to execute unit test
* npm run lint -> check the code style
* npm run watch -> watch the source to trigger a build

## LICENSE

Copyright (c) 2006-2017 Talend

Licensed under the Apache V2 License
