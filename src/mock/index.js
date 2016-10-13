
/**
 * The mock is in the src folder and there is reason for that
 * In the past without this we have added mocked states to other CMF libraries
 * and when we have let the state structure evolved, tests on those libs were still passing.
 * We believe they embed something that they are not responsible for.
 *
 * So mock are in the src folder because they are part of the library.
 * But they are not referenced in the index.js so they will not be in your build.
 * You have to import the mock from the complete path, ie:
 *
 * ```import mock from 'react-cmf/lib/mock';```
 */
import React from 'react';
import settings from './settings';

const state = {
	cmf: {
		settings,
	},
};
const notInitializedState = {
	initialized: false,
	cmf: {
		settings: {
			contentTypes: {},
			actions: {},
			views: {},
		},
	},
};

const store = {
	getState() {
		return state;
	},
	subscribe() { },
	dispatch() { return 'dispatch'; },
};

const registry = {
	'_.route.component:component': (<div>mock</div>),
};

const context = {
	store,
	registry,
};

const emptyContext = {
	store: {
		getState() {
			return notInitializedState;
		},
	},
};

function copy(obj) {
	return Object.assign({}, obj);
}

const mock = {
	context: () => copy(context),
	emptyContext: () => copy(emptyContext),
	notInitializedState: () => copy(notInitializedState),
	registry: () => copy(registry),
	state: () => copy(state),
	settings: () => copy(settings),
	store: () => copy(store),
};
export default mock;
