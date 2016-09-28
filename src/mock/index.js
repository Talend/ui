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
};

const registry = {};

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
