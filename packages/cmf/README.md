# Content Management Framework (aka CMF)

This is a library to help you to build configurable React App.

It provides a set of base components and patterns.

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f1e353b0f69c4cf99a4cb3f68b70ea7d)](https://www.codacy.com/app/Talend/react-cmf)

[npm-icon]: https://nodei.co/npm/react-cmf.png?downloads=true
[npm-url]: https://npmjs.org/package/react-cmf
[travis-ci-image]: https://travis-ci.org/Talend/react-cmf.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/react-cmf

[dependencies-image]: https://david-dm.org/Talend/react-cmf/status.svg
[dependencies-url]: https://david-dm.org/Talend/react-cmf
[devdependencies-image]: https://david-dm.org/Talend/react-cmf/dev-status.svg
[devdependencies-url]: https://david-dm.org/Talend/react-cmf#info=devDependencies

[quality-badge]: http://npm.packagequality.com/shield/react-cmf.svg
[quality-url]: http://packagequality.com/#?package=react-cmf


## Breaking changes log

Before 1.0, `react-cmf` do NOT follow semver version in releases.
You will find a [list of breaking changes here](https://github.com/Talend/react-cmf/blob/master/BREAKING_CHANGES_LOG.md).

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

Status: not fully implemented and not used at the moment.

## Internals: The registry

You will find the registry as the central piece of ui abstraction.
It's just a key/object registry and it's used with prefix to store the following:

* action creators (function)
* views (React Component)

Note: this may change in the futur. We will try to remove the singleton in favors of higher order components.

## Store structure
cmf store structure is the following
* root
  * cmf
    * collections
    * components
    * settings

## Middlewares

### CMF

You can put params in existing action object to trigger some other actions from react-cmf. For example control the router:

```javascript
export function cancelMyForm(nextRoute) {
	return {
		type: 'CLUSTER_CANCEL',
		cmf: {
			routerReplace: nextRoute || '/clusters',
		},
	};
}
```

Existing commands:

* cmf.routerReplace (string or function)
* cmf.routerPush (string or function)
* response + cmf.collectionId -> addOrReplaceCollection

### HTTP

CMF init a middleware which is able to handle http requests for you.

It attach the response to the action object.

```javascript
import { actions } from 'react-cmf';

const url = '/foo/bar';

return actions.http.get(url, {
		onSend: 'ACTION_TYPE_DISPATCHED_ON_SEND',
		onError: 'ACTION_TYPE_DISPATCHED_ON_ERROR',
		cmf: {
			collectionId: 'clusters', // saved in this collection
		},
		transform(data) { // called onResponse
			return data.map((row) => {
				const { id, label, engine, tags, created, updated, properties, ...rest } = row;
				return {
					id,
					label,
					type: properties.type,
					engine: engine.type,
					created: moment(created).format(DATE_TIME_FORMAT),
					updated: moment(updated).fromNow(),
					tags: tags ? tags.join(', ') : '',
					...rest,
				};
			});
		},
	});
}
```

The request is done using the fecth API so you may add the [github's fetch
polyfill](http://npmjs.com/package/whatwg-fetch) in your project.

Note onResponse and onError accept function:

* onResponse(response)
* onError(error)

## Expressions

Expression are registred function use to eval props.
We use them to handle dynamic configuration like disable buttons if a user doesn't have the permission.

Given an existing `MyComponent` you may want to add disabled props expression support just by doing the following:

```javascript
import { api } from 'react-cmf';
import MyComponent from './MyComponent';

const MySuperComponent = api.expressions.withExpression(MyComponent, ['disabled']);

return <MySuperComponent disabled="userDontHaveSuperPower" />
```

## Tests & mocks

When you are in the context of CMF and you want to test your component you
will need to mock some stuff (context, router, ...).

We want testing experience to be easy so CMF provides some mocks for you.

```javascript
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider, store as mock } from 'react-cmf/lib/mock';

import MyComponent from './My.component';

describe('App', () => {
	it('should render the app container', () => {
		const wrapper = renderer.create(
			<Provider>
				<MyComponent />
			</Provider>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
```

This way MyComponent may request for the following context:

* router
* registry
* store

you may change the following using simple props:

* store
* state
* router
* registry

## ROADMAP

For 1.0

- [x] embedable apps
- [ ] higher order configuration (RegistryProvider)
- [ ] react-router v4
- [ ] i18n
- [x] generator
- [ ] content types
- [ ] actionCreator should become first class
