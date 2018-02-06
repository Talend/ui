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
function getIconRating({ context }) {
	const state = context.store.getState();
	const ratingCollection = state.cmf.collections.get(RATING_COLLECTION.RATING).toJS();

	if (!ratingCollection.rating) {
		return '';
	}

	if (!ratingCollection.rating.global) {
		return getIconNoRating();
	}

	return getIconGlobalRating(ratingCollection.rating.global);
}

api.expression.register('getColumnDefs', props => {
	console.log(props);
});

api.expression.register('getPinnedColumnDefs', props => {
	console.log(props);
});

api.expression.register('getRowData', props => {
	console.log(props);
});

function loadStories() {
	Object.keys(examples).forEach(example => {
		const state = mock.state();
		state.cmf.collections = state.cmf.collections.set('sample', sample);
		if (!state.cmf.settings.props) {
			state.cmf.settings.props = state.cmf.settings.views;
		}

		state.cmf.settings.props['Container(DataGrid)#default'] = {
			source: 'sample',
			getColumnDefsExpression: 'getColumnDefs',
			getPinnedColumnDefsExpression: 'getPinnedColumnDefs',
			getRowDataExpression: 'getRowData',
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
