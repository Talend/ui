# UI

That repository was created in an effort to simplify the development of Talend's
front-end stack.

[![Travis CI][travis-ci-image] ][travis-ci-url]

[travis-ci-image]: https://travis-ci.com/Talend/ui.svg?branch=master
[travis-ci-url]: https://travis-ci.com/Talend/ui

## Goals

- Single code repository / Multiple packages
- Global (cross package) test and review tools
- Unified stack versions
- Easy cross packages development

## The stack

- [react-cmf](https://github.com/Talend/ui/tree/master/packages/cmf)
- [react-talend-containers](https://github.com/Talend/ui/tree/master/packages/containers)
- [react-talend-components](https://github.com/Talend/ui/tree/master/packages/components)
- [react-talend-forms](https://github.com/Talend/ui/tree/master/packages/forms)
- [generator-talend](https://github.com/Talend/ui/tree/master/packages/generator)
- [talend-icons](https://github.com/Talend/ui/tree/master/packages/icons)
- [bootstrap-talend-theme](https://github.com/Talend/ui/tree/master/packages/theme)

## Tools (dev environment)

:warning: If you've used `lerna bootstrap` in the past, please start by running `lerna clean` or you will have bad behavior with the following tools.

### yarn run build

Just build all the packages for static purpose.
It execute the prepublish npm script in all sub packages.

### yarn run watch

The stack has one entry point:

```
yarn run watch
```

This watcher will trigger build and sync inside the stack for you.

For example if you modify a component, it will rebuild `components` into lib folder. Because we use yarn workspace all dependencies use that lib folder content.

Be warned the [delete or rename are not taken into account](https://github.com/remy/nodemon/issues/656).

### yarn start

To start to dev on a package and see it in action just use one of the following

- yarn start-components on localhost:6006
- yarn start-containers on localhost:6007
- yarn start-forms on localhost:6008
- yarn start-theme on localhost:1337

## Versions and breaking changes

[See the wiki](https://github.com/Talend/ui/wiki/Workflow#major--breaking-change-aka-next)

## Visual regression

The visual regression test aren't no launched by travis on each PR because they are slower and can generate false positive.

The test is manually by this commander

```
node screenshots -p PULL_REQUEST_ID -c ./screenshots/SCENARIO_TO_TEST.json
```
