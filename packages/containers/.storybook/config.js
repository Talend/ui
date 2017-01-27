import { action, storiesOf, configure, setAddon } from '@kadira/storybook';
import cmf from 'react-storybook-cmf';
import infoAddon from '@kadira/react-storybook-addon-info';
import mock from 'react-cmf/lib/mock';
import { api } from 'react-cmf';
import examples from '../examples';

//setAddon(infoAddon);
setAddon({ addWithCMF: cmf.addWithCMF });

const actionLogger = action('dispatch');
const reducer = (state = {}, a) => {
	actionLogger(a);
	return state;
};

function objectView(...args) {
	return {
		type: 'OBJECT_VIEW',
		args,
	};
}

const registerActionCreator = api.action.registerActionCreator;
registerActionCreator('object:view', objectView);


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
			type: 'MENU_',
		};
		actions['menu:second'] = {
			label: 'Second',
			icon: 'talend-dataprep',
			type: 'MENU_',
		};
		actions['menu:third'] = {
			label: 'Configuration',
			icon: 'talend-cog',
			type: 'MENU_',
		};
		actions['object:add'] = {
			label: 'Add',
			icon: 'talend-plus',
			type: 'APP_OBJECT_ADD',
			bsStyle: 'success',
		};
		actions['object:edit'] = {
			label: 'Edit',
			icon: 'talend-pencil',
			type: 'APP_OBJECT_EDIT',
		};
		actions['object:delete'] = {
			label: 'Delete',
			icon: 'talend-trash',
			type: 'APP_OBJECT_DELETE',
		};
		const story = storiesOf(example);
		console.log(examples[example]);
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
