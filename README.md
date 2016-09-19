# Content Management Framework (aka CMF)

This is a library to help you to build configurable React App.

It provides a set of base components and patterns.

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[npm-icon]: https://nodei.co/npm/react-cmf.png?downloads=true
[npm-url]: https://npmjs.org/package/react-cmf
[travis-ci-image]: https://travis-ci.org/Talend/react-cmf.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/react-cmf

[dependencies-image]: https://david-dm.org/Talend/react-cmf.png
[dependencies-url]: https://david-dm.org/Talend/react-cmf
[devdependencies-image]: https://david-dm.org/Talend/react-cmf/dev-status.png
[devdependencies-url]: https://david-dm.org/Talend/react-cmf#info=devDependencies

[quality-badge]: http://npm.packagequality.com/shield/react-cmf.svg
[quality-url]: http://packagequality.com/#?package=react-cmf


## Definition

*CMF* definition from wikipedia:

```
A content management framework (CMF) is a system that facilitates the use of reusable components or customized software for managing Web content. It shares aspects of a Web application framework and a content management system
```

It fits with our goal, this is why this add-on has been named that way.

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

Views are special React component. They are high level component which has the following responsibility:
They must dispatch props to configurable components.

They are called by UI abstraction library from the router and connected to the store throw the settings.

So a view is can be a pure component.

Then view will be composed of react components that can get their props.

### Actions

Actions are [redux actions](http://redux.js.org/docs/basics/Actions.html).

### ComponentState Management
Component state can be easily stored in cmf state, each are identified by their name and an unique key,
so component state can be stored and reused later

### Collections management
Manage a local cache of your business data

### Content Types

A content type defines metadata over content. For example when you display a list of article you say each item in this list are an *article* which is a content type.

We are adding metadata over content type:

* title
* icon id
* actions (by category)

## Internals: The registry

You will find the registry as the central piece of ui abstraction.
It's just a key/object registry and it's used with prefix to store the following:

* action creators (function)
* views (React Component)

## Store structure
cmf store structure is the following
* root
  * cmf
    * collections
    * components
    * settings
