import 'babel-polyfill';
import { storiesOf, configure, setAddon } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import cmf from 'react-storybook-cmf';
import mock from '@talend/react-cmf/lib/mock';
import { api } from '@talend/react-cmf';
import { List, Map, fromJS } from 'immutable';
import '@talend/bootstrap-theme/src/theme/theme.scss';
import 'focus-outline-manager';

import examples from '../examples';
import sample from './sample.json';

setAddon({ addWithCMF: cmf.addWithCMF });

const actionLogger = action('dispatch');
const reducer = (state = {}, a) => {
	actionLogger(a);
	return state;
};

const registerActionCreator = api.action.registerActionCreator;
registerActionCreator('datagrid:focus-cell', (event, data) => {
	return {
		type: 'DATAGRID_FOCUS_CELL',
		...data,
	};
});

registerActionCreator('datagrid:focus-column', (event, data) => {
	return {
		type: 'DATAGRID_FOCUS_COLUMN',
		...data,
	};
});
api.expression.register('getSampleRowData', () => {
	return () => {};
});

function loadStories() {
	Object.keys(examples).forEach(example => {
		const state = mock.state();
		state.cmf.collections = state.cmf.collections.set('sample', sample);
		if (!state.cmf.settings.props) {
			state.cmf.settings.props = state.cmf.settings.views;
		}

		state.cmf.settings.props['DataGrid#default'] = {
			collectionId: 'sample',
			getRowDataExpression: 'getSampleRowData',
			rowSelection: 'single',
			focusedCellActionCreator: 'datagrid:focus-cell',
			focusedColumnActionCreator: 'datagrid:focus-column',
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
