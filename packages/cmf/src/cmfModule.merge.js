import React from 'react';
import { spawn } from 'redux-saga/effects';
import { assertValueTypeOf } from './assert';

export function mergeObjects(obj1, obj2) {
	if (!obj2) {
		return obj1;
	}
	if (!obj1) {
		return obj2;
	}
	return Object.keys(obj2).reduce(
		(acc, key) => {
			if (obj2[key] === undefined) {
				throw new TypeError(`${key} value is undefined. You may have a bad import here`);
			}
			if (obj1[key] !== undefined && obj1[key] !== obj2[key]) {
				// eslint-disable-next-line no-console
				console.warn(`override detected ${key}`);
			}
			return {
				...acc,
				[key]: obj2[key],
			};
		},
		{ ...obj1 },
	);
}

function mergeFns(fn1, fn2) {
	if (!fn2) {
		return fn1;
	}
	if (!fn1) {
		return fn2;
	}
	return function mergedFn(...args) {
		fn1(...args);
		fn2(...args);
	};
}

function throwIfBothExists(obj1, obj2, name) {
	if (obj1 && obj2) {
		throw new Error(
			`Can't merge both config that both have ${name} attribute. Only one is accepted.`,
		);
	}
}

export function getUnique(obj1, obj2, name) {
	throwIfBothExists(obj1, obj2, name);
	if (obj1) {
		return obj1;
	}
	return obj2;
}

function mergeSaga(saga, newSaga) {
	assertValueTypeOf(saga, 'function');
	assertValueTypeOf(newSaga, 'function');

	if (saga && newSaga) {
		return function* mergedSaga() {
			yield spawn(saga);
			yield spawn(newSaga);
		};
	}
	if (newSaga) {
		return newSaga;
	}
	return saga;
}

function mergeArrays(preReducer, newPreReducer) {
	if (preReducer && newPreReducer) {
		return [].concat(preReducer).concat(newPreReducer);
	}
	if (newPreReducer) {
		return newPreReducer;
	}
	return preReducer;
}

function composeComponents(RootComponent, NestedRootComponent) {
	if (!RootComponent) {
		return NestedRootComponent;
	}
	// eslint-disable-next-line react/prop-types
	return ({ children }) => (
		<RootComponent>
			<NestedRootComponent>{children}</NestedRootComponent>
		</RootComponent>
	);
}

const MERGE_FNS = {
	id: () => undefined,
	modules: () => undefined,
	init: () => undefined,
	onError: getUnique,
	root: getUnique,
	appId: getUnique,
	RootComponent: composeComponents,
	AppLoader: getUnique,
	saga: mergeSaga,
	httpMiddleware: getUnique,
	preReducer: mergeArrays,
	enhancer: mergeFns,
	middlewares: mergeArrays,
	storeCallback: mergeFns,
	reducer: mergeObjects,
	preloadedState: getUnique,
	settingsURL: getUnique,
	registry: mergeObjects,
	sagas: mergeObjects,
	components: mergeObjects,
	expressions: mergeObjects,
	actionCreators: mergeObjects,
	httpInterceptors: mergeArrays,
};

export function getReduceConfig(mergeConfig = MERGE_FNS) {
	return function reduceConfig(acc, config) {
		return Object.keys(config).reduce((subacc, key) => {
			if (!mergeConfig[key]) {
				throw new Error(`${key} is not supported`);
			}
			return {
				...subacc,
				[key]: mergeConfig[key](acc[key], config[key], key),
			};
		}, acc);
	};
}

/**
 * this function help you to merge multiple cmfModule together
 * before passing them to cmf.bootstrap
 */
function merge(...configs) {
	return configs.reduce(getReduceConfig(), {});
}

export default merge;

merge.getReduceConfig = getReduceConfig;
merge.getUnique = getUnique;
merge.mergeObjects = mergeObjects;
