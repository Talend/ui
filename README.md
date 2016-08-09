# UI Abstraction

This is a library to help you to build configurable React App.

It provides a set of base components and patterns.

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[npm-icon]: https://nodei.co/npm/react-ui-abstraction.png?downloads=true
[npm-url]: https://npmjs.org/package/react-ui-abstraction
[travis-ci-image]: https://travis-ci.org/jmfrancois/react-ui-abstraction.svg?branch=master
[travis-ci-url]: https://travis-ci.org/jmfrancois/react-ui-abstraction

[dependencies-image]: https://david-dm.org/jmfrancois/react-ui-abstraction.png
[dependencies-url]: https://david-dm.org/jmfrancois/react-ui-abstraction
[devdependencies-image]: https://david-dm.org/jmfrancois/react-ui-abstraction/dev-status.png
[devdependencies-url]: https://david-dm.org/jmfrancois/react-ui-abstraction#info=devDependencies

[quality-badge]: http://npm.packagequality.com/shield/react-ui-abstraction.svg
[quality-url]: http://packagequality.com/#?package=react-ui-abstraction


## Paradigm

A *user* interact with a *view* using mouse and/or keyboard which send *events* from a *content* and that interaction *dispatch* an *action*.
That action may change the current view or the content displayed.

## Definitions

We have the following objects to build a user interface:

* views
* actions
* content types

Let's talk about each of them.

### Views

Views are special React component. They are high level component which has the following responsability:
They must dispatch props to configurable components.

They are called by UI abstraction library from the router and connected to the store throw the settings.

So a view is can be a pure component.

Then view will be composed of react components that can get their props.

### Actions

Actions are redux actions.

### Content Types

## Internals: The registry

You will find the the registry as the central piece of ui abstraction.
It's just a key/object registry and it's used with prefix to store the following:

* action creators (function)
* views (React Component)

## How to use it

