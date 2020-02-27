import { storiesOf, configure, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { withI18next } from 'storybook-addon-i18next';
import { locales as tuiLocales } from '@talend/locales-tui/locales';
import createSagaMiddleware from 'redux-saga';
import withCMF from '@talend/react-storybook-cmf';
import mock from '@talend/react-cmf/lib/mock';
import api, { actions, sagas } from '@talend/react-cmf';
import { List, Map } from 'immutable';
import { call, put } from 'redux-saga/effects';
import '@talend/bootstrap-theme/src/theme/theme.scss';
import i18n from './../../../.storybook/i18n';
import ComponentOverlay from './ComponentOverlay';
import examples from '../examples';
import {
	actions as actionsSubHeader,
	actionsCreators as actionsCreatorsSubHeader,
} from './subheaderbar.storybook';
import { actionsCreators as actionsCreatorsEditableText } from './editabletext.storybook';
import { registerAllContainers } from '../src/register';

const languages = {};
Object.keys(tuiLocales).forEach(key => languages[key] = key);

addDecorator(withI18next({
	i18n,
	languages,
}));
addDecorator(withCMF);
addDecorator(withA11y);

registerAllContainers();
const actionLogger = action('dispatch');
const sagaMiddleware = createSagaMiddleware();

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
		flags: flagToggleReducer(state.flags, action),
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

api.registry.addToRegistry('_list_sort:sortByLength', sortByLength);

api.sagas.register('saga:get:photos3', sagaPhotoGet3);
api.actionCreator.register('http:get:photos1', httpPhotosGet1);
api.actionCreator.register('http:get:photos2', httpPhotosGet2);
api.actionCreator.register('object:view', objectView);
api.actionCreator.register('cancel:hide:dialog', hideDialog);
api.actionCreator.register('confirm:dialog', confirmDialog);
api.actionCreator.register('item1:action', chooseItem1);
api.actionCreator.register('item2:action', chooseItem2);

api.actionCreator.register(
	'subheaderbar:display-sharing',
	actionsCreatorsSubHeader.sharingSubHeader,
);
api.actionCreator.register(
	'subheaderbar:display-bubbles',
	actionsCreatorsSubHeader.bubblesSubHeader,
);
api.actionCreator.register('subheaderbar:submit', actionsCreatorsSubHeader.submitSubheader);
api.actionCreator.register('subheaderbar:edit', actionsCreatorsSubHeader.editSubHeaderBar);
api.actionCreator.register('subheaderbar:cancel', actionsCreatorsSubHeader.cancelSubHeaderBar);
api.actionCreator.register('subheaderbar:change', actionsCreatorsSubHeader.changeSubHeaderBar);
api.actionCreator.register('subheaderbar:goback', actionsCreatorsSubHeader.goBackSubHeaderBar);
api.actionCreator.register('tabbar:select', selectTab);
api.actionCreator.register('editabletext:submit', actionsCreatorsEditableText.submitEditableText);
api.actionCreator.register('editabletext:edit', actionsCreatorsEditableText.editEditableText);
api.actionCreator.register('editabletext:cancel', actionsCreatorsEditableText.cancelEditableText);
api.actionCreator.register('editabletext:change', actionsCreatorsEditableText.changeEditableText);

const registerComponent = api.component.register;
registerComponent('ComponentOverlay', ComponentOverlay);

const isTrueExpressionAction = action('isTrueExpression');
api.expression.register('isTrueExpression', (context, first) => {
	isTrueExpressionAction(context, first);
	return !!first;
});

const isFlagExpressionAction = action('isFlagExpression');
api.expression.register('isFlagExpression', (config, flagId) => {
	const flagStatus = config.context.store.getState().app.flags[flagId];
	isFlagExpressionAction(config, flagId, flagStatus);
	return flagStatus;
});

api.expression.register('getItems', () => [
	{
		label: 'label1',
		actionCreator: 'item1:action',
	},
	{
		label: 'label2',
		actionCreator: 'item2:action',
	},
]);

const modelHasLabelAction = action('modelHasLabel');
api.expression.register('modelHasLabel', context => {
	modelHasLabelAction(context);
	return !!context.payload.model.label;
});

function loadStories() {
	Object.keys(examples).forEach(example => {
		const state = mock.state();
		state.routing = {
			locationBeforeTransitions: {
				pathname: '/storybook',
			},
		};
		state.cmf.collections = state.cmf.collections.set(
			'myResourceType',
			List([Map({ id: 'myID', label: 'myLabel' })]),
		);
		state.cmf.collections = state.cmf.collections.set(
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
		if (!state.cmf.settings.props) {
			state.cmf.settings.props = state.cmf.settings.views;
		}
		state.cmf.settings.props.appheaderbar = {
			app: 'Hello Test',
		};
		state.cmf.settings.props['Translate(HeaderBar)#default'] = {
			logo: { name: 'appheaderbar:logo', isFull: true },
			brand: { label: 'DATA STREAMS' },
			notification: { name: 'appheaderbar:notification' },
		};
		const actions = state.cmf.settings.actions;
		actions['show:about'] = {
			label: 'Show',
			payload: {
				type: 'ABOUT_DIALOG_SHOW',
				url: 'https://tdp.us.cloud.talend.com/api/version',
			},
		};
		actions['appheaderbar:logo'] = {
			icon: 'talend-logo',
		};
		actions['appheaderbar:notification'] = {
			icon: 'talend-world',
		};
		actions['menu:first'] = {
			label: 'First',
			icon: 'talend-streams',
			payload: {
				type: 'MENU_',
			},
		};
		actions['menu:second'] = {
			label: 'Second',
			icon: 'talend-dataprep',
			payload: {
				type: 'MENU_',
			},
		};
		actions['menu:third'] = {
			label: 'Configuration',
			icon: 'talend-cog',
			payload: {
				type: 'MENU_',
			},
		};
		actions['menu:fourth'] = {
			label: 'Upload',
			icon: 'talend-upload',
			displayMode: 'file',
			payload: {
				type: 'UPLOAD',
			},
		};
		actions['object:add'] = {
			label: 'Add',
			icon: 'talend-plus-circle',
			bsStyle: 'primary',
			payload: {
				type: 'APP_OBJECT_ADD',
			},
		};
		actions['object:remove'] = {
			label: 'Remove',
			icon: 'talend-trash',
			bsStyle: 'danger',
			payload: {
				type: 'APP_OBJECT_REMOVE',
			},
		};
		actions['object:upload'] = {
			label: 'Upload',
			icon: 'talend-upload',
			displayMode: 'file',
			payload: {
				type: 'UPLOAD',
			},
		};
		actions['object:edit'] = {
			label: 'Edit',
			icon: 'talend-pencil',
			payload: {
				type: 'APP_OBJECT_EDIT',
			},
		};
		actions['object:delete'] = {
			label: 'Delete',
			icon: 'talend-trash',
			payload: {
				type: 'APP_OBJECT_DELETE',
			},
		};
		actions['object:confirm:dialog'] = {
			label: 'Remove',
			bsStyle: 'primary',
			id: 'object:confirm:dialog',
			actionCreator: 'confirm:dialog',
		};
		actions['object:hide:dialog'] = {
			label: 'Cancel',
			id: 'object:hide:dialog',
			actionCreator: 'cancel:hide:dialog',
		};
		actions['menu:items'] = {
			id: 'menu:items',
			displayMode: 'dropdown',
			label: 'my items',
			itemsExpression: 'getItems',
			actionCreator: 'object:view',
		};
		actions['menu:items-id'] = {
			id: 'menu:items-id',
			displayMode: 'dropdown',
			label: 'my items',
			actionIds: ['menu:first', 'menu:second'],
			actionCreator: 'object:view',
		};
		actions['menu:href'] = {
			id: 'menu:href',
			label: 'Talend',
			target: '_blank',
			href: '//www.talend.com',
		};
		actions['menu:dropdown-href'] = {
			id: 'menu:dropdown-href',
			displayMode: 'dropdown',
			label: 'my items',
			actionIds: ['menu:href'],
			actionCreator: 'object:view',
		};
		actions['dialog:delete:validate'] = {
			id: 'dialog:delete:validate',
			label: 'Yes',
			bsStyle: 'danger',
			actionCreator: 'confirm:dialog',
		};
		actions['dialog:delete:cancel'] = {
			id: 'dialog:delete:cancel',
			label: 'No',
			className: 'btn-inverse',
			actionCreator: 'cancel:hide:dialog',
		};
		actions['action:overlay:component'] = {
			id: 'action:overlay:component',
			label: 'overlay with component',
			overlayComponent: 'ComponentOverlay',
			overlayComponentProps: {
				customProps: 'customProps',
			},
			overlayPlacement: 'bottom',
			payload: { type: 'BUTTON_OVERLAY' },
		};
		actions['action:icon:toggle'] = {
			icon: 'talend-panel-opener-right',
			id: 'action:icon:toggle',
			label: 'Click me to toggle',
			tooltipPlacement: 'top',
			activeExpression: { id: 'isFlagExpression', args: ['action:icon:creator:flag'] },
			payload: { type: 'TOGGLE_FLAG_TYPE', flagId: 'action:icon:creator:flag' },
		};
		actions['show:guidedTour'] = {
			label: 'Start guided tour',
			payload: {
				type: 'GUIDED_TOUR_SHOW',
			},
		};
		actions[actionsSubHeader.actionSubHeaderSharing.id] = actionsSubHeader.actionSubHeaderSharing;
		actions[actionsSubHeader.actionSubHeaderBubbles.id] = actionsSubHeader.actionSubHeaderBubbles;
		// migrate some actions to props:
		state.cmf.settings.props['ActionButton#first'] = actions['menu:first'];
		state.cmf.settings.props['ActionButton#second'] = actions['menu:second'];
		state.cmf.settings.props['ActionButton#configuration'] = actions['menu:third'];
		const story = storiesOf(example, examples[example]);

		if (typeof examples[example] === 'function') {
			story.add('Default', examples[example], {
				cmf: {
					state,
					reducer,
					sagaMiddleware,
				},
			});
		} else {
			Object.keys(examples[example]).forEach(usecase => {
				story.add(usecase, examples[example][usecase], {
					cmf: {
						state,
						reducer,
						sagaMiddleware,
					},
				});
			});
		}
	});
}

configure(loadStories, module);
