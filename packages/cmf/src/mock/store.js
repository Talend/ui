import React from 'react';
import settings from './settings';
import collections from './collections';
import components from './components';

const state = {
	cmf: {
		settings,
		components,
		collections,
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
	dispatch() {
		return 'dispatch';
	},
	subscribe() {
	},
};

const registry = {
	'_.route.component:component': () => (<div>mock</div>),
	'actionCreator:myactionCreator': () => {},
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
