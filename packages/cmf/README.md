# Content Management Framework (aka CMF)

This is a framework to help you to build configurable React App.

It provides a set of base APIs and patterns.

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![NPM][npm-icon] ][npm-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]

[npm-icon]: https://img.shields.io/npm/v/@talend/react-cmf.svg
[npm-url]: https://npmjs.org/package/@talend/react-cmf
[travis-ci-image]: https://travis-ci.org/Talend/ui.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/ui
[dependencies-image]: https://david-dm.org/Talend/ui/status.svg?path=packages/cmf
[dependencies-url]: https://david-dm.org/Talend/ui?path=packages/cmf
[devdependencies-image]: https://david-dm.org/Talend/ui/dev-status.svg?path=packages/cmf
[devdependencies-url]: https://david-dm.org/Talend/ui?path=packages/cmf&type=dev

## Breaking changes log

Before 1.0, `@talend/react-cmf` does NOT follow semver version in releases.
You will find a [list of breaking changes here](https://github.com/Talend/ui/wiki/BREAKING-CHANGE).

## Definition

_CMF_ definition from Wikipedia:

```
A content management framework (CMF) is a system that facilitates the use of reusable components or customized software for managing Web content. It shares aspects of a Web application framework and a content management system
```

It fits with our goal, this is why this add-on has been named that way.

## Paradigm

A _user_ interacts with a _component_ using mouse and/or keyboard which sends _events_ from a _content_ and that interaction _dispatches_ an _action_.
The action may change the application state, which in turn may change some components in the user interface.

## Definitions

### Components

An HTML page is composed by a tree structure called the DOM. In our case React manages that DOM
using a tree of `components`.

`Components` in the context of CMF are React components.

But they are not just React component. We give them some super powers using [cmfConnect](./src/cmfConnect.md).

```javascript
import React from 'react';
import { cmfConnect } from '@talend/react-cmf';

function MyComponent(props) {
	return (
		<article>
			<h2>{props.title}</h2>
			<button onClick={() => props.dispatchActionCreator('read')}>Read</button>
		</article>
	);
}
export default cmfConnect({})(MyComponent);
```

### Actions

Actions are [redux actions](http://redux.js.org/docs/basics/Actions.html).

## Store structure

cmf store structure is the following

* root
  * cmf
    * collections
    * components
    * settings

### ComponentState Management

Component state can be easily stored in cmf state, each are identified by their name and an unique key,
so component state can be stored and reused later.

We give you the choice to use either:

* CMF redux state (this.props.state && this.props.setState)
* React component state (this.state && this.setState)

Warning: you should use the redux state except for part that require lots of mutation without sharing.
For example for Forms you should prefer to use the internal React component state.

### Collections management

Manage a local cache of your business data.
You can connect your component to give it access to your data and being able
to dispatch action to let CMF reducers write them.

You can dispatch some actionCreators in `api.actions.collections` for that.

## Configuration (settings)

We don't want to rewrite a bunch of app code to change a label of a button?
With CMF you can describe all your app just using json.

The json looks like this:

```json
{
	"props": {
		"App#default": {
			"saga": "bootstrap"
		},
		"Navbar#default": {
			"brand": "Talend",
			"left": [{ "component": "Button", "componentId": "help" }]
		},
		"Button#help": {
			"id": "help",
			"label": "help",
			"payload": {
				"type": "MENU_HELP",
				"cmf": {
					"routerPush": "/help"
				}
			}
		}
	}
}
```

To resolve the component "Button" we need a registry.

## Internals: The registry

You will find the registry as the central piece of CMF.
It's just a key/object registry and it's used with prefix to store the following:

* action creators (function)
* components (function or class)
* expressions (function)
* saga (iterator)

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
* response + cmf.collectionId -> addOrReplace

[See API](src/middlewares/cmf/index.md)

### HTTP

CMF init a middleware which is able to handle http requests for you.

It attach the response to the action object.

```javascript
import { actions } from '@talend/react-cmf';

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
	}
);
```

The request is done using the fecth API so you may add the [github's fetch
polyfill](http://npmjs.com/package/whatwg-fetch) in your project.

Note onResponse and onError accept function:

* onResponse(response)
* onError(error)

[See API](src/middlewares/http/index.md)

## Scripts

When you have cmf in you package.json, you can run in your project scope this script:

* cmf-settings

It require a cmf.json file with this format in your webapp's project root:

```json
{
	"settings": {
		"sources": [
			"src/settings",
			"node_modules/@talend/dataset/lib/settings",
			"node_modules/@talend/myOtherDep/lib/file.json"
		],
		"sources-dev": [
			"src/settings",
			"../../dataset/webapp/src/settings",
			"../../myOtherDep/lib/file.json"
		],
		"destination": "src/assets/cmf-settings.json"
	}
}
```

Options for this script :

* -d to use dev-sources instead of sources
* -q to run the script in quiet mode
* -r to run the json search recursive

## Expressions

Expression are registred function use to eval props.
We use them to handle dynamic configuration like disable buttons if a user doesn't have the permission.

Given the upper `MyComponent` example you can use expression to fill the `title` from the store

```json
{
	"props": {
		"MyComponent#default": {
			"titleExpression": {
				"id": "cmf.collections.get",
				"args": ["article.data.title"]
			}
		}
	}
}
```

So adding `Expression` to a prop name of a component is resolved by `cmfConnect`
during the `mapStateToProps` evaluation. So the `title` props will be resolved!

[See API](src/expression.md)

## Tests & mocks

When you are in the context of CMF and you want to test your component you
will need to mock some stuff (context, router, ...).

We want testing experience to be easy so CMF provides some mocks for you.

```javascript
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider, store as mock } from '@talend/react-cmf/lib/mock';

import MyComponent from './My.component';

describe('App', () => {
	it('should render the app container', () => {
		const wrapper = renderer
			.create(
				<Provider>
					<MyComponent />
				</Provider>,
			)
			.toJSON();
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

## More

* [App](src/App.md)
* [cmfConnect](src/cmfConnect.md)
* [settings](src/settings.md)
* [api](src/api.md)
* [store](src/store.md)
* [Dispatcher](src/Dispatcher.md)
* [how to](howto/index.md)
* [sagas](src/sagas/index.md)
* [sagaRouter](src/sagaRouter/index.md)

## ROADMAP

For 1.0

* [x] embedable apps
* [ ] react-router v4
* [x] generator
* [x] actionCreator should become first class
* [ ] move from peer dependencies to dependencies
