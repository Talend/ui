/* eslint-disable no-console */
import React from 'react';
import { all, fork } from 'redux-saga/effects';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import api, { store, RegistryProvider } from '@talend/react-cmf';
import mock from '@talend/react-cmf/lib/mock';

function* initSagaMiddleWare() {
	yield all([fork(api.sagas.component.handle)]);
}

/**
 * @param {object} props react props
 * @example
<CMFStory name="Hello world"></CMFStory>
 */
class CMFStory extends React.Component {
	constructor(props) {
		super(props);
		let state;
		if (props) {
			state = props.state;
		}
		if (!state) {
			state = mock.state();
		}

		let middlewares = this.props.middleware;
		if (props.sagaMiddleware) {
			middlewares = middlewares.concat([props.sagaMiddleware]);
		}
		this.store = store.initialize(props.reducer, state, props.enhancer, middlewares);
		if (props.sagaMiddleware) {
			api.registerInternals();
			props.sagaMiddleware.run(initSagaMiddleWare);
		}
	}

	getChildContext() {
		return {
			router: {
				push: location => console.log(`push to ${location}`),
				replace: location => console.log(`replace to ${location}`),
				go: location => console.log(`go to ${location}`),
				goBack: location => console.log(`goBack to ${location}`),
				goForward: location => console.log(`goForward to ${location}`),
				setRouteLeaveHook: location => console.log(`setRouteLeaveHook to ${location}`),
				isActive: location => console.log(`isActive to ${location}`),
				route: { location: {}, match: true },
			},
		};
	}

	render() {
		return (
			<Provider store={this.store}>
				<RegistryProvider>{this.props.children}</RegistryProvider>
			</Provider>
		);
	}
}

CMFStory.propTypes = {
	state: PropTypes.object,
	children: PropTypes.node,
	reducer: PropTypes.func,
	enhancer: PropTypes.func,
	sagaMiddleware: PropTypes.func,
	middleware: PropTypes.arrayOf(PropTypes.func),
};
CMFStory.defaultProps = {
	middleware: [],
};
CMFStory.contextTypes = {
	registry: PropTypes.object,
};
CMFStory.childContextTypes = {
	router: PropTypes.object,
};

export default CMFStory;
