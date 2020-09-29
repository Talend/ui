# cmfConnect

`cmfConnect` is a Higher Order Component (HOC) which connects your component to redux with some CMF API.

Some of the key features:

* tools (props) to write maintainable code
* configuration (every component try to get props from settings)
* mapStateToProps outside of the component (more reuse)
* build onEvent handler using registered actionCreator or simple dispatch
* component registry available for composition

Note that CMFConnect itself uses [react-redux](https://github.com/reactjs/react-redux), [connect](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md), [higher order component](https://reactjs.org/docs/higher-order-components.html) under the hood.

## API

```javascript
cmfConnect({
	defaultState, // active the state management on top of redux (`props.state`, `props.setState`)
	keepComponent, // boolean, when the component is unmount, to keep its state in redux store
	mapStateToProps, // function(state, ownProps) that should return the props (same as redux)
	withDispatch, // to receive `props.dispatch`
	withDispatchActionCreator, // to receive `props.dispatchActionCreator`
	withComponentRegistry, // to receive `props.getComponent`
	withComponentId, // to receive `props.componentId`
	...rest, // the rest is applied to connect function
})(Component);
```

## How to use component state

First, with CMF, you will not need to write reducer.
If you want to use CMF state management, you must add a `displayName` to your component.
This is required.

```javascript
// example adapted from https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class
const DEFAULT_STATE = new Immutable.Map({ date: new Date() });

class Clock extends React.Component {
	static displayName = 'Clock'; // required
	static propTypes = {
		...cmfConnect.propTypes,
	}

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.props.setState({
			date: new Date()
		});
	}

	render() {
		return (
			<div>
				<h1>Hello, world!</h1>
				<h2>It is {this.props.state.get(date, new Date()).toLocaleTimeString()}.</h2>
			</div>
		);
	}
}

export default cmfConnect({
	defaultState: DEFAULT_STATE,
})(Clock);

// This will create the state in redux at state.cmf.components.getIn(['Clock', 'default'])
```

First you should use immutable data structure, the `setState` of CMF uses `Immutable.fromJS` to convert its content.

The main idea behind is to remove the need to write reducer.

Like with React, it's recommended to use a function into `setState` if your change is based on another value.

```javascript
this.props.setState(
	prevState => prevState.state.set(
		'counter',
		prevState.state.get('counter') + this.props.increment
	)
);
```

If you want the component to be instantiated and rendered directly with a custum state and overwrite the `defaultState`, it can be done with the `initialState` prop.
This saves one render if you know the first state.

How to use expression
--

CMF add a notion of expression.
It's easy to use once your component is cmfConnected.

```javascript
function MyTitle(props) {
    return <h1>{props.title}</h1>
}

function MyArticle(props) {
    return <article><MyTitle titleExpression="getTitle"></article>;
}
```

The titleExpression will be evaluated and injected as title props.

Expressions are a way to read the state, they are a mapStateToProps available in JSON.

How to dispatch action creator
---

You can dispatch registered action creator in your component using `props.dispatchActionCreator`

```javascript
import React from "react";
import { cmfConnect } from "@talend/react-cmf";

function SimpleButton ({label, handleClick}) {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    this.props.dispatchActionCreator('myawesomebutton', null, 'a parameter');
  }

  render() {
    return (
      <button onClick={handleClick}>{label}</button>
    );
  }
}

function mapStateToProps(state) {
    return {
        label: state.whatever.label
    }
}

export default cmfConnect({
	mapStateToProps,
	withDispatchActionCreator: true,
})(SimpleButton);
```

Here instead of having click handler dispatcher hard coded into that component, we can delegate it to dispatchActionCreator, a utility that get automaticaly injected into your component props by CMFConnect.

`dispatchActionCreator` relies on its first parameter to resolve a function from registry.

[You can see a schema here](http://www.plantuml.com/plantuml/png/XLJBReGm3Bpp5JvNuWSuz4BRsqehjkgbwW61WKYGe2JiKg7zzvf0U6J3bWl8dXbxx0IbKurmJYLo7Okc5Pm-O0W0lbz-8Cp5ZOUl49y-Oi4vPZg2inIj2WYW37LD6HPi0o5HcxIzZC1FCH57I89vrvieX5tx28885DQZmbIZa6dPK5-6_Dwt4fLYWYTOCgNbBuGr5ffaA2xgAwu84i8UiuuqvbnE0PiDZ9urulOmpDbzkvALrQRKCh8f7L5SIuPNX6mPflKW6iYQmW2zqlEiP-KlXhSBQirugGvqRTOlxVe9ZxfU67vFJ_focRkUBI_hb1RDoNCCniURTMkk2tKhRbPjEUJxZQasrLbbYosiQHL-d-k-xmU4dRqdSB-d__KtPZpW-yDnTMmk91U9iaIt1mzzF20vNJkDoNnNF7C_0XXsNB4wfp-9w--GjBNfxTqg4Z9OWS7u8kI4sToXOOrwVXEK_GC0)

Next step you can do the same with a step more to CMF.

```javascript
import React from "react";
import { cmfConnect } from "@talend/react-cmf";

function SimpleButton ({label, onClick}) {
    return (
      <button onClick={onClick}>{label}</button>
    );
  }
}
export default cmfConnect({})(SimpleButton);

// using the following configuration
{
	"props": {
		"SimpleButton#default": {
			"label": "What you want even an expression",
			// just to dispatch static action onClick
			"onClickDispatch": {
				"type": "SIMPLE_BUTTON_CLICKED",
				"what": "you want more"
			}
			// to dispatch action creator onClick with event, data (props) and context
			"onClickActionCreator": "mycustomactioncreator"
			// to dispatch action creator onClick with controlled arguments
			"onClickActionCreator": {
				"id": "cmf.http",
				"data": {
					"method": "GET",
					"url": "/api/v1/foo",
					"cmf": {
						"collectionId": "foo"
					}
				}
			}
		}
	}
}

// the first and third option will dispatch an action in redux with the serialized event.
{
	type: 'SIMPLE_BUTTON_CLICKED',
	what: 'you want more',
	event: {
		type: 'click',
		target: {
			type: 'button'
		}
	}
}

```

## How to render conditionally

Every component that connected with CMF can be rendered conditionally

If you want to render some component conditionally, just pass "renderIf" prop (type boolean) to it

You can also use Expression for this and customize this prop like "renderIfExpression" in
CMF json configuration files

## How to read and update component state from the outside

Every cmfConnected component expose two static functions:
* getState
* setStateAction

So if we take back the `Clock` example from below and we try to write a saga:

```javascript
import Clock from './Clock.connect';

export default function* myDeLorean() {
	const clockState = yield select(Clock.getState);
	const action = Clock.setStateAction(clockState.set('date', new Date('2025/12/25')));
	yield put(action);
}
```

If you have multiple instance of the same component those api support `id` as a second argument.

```javascript
import Clock from './Clock.connect';

export default function* myDeLorean({ componentId }) {
	const state = yield select();
	const clockState = Clock.getState(state, componentId);
	yield put(
		Clock.setStateAction(
			clockState.set('date', new Date('2025/12/25'))
		)
	);
// mutation
Clock.setStateAction(componentState, 'a-component-id');
```

If your setState rely on the previous state value and you have some async operations between you can still rely on the callback function:

```javascript
Clock.setStateAction(
	prevState => prevState.set(
		'minutes',
		prevState.get('date').getMinutes()
	),
	'a-component-id'
);
```


## How to test


When you are in the context of CMF and you want to test your component you will need to mock some stuff (context, ...).

We want testing experience to be easy so CMF provides some mocks for you.

```javascript
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider, store as mock } from '@talend/react-cmf/lib/mock';

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

* registry
* store

you may change the following using simple props:

* store
* state
* registry
