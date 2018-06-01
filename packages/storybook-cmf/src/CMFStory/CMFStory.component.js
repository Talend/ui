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
		return { router: { route: { location: {}, match: true } } };
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
