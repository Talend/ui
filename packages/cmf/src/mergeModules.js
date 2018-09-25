import { fork } from 'redux-saga/effects';
import { assertTypeOf } from './assert';

function mergeObjects(obj1, obj2, attr) {
	return Object.keys(obj2).reduce((acc, key) => {
		if (obj2[key] && obj1[key] !== obj2[key]) {
			// eslint-disable-next-line no-console
			console.warn(`override detected ${attr} ${key}`);
		}
		return {
			...acc,
			[key]: obj2[key],
		};
	}, Object.assign({}, obj1));
}

function mergeFns(fn1, fn2) {
	return (...args) => {
		fn1(...args);
		fn2(...args);
	};
}

function throwIfBothExists(obj1, obj2, name) {
	if (obj1 && obj2) {
		throw new Error(`Can t merge both config has ${name} attribute. Only one accepted`);
	}
}

function getFirstOf(obj1, obj2, name) {
	throwIfBothExists(obj1, obj2, name);
	if (obj1) {
		return obj1;
	}
	return obj2;
}

function getReduceRegistry(key, type) {
	return (current, newOne) => {
		assertTypeOf({ [key]: current }, key, type);
		assertTypeOf({ [key]: newOne }, key, type);

		if (current && newOne) {
			return mergeObjects(current, newOne, key);
		}
		if (newOne) {
			return newOne;
		}
		return current;
	};
}

function mergeSaga(saga, newSaga) {
	assertTypeOf({ saga }, 'saga', 'function');
	assertTypeOf({ saga: newSaga }, 'saga', 'function');

	if (saga && newSaga) {
		return function* mergedSaga() {
			yield fork(saga);
			yield fork(newSaga);
		};
	}
	if (newSaga) {
		return newSaga;
	}
	return saga;
}

function mergePreReducer(preReducer, newPreReducer) {
	assertTypeOf({ preReducer }, 'preReducer', ['Array', 'function']);
	assertTypeOf({ preReducer: newPreReducer }, 'preReducer', ['Array', 'function']);

	if (preReducer && newPreReducer) {
		let safePreReducer = preReducer;
		if (typeof preReducer === 'function') {
			safePreReducer = [preReducer];
		}
		if (Array.isArray(newPreReducer)) {
			safePreReducer = [...safePreReducer, ...newPreReducer];
		} else if (typeof newPreReducer === 'function') {
			safePreReducer.push(newPreReducer);
		}
		return safePreReducer;
	}
	if (newPreReducer) {
		return newPreReducer;
	}
	return preReducer;
}

function mergeEnhancer(enhancer, newEnhancer) {
	assertTypeOf({ enhancer }, 'enhancer', 'function');
	assertTypeOf({ enhancer: newEnhancer }, 'enhancer', 'function');

	if (enhancer && newEnhancer) {
		return mergeFns(enhancer, newEnhancer);
	}
	if (newEnhancer) {
		return newEnhancer;
	}
	return enhancer;
}

function mergeMiddlewares(middlewares, newMiddlewares) {
	assertTypeOf({ middlewares }, 'middlewares', 'Array');
	assertTypeOf({ middlewares: newMiddlewares }, 'middlewares', 'Array');

	if (newMiddlewares && newMiddlewares.length) {
		return (middlewares || []).concat(newMiddlewares);
	}
	return middlewares;
}

function mergeStoreCallback(storeCallback, newStoreCallback) {
	assertTypeOf({ storeCallback }, 'storeCallback', 'function');
	assertTypeOf({ storeCallback: newStoreCallback }, 'storeCallback', 'function');

	if (storeCallback && newStoreCallback) {
		return mergeFns(storeCallback, newStoreCallback);
	}
	return getFirstOf(storeCallback, newStoreCallback, 'storeCallback');
}

function mergeReducer(reducer, newReducer) {
	assertTypeOf({ reducer }, 'reducer', ['object', 'function']);
	assertTypeOf({ reducer: newReducer }, 'reducer', ['object', 'function']);

	if (reducer && newReducer) {
		if (typeof reducer === typeof newReducer && typeof reducer === 'object') {
			return mergeObjects(reducer, newReducer, 'reducer');
		}
		if (typeof reducer === 'object' && typeof newReducer === 'function') {
			return mergeObjects(reducer, { app: newReducer }, 'reducer');
		}
		// both are functions
		return mergeFns(reducer, newReducer);
	}
	if (newReducer) {
		return newReducer;
	}
	return reducer;
}

const MERGE_FNS = {
	appId: getFirstOf,
	history: getFirstOf,
	saga: mergeSaga,
	httpMiddleware: getFirstOf,
	preReducer: mergePreReducer,
	enhancer: mergeEnhancer,
	middlewares: mergeMiddlewares,
	storeCallback: mergeStoreCallback,
	reducer: mergeReducer,
	preloadedState: getFirstOf,
	settingsURL: getFirstOf,
	registry: getReduceRegistry('registry', 'object'),
	sagas: getReduceRegistry('sagas', 'object'),
	components: getReduceRegistry('components', 'object'),
	expressions: getReduceRegistry('expressions', 'object'),
	actionCreators: getReduceRegistry('actionCreators', 'object'),
	sagaRouterConfig: getReduceRegistry('sagaRouterConfig', 'object'),
};

function reduceConfig(acc, config) {
	return Object.keys(config).reduce((subacc, key) => {
		if (!MERGE_FNS[key]) {
			throw new Error(`${key} is not supported`);
		}
		return {
			...subacc,
			[key]: MERGE_FNS[key](acc[key], config[key], key),
		};
	}, Object.assign({}, acc));
}

/**
 * this function help you to merge multiple cmfModule together
 * before passing them to cmf.bootstrap
 */
function merge(...configs) {
	return configs.reduce(reduceConfig, {});
}

export default merge;
