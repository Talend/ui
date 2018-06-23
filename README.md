# UI

That repository was created in an effort to simplify the development of Talend's
front-end stack.

[![Travis CI][travis-ci-image] ][travis-ci-url]

[travis-ci-image]: https://travis-ci.org/Talend/ui.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/ui

## Goals

* Single code repository / Multiple packages
* Global (cross package) test and review tools
* Unified stack versions
* Easy cross packages development

## The stack

- [@talend/react-cmf](https://github.com/Talend/ui/tree/master/packages/cmf)
- [@talend/react-cmf-cqrs](https://github.com/Talend/ui/tree/master/packages/cmf-cqrs)
- [@talend/react-cmf-webpack-plugin](https://github.com/Talend/ui/tree/master/packages/cmf-webpack-plugin)
- [@talend/react-containers](https://github.com/Talend/ui/tree/master/packages/containers)
- [@talend/react-components](https://github.com/Talend/ui/tree/master/packages/components)
- [@talend/react-datagrid](https://github.com/Talend/ui/tree/master/packages/datagrid)
- [@talend/react-forms](https://github.com/Talend/ui/tree/master/packages/forms)
- [generator-talend](https://github.com/Talend/ui/tree/master/packages/generator)
- [@talend/html-webpack-plugin](https://github.com/Talend/ui/tree/master/packages/html-webpack-plugin)
- [@talend/log](https://github.com/Talend/ui/tree/master/packages/logging)
- [@talend/icons](https://github.com/Talend/ui/tree/master/packages/icons)
- [@talend/react-sagas](https://github.com/Talend/ui/tree/master/packages/sagas)
- [@talend/scripts](https://github.com/Talend/ui/tree/master/packages/scripts)
- [@talend/react-storybook-cmf](https://github.com/Talend/ui/tree/master/packages/storybook-cmf)
- [@talend/bootstrap-theme](https://github.com/Talend/ui/tree/master/packages/theme)

## Tools (dev environment)

### Installation

Make sure you you have [node](https://nodejs.org/) in version 8.x. *Check [nvm](https://github.com/creationix/nvm) to easily manage multiple node versions*. We use [yarn](https://yarnpkg.com) so please install it globally.

```
yarn install
```

It will install the dependencies using yarn workspace so the node_modules will be at root for all common dependencies.

### Usage

#### Globally

* `lerna exec -- yarn prepublish` to prepublish all packages (build each lib)
* `yarn changelog` to get the changelog
* `yarn update-versions` after update the versions.js script to update a version of a package.
* `./screenshots.js -p 125` where 125 is the PR number. EXPERIMENTAL
* `yarn build-storybook` to get all storybook built
* `yarn extract-i18n` to extract i18n from all packages.

#### Locally (each packages)

We use the usual workflow:

Launch the dev environment using `yarn start`
Launch the tests using `yarn test`
