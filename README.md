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

- [react-cmf](https://github.com/Talend/ui/tree/master/packages/cmf)
- [react-talend-containers](https://github.com/Talend/ui/tree/master/packages/containers)
- [react-talend-components](https://github.com/Talend/ui/tree/master/packages/components)
- [react-talend-forms](https://github.com/Talend/ui/tree/master/packages/forms)
- [generator-talend](https://github.com/Talend/ui/tree/master/packages/generator)
- [talend-icons](https://github.com/Talend/ui/tree/master/packages/icons)
- [talend-log](https://github.com/Talend/ui/tree/master/packages/logging)
- [bootstrap-talend-theme](https://github.com/Talend/ui/tree/master/packages/theme)
- [react-data-mapper](https://github.com/Talend/ui/tree/master/packages/data-mapper)

## Tools (dev environment)

:warning: If you've used `lerna bootstrap` in the past, please start by running `lerna clean` or you will have bad behavior with the following tools.

### yarn run watch

The stack has one entry point:

```
yarn run watch
```

This watcher will trigger build and sync inside the stack for you.

For example if you modify a component, it will rebuild component into lib folder and copy the content through forms and containers.

Be warned the [delete or rename are not taken into account](https://github.com/remy/nodemon/issues/656).

### yarn run build

Just build all the packages for static purpose.
It use the prepublish command.

### copylibs

```
./copylibs.js
```

This script will copy all the *lib* folders of the stach into their dependencies.

This script for example will copy the *lib* folders of components into containers and forms node_modules.

It accepts options:

```
./copylibs.js --watch
```

If the content of a lib folder change it triggers the copy.

```
./copylibs.js --scope=components
```

Only copy components into forms and containers.

Same with all subfolders of packges.

### yarn start

It will start all the stack for you:

- components on localhost:6006
- containers on localhost:6007
- forms on localhost:6008
- theme on localhost:1337

If you want to work accross the stack you should launch

```
./copylibs.js --watch
```
