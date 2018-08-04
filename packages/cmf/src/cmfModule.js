import compose from 'redux';
import { fork } from 'redux-saga/effects';
import { assertTypeOf } from './assert';

/* eslint-disable no-param-reassign */

function mergeObjects(obj1 = {}, obj2 = {}, attr) {
	return { ...obj1[attr], ...obj2[attr] };
}

function addIfNotExists(obj1 = {}, obj2, attr) {
	if (!obj1[attr] && obj2[attr]) {
		obj1[attr] = obj2[attr];
	} else if (obj1[attr]) {
		return false;
	}
	return true;
}

function throwIfBothExists(obj1 = {}, obj2, attr) {
	if (obj1[attr] && obj2[attr]) {
		throw new Error(`Can t merge ${attr}`);
	} else if (obj2[attr]) {
		obj1[attr] = obj2[attr];
	}
}

function reduceRegistry(acc, config) {
	assertTypeOf(config, 'sagas', 'object');
	assertTypeOf(config, 'components', 'object');
	assertTypeOf(config, 'expressions', 'object');
	assertTypeOf(config, 'actionCreators', 'object');
	['sagas', 'components', 'expressions', 'actionCreators', 'sagaRouter'].forEach(key => {
		if (config[key]) {
			acc[key] = mergeObjects(acc, config, key);
		}
	});
	return acc;
}

function reduceSaga(acc, config) {
	assertTypeOf(config, 'saga', 'function');
	if (!addIfNotExists(acc, config, 'saga')) {
		acc.saga = function* mergedSaga() {
			yield fork(acc.saga);
			yield fork(config.saga);
		};
	}
	return acc;
}

function reduceHttpMiddleware(acc, config) {
	assertTypeOf(config, 'httpMiddleware', 'function');
	throwIfBothExists(acc, config, 'httpMiddleware');
	return acc;
}

function reducePreReducer(acc, config) {
	assertTypeOf(config, 'preReducer', ['Array', 'function']);
	if (acc.preReducer && config.preReducer) {
		if (typeof acc.preReducer === 'function') {
			acc.preReducer = [acc.preReducer];
		}
		if (Array.isArray(config.preReducer)) {
			acc.preReducer = [...acc.preReducer, ...config.preReducer];
		} else if (typeof config.preReducer === 'function') {
			acc.preReducer.push(config.preReducer);
		}
	} else if (config.preReducer) {
		acc.preReducer = config.preReducer;
	}
	return acc;
}

function reduceEnhancer(acc, config) {
	assertTypeOf(config, 'enhancer', 'function');
	if (acc.enhancer && config.enhancer) {
		acc.enhancer = compose(
			acc.enhancer,
			config.enhancer,
		);
	} else if (config.enhancer) {
		acc.enhancer = config.enhancer;
	}
}
function reduceMiddlewares(acc, config) {
	assertTypeOf(config, 'middlewares', 'Array');
	if (config.middlewares && acc.middlewares) {
		acc.middlewares = acc.middlewares.concat(config.middlewares);
	} else if (config.middlewares) {
		acc.middlewares = config.middlewares;
	}
}

function reduceStoreCallback(acc, config) {
	assertTypeOf(config, 'storeCallback', 'function');
}

function reduceReducer(acc, config) {
	assertTypeOf(config, 'reducer', ['object', 'function']);
}

function reducePreloadedState(acc, config) {
	assertTypeOf(config, 'preloadedState', 'object');
	throwIfBothExists(acc, config, 'preloadedState');
}

function reduceSettingsURL(acc, config) {
	assertTypeOf(config, 'settingsURL', 'string');
	throwIfBothExists(acc, config, 'settingsURL');
}

function reduceAppId(acc, config) {
	assertTypeOf(config, 'appId', 'string');
	throwIfBothExists(acc, config, 'appId');
}

function reduceHistory(acc, config) {
	assertTypeOf(config, 'history', 'object');
	throwIfBothExists(acc, config, 'history');
}

function reduceConfig(acc, config) {
	reduceAppId(acc, config);
	reduceHistory(acc, config);
	reduceRegistry(acc, config);
	reduceSaga(acc, config);
	reduceHttpMiddleware(acc, config);
	reducePreReducer(acc, config);
	reduceEnhancer(acc, config);
	reduceMiddlewares(acc, config);
	reduceStoreCallback(acc, config);
	reduceReducer(acc, config);
	reducePreloadedState(acc, config);
	reduceSettingsURL(acc, config);
	return acc;
}

/**
 * this function help you to merge multiple cmfModule together
 * before passing them to cmf.bootstrap
 */
function merge(...configs) {
	return configs.reduce(reduceConfig, {});
}

export default { merge };
