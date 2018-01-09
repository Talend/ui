cmfConnect
==

cmfConnect is a higher order component which connect your component to redux with some CMF api.

* It inject a state managment on top of redux
* It inject dispatch function
* It let you maps the state to props
* It let you use registred actionCreator
* It let you use the component registry
* It let you evaluate props using expression

Note that CMFConnect itself use [react-redux](http://github.com/reactjs/react-redux)'s [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) [higher order component](https://reactjs.org/docs/higher-order-components.html) under the hood.

API
--

```javascript
cmfConnect(
    componentId, // string or function(props) to compute the id in the store
    defaultState, // the default state when the component is mount
    keepComponent, // boolean, when the component is unmount, to keep it's state in redux store
    mapStateToProps, // function(state, ownProps) that should return the props (same as redux)
    ...rest, // the rest is applied to connect function
)(Component);
```

How to use component state
--

First with CMF you will not need to write reducer.

If you wanna use state managment of CMF you must add a displayName to your component. This is required.

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
		const state = this.props.state || DEFAULT_STATE;
		return (
			<div>
				<h1>Hello, world!</h1>
				<h2>It is {state.get(date, new Date()).toLocaleTimeString()}.</h2>
			</div>
		);
	}
}

export default cmfConnect({ defaultState: DEFAULT_STATE })(Clock);

// This will create the state in redux at state.cmf.components.getIn(['Clock', 'default'])
```

First you should use immutable data structure, the setState of CMF use a Immutable.fromJS to convert the content of setState.

The main idea behind is to remove the need to write reducer.

Like React It's recommended to use a function into setState if your change is based on another value

```javascript
this.props.setState(
	prevState => prevState.state.set(
		'counter',
		prevState.state.get('counter') + this.props.increment
	)
);
```

If you want the component support the props `initialState` to make the state spawned with this value;
This let save one render if you know the first state.

How to use expression
--

CMF add a notion of expression. It's easy to use once your component is cmfConnected.

```javascript
function MyTitle(props) {
    return <h1>{props.title}</h1>
}

function MyArticle(props) {
    return <article><MyTitle titleExpression="getTitle"></article>;
}
```

The titleExpression will be evaluated and injected as title props.

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

export default cmfConnect({ mapStateToProps })(SimpleButton);
```

Here instead of having click handler dispatcher hard coded into that component, we can delegate it to dispatchActionCreator, a utility that get automaticaly injected into your component props by CMFConnect.

dispatchActionCreator rely on it's first parameter to resolve a function from a function registry.

[You can see a schema here](http://www.plantuml.com/plantuml/png/XLJBReGm3Bpp5JvNuWSuz4BRsqehjkgbwW61WKYGe2JiKg7zzvf0U6J3bWl8dXbxx0IbKurmJYLo7Okc5Pm-O0W0lbz-8Cp5ZOUl49y-Oi4vPZg2inIj2WYW37LD6HPi0o5HcxIzZC1FCH57I89vrvieX5tx28885DQZmbIZa6dPK5-6_Dwt4fLYWYTOCgNbBuGr5ffaA2xgAwu84i8UiuuqvbnE0PiDZ9urulOmpDbzkvALrQRKCh8f7L5SIuPNX6mPflKW6iYQmW2zqlEiP-KlXhSBQirugGvqRTOlxVe9ZxfU67vFJ_focRkUBI_hb1RDoNCCniURTMkk2tKhRbPjEUJxZQasrLbbYosiQHL-d-k-xmU4dRqdSB-d__KtPZpW-yDnTMmk91U9iaIt1mzzF20vNJkDoNnNF7C_0XXsNB4wfp-9w--GjBNfxTqg4Z9OWS7u8kI4sToXOOrwVXEK_GC0)

How to test
--


When you are in the context of CMF and you want to test your component you will need to mock some stuff (context, router, ...).

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

* router
* registry
* store

you may change the following using simple props:

* store
* state
* router
* registry
