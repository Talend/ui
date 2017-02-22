import { action, storiesOf, configure, setAddon } from '@kadira/storybook';
import cmf from 'react-storybook-cmf';
import mock from 'react-cmf/lib/mock';
import { api } from 'react-cmf';

import '!style!css!postcss!sass!bootstrap-talend-theme/src/theme/theme.scss';

import examples from '../examples';

setAddon({ addWithCMF: cmf.addWithCMF });

const actionLogger = action('dispatch');
const reducer = (state = {}, a) => {
	actionLogger(a);
	return state;
};

function objectView(event, data) {
	return Object.assign({
		type: 'OBJECT_VIEW',
	}, data);
}

function objectView(event, data) {
	return Object.assign({
		type: 'OBJECT_VIEW',
	}, data);
}

function hideRemoveDialog(event, data) {
	return Object.assign({
		type: 'SLA_HIDE_REMOVE_SEMANTIC_TYPE',
	}, data);
}

function confirmRemoveSmType(event, data) {
	return Object.assign({
		type: 'SLA_REMOVE_SEMANTIC_TYPE',
	}, data);
}

const registerActionCreator = api.action.registerActionCreator;
registerActionCreator('object:view', objectView);
registerActionCreator('object:cancel:remove:semantic', hideRemoveDialog);
registerActionCreator('object:remove:semantic', confirmRemoveSmType);

function loadStories() {
	Object.keys(examples).forEach((example) => {
		const state = mock.state();
		state.cmf.settings.views.appheaderbar = {
			app: 'Hello Test',
		};
		const actions = state.cmf.settings.actions;
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
		actions['object:add'] = {
			label: 'Add',
			icon: 'talend-plus-circle',
			bsStyle: 'primary',
			payload: {
				type: 'APP_OBJECT_ADD',
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

		const story = storiesOf(example);

		if (typeof examples[example] === 'function') {
			story.addWithCMF('Default', examples[example], {
				state,
				reducer,
			});
		} else {
			Object.keys(examples[example]).forEach((usecase) => {
				story.addWithCMF(usecase, examples[example][usecase], {
					state,
					reducer,
				});
			});
		}
	});
}

configure(loadStories, module);
