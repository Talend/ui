import 'babel-polyfill';
import { action, storiesOf, configure, setAddon } from '@storybook/react';
import cmf from 'react-storybook-cmf';
import mock from '@talend/react-cmf/lib/mock';
import { api } from '@talend/react-cmf';
import { List, Map } from 'immutable';
import '@talend/bootstrap-theme/src/theme/theme.scss';

import examples from '../examples';

import Filter from '../src/Filter';

setAddon({ addWithCMF: cmf.addWithCMF });

const actionLogger = action('dispatch');
const reducer = (state = {}, a) => {
	actionLogger(a);
	return state;
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

function chooseItem1() {
	return {
		type: 'CHOOSE_ITEM1',
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
// filterExample actions
registerActionCreator('filter:save', Filter.actions['filter:save']);
registerActionCreator('filter:update', Filter.actions['filter:update']);

const isTrueExpressionAction = action('isTrueExpression');
api.expression.register('isTrueExpression', (context, first) => {
	isTrueExpressionAction(context, first);
	return !!first;
});

api.expression.register('getItems', () => [
	{
		id: {
			actionCreator: 'item1:action',
			property: 'item1',
		},
		label: 'label1',
		actionCreator: 'item1:action',
	},
	{
		id: {
			actionCreator: 'item2:action',
			property: 'item2',
		},
		label: 'label2',
		actionCreator: 'item2:action',
	},
]);

const modelHasLabelAction = action('modelHasLabel');
api.expression.register('modelHasLabel', context => {	
	modelHasLabelAction(context);
	return !!context.payload.model.label;
});

// Expression for filterExample
api.expression.register('filterByName', (event, collection) => {
	if (event.target.value.length <= 0) {
		return List();
	}
	return collection.filter(item =>
		item
			.get('name')
			.toLowerCase()
			.includes(event.target.value.toLowerCase()),
	);
})

function createMockCollectionFilter() {
	const filterJack = Map({ name: 'Jack' });
	const filterJackie = Map({ name: 'Jackie' });
	const filterJacques = Map({ name: 'Jacques' });
	const filterToto = Map({ name: 'Toto' });
	return List([filterJack, filterJackie, filterJacques, filterToto]);
}

function createMockCollectionDeleteResource() {
	const value = new Map({ id: 'myID', label: 'myLabel' });
	return List([value]);
}

function loadStories() {
	Object.keys(examples).forEach(example => {
		const state = mock.state();
		state.cmf.collections = state.cmf.collections.set(
			'myResourceType',
			createMockCollectionDeleteResource(),
		);

		state.cmf.collections = state.cmf.collections.set(
			'List#filterExample',
			createMockCollectionFilter(),
		);
		state.cmf.settings.views.appheaderbar = {
			app: 'Hello Test',
		};
		state.cmf.settings.views['HeaderBar#default'] = {
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
		};
		(actions['menu:items-id'] = {
			id: 'menu:items',
			displayMode: 'dropdown',
			label: 'my items',
			actionIds: ['menu:first', 'menu:second'],
		}),
			(actions['dialog:delete:validate'] = {
				id: 'dialog:delete:validate',
				label: 'Yes',
				bsStyle: 'danger',
				actionCreator: 'confirm:dialog',
			});
		actions['dialog:delete:cancel'] = {
			id: 'dialog:delete:cancel',
			label: 'No',
			actionCreator: 'cancel:hide:dialog',
		};
		actions['example-filter:undock-and-untoggle'] = {
			id: 'example-filter:undock-and-untoggle',
			'collection-to-filter': 'List#filterExample',
			filterExpression: 'filterByName',
			docked: false,
			dockable: false,
			toggeable: false,
			debounceMinLength: 2,
			debounceTimeout: 300,
			highlight: false,
			placeholder: 'My placeholder',
		};
		actions['example-filter:dock-and-toggle'] = {
			id: 'example-filter:dock-and-toggle',
			'collection-to-filter': 'List#filterExample',
			filterExpression: 'filterByName',
			docked: true,
			dockable: true,
			toggeable: true,
			debounceMinLength: 2,
			debounceTimeout: 300,
			highlight: false,
			placeholder: 'My placeholder',
		};

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
