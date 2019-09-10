---
id: howto-connect
title: How to connect a container to CMF ?
sidebar_label: connect a container
---

CMF manages your routes to render the requested container depending on the [settings]({{ site.baseurl }}{% link _posts/2017-02-28-core-settings.md %}).
When you develop those containers (or other containers in you app), you need to access to resources and utilities that CMF provides
* the store
* the register
* the action utility
* ...

CMF provides a [React Context](https://facebook.github.io/react/docs/context.html) system.

## App

CMF provides an `<App />` component to bootstrap pour app. This component
* plugs [react-redux](https://github.com/reactjs/react-redux) `Provider` with the store you pass
* plugs CMF `RegistryProvider`
* connects [react-router](https://github.com/ReactTraining/react-router) with the `history you pass and the `routes` [settings]({{ site.baseurl }}{% link _posts/2017-02-28-core-settings.md %})

```javascript
import React from 'react';
import { App } from 'react-cmf';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

...
//init your registry, settings, store
...

render(
	<App store={store} history={syncHistoryWithStore(browserHistory, store)} />,
	document.getElementById('app')
);
```

The `<App />` component wraps your app with `react-redux` provider and CMF `RegistryProvider`.
So in your containers, you can
* get `this.context` containing the registry.
* connect to redux using [react-redux](https://github.com/reactjs/react-redux)

```javascript
import React from 'react';
import { connect } from 'react-redux';

class MyContainer extends React.Component {
    render() {
        const registry = this.context.registry;
        ...
    }
}

function mapDispatchToProps(dispatch, ownProps) {
	...
}

function mapStateToProps(state, ownProps) {
    ...
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyContainer);
```

Alternatively, if you don't want to use the `<App />` component, you can wrap your app with the `RegistryProvider` (see below).

## RegistryProvider

**The example below only connect your app to CMF registry, not redux store nor react-router**

The `RegistryProvider` allows you to wrap your app, so that CMF inject the registry in your containers.
```javascript
import React from 'react';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

...
//init your registry, settings, store
...

function App(props) {
	return (
        <RegistryProvider>
            {props.children}
        </RegistryProvider>
	);
}

...

render(
	<App />,
	document.getElementById('app')
);
```
