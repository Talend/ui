# yarn dynamic workspace

## Context

The repository Talend/ui is a mono repository which contains lots of code.
It uses changeset to ask for a release. It is really nice to have one place to work and see impact of our changes quickly.

We have a lots of packages in it. As of today we have :

```
* @talend/bootstrap-sass
* @talend/dynamic-cdn-webpack-plugin
* @talend/module-to-cdn
* @talend/react-cmf
* @talend/react-cmf-cqrs
* @talend/react-cmf-router
* @talend/react-cmf-webpack-plugin
* @talend/react-components
* @talend/react-containers
* @talend/react-datagrid
* @talend/react-dataviz
* @talend/design-system
* @talend/design-tokens
* @talend/react-faceted-search
* @talend/react-flow-designer
* @talend/react-forms
* @talend/http
* @talend/icons
* @talend/json-schema-form-core
* @talend/local-libs-webpack-plugin
* @talend/ui-playground
* @talend/router-bridge
* @talend/react-sagas
* @talend/react-stepper
* @talend/react-storybook-cmf
* @talend/bootstrap-theme
* @talend/utils
* @talend/babel-plugin-assets-api
* @talend/babel-plugin-import-d3
* @talend/babel-plugin-import-from-index
* @talend/babel-plugin-import-from-lib
* @talend/cypress-api-mock-plugin
* @talend/eslint-plugin
* @talend/scripts-build-cdn
* @talend/scripts-config-babel
```

## Problem

- Install takes time (more than two minutes with cache)
- Build of UMDs (pre-release) takes around 3 minutes
- test
- test:demo

More and more we see complexity added to the CI to catch simple changes to trigger as few operations as possible.

## Solution

One option here is to set the workspaces attribute of the root package.json with as few packages as possible.

- workspace empty by default
- test:demo are moved to pre-release and are published (can be open with unpkg)
- workspace is dynamic and contains changeset requested package + dependent (to see the impact)
