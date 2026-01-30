/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useMemo } from 'react';
import { all, fork } from 'redux-saga/effects';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import api, { store, registry, RegistryProvider, mock } from '@talend/react-cmf';

function* initSagaMiddleWare() {
	yield all([fork(api.sagas.component.handle)]);
}

/**
 * @param {object} props react props
 * @example
<CMFStory name="Hello world"></CMFStory>
 */
function CMFStory(props) {
	console.log('CMFStory rendered');
	const state = useMemo(() => {
		let localState = mock.store.state();
		if (props.state) {
			localState = props.state;
		}
		return localState;
	}, []);
	const storeMemo = useMemo(() => {
		let middlewares = props.middleware || [];
		if (props.sagaMiddleware) {
			middlewares = middlewares.concat([props.sagaMiddleware]);
		}
		const myStore = store.initialize(props.reducer, state, props.enhancer, middlewares);
		if (props.sagaMiddleware) {
			api.registerInternals();
			props.sagaMiddleware.run(initSagaMiddleWare);
		}
		return myStore;
	}, []);

	const myRegistry = useMemo(() => {
		let registryTmp = registry.getRegistry() || {};
		if (props.registry) {
			registryTmp = { ...registry.getRegistry, ...props.registry };
		}
		return registryTmp;
	}, []);

	// getChildContext() {
	// 	return {
	// 		router: {
	// 			push: location => console.log(`push to ${location}`),
	// 			replace: location => console.log(`replace to ${location}`),
	// 			go: location => console.log(`go to ${location}`),
	// 			goBack: location => console.log(`goBack to ${location}`),
	// 			goForward: location => console.log(`goForward to ${location}`),
	// 			setRouteLeaveHook: location => console.log(`setRouteLeaveHook to ${location}`),
	// 			isActive: location => console.log(`isActive to ${location}`),
	// 			route: { location: {}, match: true },
	// 		},
	// 	};
	// }

	return (
		<Provider store={storeMemo}>
			<RegistryProvider value={myRegistry}>{props.children}</RegistryProvider>
		</Provider>
	);
}

CMFStory.propTypes = {
	state: PropTypes.object,
	registry: PropTypes.object,
	children: PropTypes.node,
	reducer: PropTypes.func,
	enhancer: PropTypes.func,
	sagaMiddleware: PropTypes.func,
	middleware: PropTypes.arrayOf(PropTypes.func),
};

export default CMFStory;
