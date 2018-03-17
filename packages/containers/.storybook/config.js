import 'babel-polyfill';
import { storiesOf, configure, setAddon } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import cmf from 'react-storybook-cmf';
import mock from '@talend/react-cmf/lib/mock';
import { api } from '@talend/react-cmf';
import { List, Map } from 'immutable';
import '@talend/bootstrap-theme/src/theme/theme.scss';
import 'focus-outline-manager';
import ComponentOverlay from './ComponentOverlay';
import examples from '../examples';
import {
	actions as actionsSubHeader,
	actionsCreators as actionsCreatorsSubHeader,
} from './subheaderbar.storybook';
import { registerAllContainers } from '../src/register';

setAddon({ addWithCMF: cmf.addWithCMF });

registerAllContainers();
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

function reducer(state = {}, action) {
	actionLogger(action);
	return {
		flags: flagToggleReducer(state.flags, action),
	};
}

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

const registerActionCreator = api.action.registerActionCreator;
registerActionCreator('object:view', objectView);
registerActionCreator('cancel:hide:dialog', hideDialog);
registerActionCreator('confirm:dialog', confirmDialog);
registerActionCreator('item1:action', chooseItem1);
registerActionCreator('item2:action', chooseItem2);

registerActionCreator('subheaderbar:display-sharing', actionsCreatorsSubHeader.sharingSubHeader);
registerActionCreator('subheaderbar:display-bubbles', actionsCreatorsSubHeader.bubblesSubHeader);
registerActionCreator('subheaderbar:submit', actionsCreatorsSubHeader.submitSubheader);
registerActionCreator('subheaderbar:edit', actionsCreatorsSubHeader.editSubHeaderBar);
registerActionCreator('subheaderbar:cancel', actionsCreatorsSubHeader.cancelSubHeaderBar);
registerActionCreator('subheaderbar:change', actionsCreatorsSubHeader.changeSubHeaderBar);
registerActionCreator('subheaderbar:goback', actionsCreatorsSubHeader.goBackSubHeaderBar);

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
		};
		actions['action:icon:toggle'] = {
			icon: 'talend-panel-opener-right',
			id: 'action:icon:toggle',
			label: 'Click me to toggle',
			tooltipPlacement: 'top',
			activeExpression: { id: 'isFlagExpression', args: ['action:icon:creator:flag'] },
			payload: { type: 'TOGGLE_FLAG_TYPE', flagId: 'action:icon:creator:flag' },
		};
		actions[actionsSubHeader.actionSubHeaderSharing.id] = actionsSubHeader.actionSubHeaderSharing;
		actions[actionsSubHeader.actionSubHeaderBubbles.id] = actionsSubHeader.actionSubHeaderBubbles;

		const story = storiesOf(example);

		if (typeof examples[example] === 'function') {
			story.addWithCMF('Default', examples[example], {
				state,
				reducer,
			});
		} else {
			Object.keys(examples[example]).forEach(usecase => {
				story.addWithCMF(usecase, examples[example][usecase], {
					state,
					reducer,
				});
			});
		}
	});
}

configure(loadStories, module);
