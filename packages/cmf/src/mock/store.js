import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import settings from './settings';
import collections from './collections';
import components from './components';

const state = {
	cmf: {
		settings,
		collections,
		components,
	},
};
const notInitializedState = {
	initialized: false,
	cmf: {
		settings: {
			contentTypes: {},
			actions: {},
			views: {},
			props: {},
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
	subscribe() {},
};

const registry = {
	'_.route.component:component': () => <div>mock</div>,
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
	return cloneDeep(obj);
}

const mock = {
	context: (myState, myRegistry) => {
		const myContext = copy(context);
		if (myState) {
			myContext.store.getState = () => myState;
		}
		if (myRegistry) {
			myContext.registry = myRegistry;
		}
		return myContext;
	},
	emptyContext: () => copy(emptyContext),
	notInitializedState: () => copy(notInitializedState),
	registry: () => copy(registry),
	state: () => copy(state),
	settings: () => copy(settings),
	store: myState => {
		const myStore = copy(store);
		if (myState) {
			myStore.getState = () => myState;
		}
		return myStore;
	},
};
export default mock;
