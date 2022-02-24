import cmfModule from '../src';

const actionLogger = action('dispatch');

const TOGGLE_FLAG_TYPE = 'TOGGLE_FLAG_TYPE';
function flagToggleReducer(state = {}, { type, flagId }) {
	if (type === TOGGLE_FLAG_TYPE) {
		return {
			...state,
			[flagId]: !state[flagId],
		};
	}
	return state;
}
function appReducer(state = {}, action) {
	actionLogger(action);
	return {
		flags: flagToggleReducer(preloadedState.flags, action),
	};
}

function routerReducer(state = {}, action) {
	actionLogger(action);
	return {
		locationBeforeTransitions: {
			pathname: '/storybook',
		},
	};
}
const reducer = {
	app: appReducer,
	routing: routerReducer,
};

function objectView(event, data) {
	return {
		type: 'OBJECT_VIEW',
		...data,
	};
}

function hideDialog(event, data) {
	return {
		type: 'HIDE_DIALOG',
		...data,
	};
}

function confirmDialog(event, data) {
	return {
		type: 'CONFIRM_DIALOG',
		...data,
	};
}

function chooseItem1(event, data) {
	return {
		type: 'CHOOSE_ITEM1',
		...data,
	};
}

function chooseItem2() {
	return {
		type: 'CHOOSE_ITEM2',
	};
}

function selectTab(event, data) {
	return {
		type: 'SELECT_TAB',
		payload: {
			...data,
		},
	};
}

function httpPhotosGet1() {
	return actions.http.get('https://jsonplaceholder.typicode.com/photos/', {
		cmf: {
			collectionId: 'photos1',
		},
	});
}
function httpPhotosGet2() {
	return actions.http.get('https://jsonplaceholder.typicode.com/photos/', {
		cmf: {
			collectionId: 'photos2',
		},
	});
}

function* sagaPhotoGet3() {
	const answer = yield call(sagas.http.get, 'https://jsonplaceholder.typicode.com/photos/');
	yield put(actions.collections.addOrReplace('photos3', answer.data));
}

function sortByLength(sortBy) {
	return function sort(a, b) {
		return a.get(sortBy).length - b.get(sortBy).length;
	};
}

const registry = {
	'_list_sort:sortByLength': sortByLength,
};

const sagas = {
	'saga:get:photos3': sagaPhotoGet3,
};
const actionCreators = {
	'http:get:photos1': httpPhotosGet1,
	'http:get:photos2': httpPhotosGet2,
	'object:view': objectView,
	'cancel:hide:dialog': hideDialog,
	'confirm:dialog': confirmDialog,
	'item1:action': chooseItem1,
	'item2:action': chooseItem2,
	'subheaderbar:display-sharing': actionsCreatorsSubHeader.sharingSubHeader,
	'subheaderbar:display-bubbles': actionsCreatorsSubHeader.bubblesSubHeader,
	'subheaderbar:submit': actionsCreatorsSubHeader.submitSubheader,
	'subheaderbar:edit': actionsCreatorsSubHeader.editSubHeaderBar,
	'subheaderbar:cancel': actionsCreatorsSubHeader.cancelSubHeaderBar,
	'subheaderbar:change': actionsCreatorsSubHeader.changeSubHeaderBar,
	'subheaderbar:goback': actionsCreatorsSubHeader.goBackSubHeaderBar,
	'tabbar:select': selectTab,
	'editabletext:submit': actionsCreatorsEditableText.submitEditableText,
	'editabletext:edit': actionsCreatorsEditableText.editEditableText,
	'editabletext:cancel': actionsCreatorsEditableText.cancelEditableText,
	'editabletext:change': actionsCreatorsEditableText.changeEditableText,
};

const components = {
	ComponentOverlay: ComponentOverlay,
};

const isTrueExpressionAction = action('isTrueExpression');
const isFlagExpressionAction = action('isFlagExpression');
const modelHasLabelAction = action('modelHasLabel');

const expressions = {
	isTrueExpression: (context, first) => {
		isTrueExpressionAction(context, first);
		return !!first;
	},
	isFlagExpression: (config, flagId) => {
		const flagStatus = config.context.store.getState().app.flags[flagId];
		isFlagExpressionAction(config, flagId, flagStatus);
		return flagStatus;
	},
	getItems: () => [
		{
			label: 'label1',
			actionCreator: 'item1:action',
		},
		{
			label: 'label2',
			actionCreator: 'item2:action',
		},
	],
	modelHasLabel: context => {
		modelHasLabelAction(context);
		return !!context.payload.model.label;
	},
};

const preloadedState = mock.store.state();
preloadedState.routing = {
	locationBeforeTransitions: {
		pathname: '/storybook',
	},
};
preloadedState.cmf.collections = preloadedState.cmf.collections.set(
	'myResourceType',
	List([Map({ id: 'myID', label: 'myLabel' })]),
);
preloadedState.cmf.collections = preloadedState.cmf.collections.set(
	'with',
	new Map({
		data: List([
			new Map({
				id: 1,
				label: 'foo',
				children: new List([
					new Map({
						id: 11,
						label: 'sub foo',
						author: 'Jacques',
						created: '10/12/2013',
						modified: '13/02/2015',
						children: new List([
							new Map({
								id: 111,
								label: 'sub sub foo',
								author: 'Jacques',
								created: '10/12/2013',
								modified: '13/02/2015',
							}),
							new Map({
								id: 112,
								label: 'sub sub foo bar',
								author: 'Jacques',
								created: '10/12/2013',
								modified: '13/02/2015',
							}),
						]),
					}),
					new Map({
						id: 12,
						label: 'sub foo bar',
						author: 'Jacques',
						created: '10/12/2013',
						modified: '13/02/2015',
					}),
				]),
			}),
			new Map({
				id: 2,
				label: 'bar',
				children: new List([
					new Map({
						id: 21,
						label: 'sub bar',
						author: 'Paul',
						created: '10/12/2013',
						modified: '13/02/2015',
					}),
				]),
			}),
			new Map({
				id: 3,
				label: 'baz',
				children: new List([
					new Map({
						id: 31,
						label: 'sub baz',
						author: 'Boris',
						created: '10/12/2013',
						modified: '13/02/2015',
					}),
				]),
			}),
			new Map({
				id: 4,
				label: 'extra',

				children: new List([
					new Map({
						id: 41,
						label: 'sub extra',
						children: new List([
							new Map({
								id: 411,
								label: 'third level',
								author: 'Henri',
								created: '10/12/2013',
								modified: '13/02/2015',
							}),
						]),
					}),
				]),
			}),
			new Map({
				id: 5,
				label: 'look at me',
				author: 'David',
				created: '10/12/2013',
				modified: '13/02/2015',
			}),
			new Map({
				id: 6,
				label: 'I am famous',
				author: 'David',
				created: '10/12/2013',
				modified: '13/02/2015',
			}),
			new Map({
				id: 7,
				label: 'Strange test',
				author: 'David',
				created: '10/12/2013',
				modified: '13/02/2015',
			}),
			new Map({
				id: 8,
				label: 'Do you see me ?',
				author: 'David',
				created: '10/12/2013',
				modified: '13/02/2015',
			}),
		]),
	}),
);

export default {
	id: 'containerStorybook',
	settingsUrl: '/settings.json',
	expressions,
	components,
	actionCreators,
	sagas,
	reducer,
	registry,
	preloadedState,
	modules: [cmfModule],
};
