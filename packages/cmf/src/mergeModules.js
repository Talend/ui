import compose from 'redux';
import { fork } from 'redux-saga/effects';
import { assertTypeOf } from './assert';

const counts = {
	mergeObject: 0,
	mergeConfig: 0,
};

function mergeObjects(obj1, obj2, attr) {
	return Object.keys(obj2).reduce((acc, key) => {
		if (obj2[key] && obj1[key] !== obj2[key]) {
			// eslint-disable-next-line no-console
			console.warn(`override detected ${attr} ${key}`);
		}
		counts.mergeObject += 1;
		return {
			...acc,
			[key]: obj2[key],
		};
	}, Object.assign({}, obj1));
}

function throwIfBothExists(obj1, obj2, name) {
	if (obj1 && obj2) {
		throw new Error(`Can t merge both config has ${name} attribute. Only one accepted`);
	}
}

function getFirstOf(obj1, obj2, name) {
	throwIfBothExists(obj1, obj2, name)
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
		return compose(
			enhancer,
			newEnhancer,
		);
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
	if (newStoreCallback) {
		return function mergedStoreCallback(store) {
			if (storeCallback) {
				storeCallback(store);
			}
			newStoreCallback(store);
		};
	}
	return storeCallback;
}

function mergeReducer(reducer, newReducer) {
	assertTypeOf({ reducer }, 'reducer', ['object', 'function']);
	assertTypeOf({ reducer: newReducer }, 'reducer', ['object', 'function']);
	if (reducer && newReducer) {
		if (typeof reducer === typeof newReducer && typeof reducer === 'object') {
			return mergeObjects(reducer, newReducer, 'reducer');
		} else if (typeof reducer === 'object') {
		}
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
	const start = new Date().getTime();
	Object.keys(config).forEach(key => {
		if (!MERGE_FNS[key]) {
			throw new Error(`${key} is not supported`);
		}
		// eslint-disable-next-line no-param-reassign
		acc[key] = MERGE_FNS[key](acc[key], config[key]);
		counts.mergeConfig += 1;
	});
	// 59 {mergeObject: 130, mergeConfig: 14}  working
	console.log(new Date().getTime() - start, counts, acc);
	return acc;
}

/**
 * this function help you to merge multiple cmfModule together
 * before passing them to cmf.bootstrap
 */
function merge(...configs) {
	return configs.reduce(reduceConfig, {});
}

export default merge;
