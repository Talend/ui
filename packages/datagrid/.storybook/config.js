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

sample.data = [
	...sample.data,
	...Array(960)
		.fill()
		.map(() => ({
			value: {
				field2: {
					value: '95716',
					quality: 1,
				},
				field8: {
					value: '10771660',
					quality: 0,
				},
				field5: {
					value: '33929307',
					quality: -1,
				},
				field4: {
					value: '10748798',
					quality: 1,
				},
				field7: {
					value: '11030795',
					quality: 1,
				},
				field3: {
					value: '',
					quality: 1,
				},
				field1: {
					value: '271494',
					quality: 1,
				},
				field0: {
					value: 'Aéroport Charles de Gaulle 2 TGV',
					quality: 1,
				},
				field9: {
					value: '10880464',
					quality: 1,
				},
				field6: {
					value: '10920487',
					quality: 1,
				},
			},
			quality: 1,
		})),
];

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

function loadStories() {
	Object.keys(examples).forEach(example => {
		const state = mock.state();
		state.cmf.collections = state.cmf.collections.set('sample', sample);
		if (!state.cmf.settings.props) {
			state.cmf.settings.props = state.cmf.settings.views;
		}

		state.cmf.settings.props['Container(DataGrid)#default'] = {
			actionCreators: {
				onFocusedCell: 'datagrid:focus-cell',
				onFocusedColumn: 'datagrid:focus-column',
			},
			cellRenderer: 'DefaultCellRenderer',
			source: 'sample',
		};

		state.cmf.settings.props['Container(DataGrid)#CustomizedDatagrid'] = {
			actionCreators: {
				onFocusedCell: 'datagrid:focus-cell',
				onFocusedColumn: 'datagrid:focus-column',
			},
			cellRenderer: 'CustomCellRenderer',
			headerRenderer: 'CustomHeaderRenderer',
			pinHeaderRenderer: 'CustomPinHeaderRenderer',
			source: 'sample',
		};

		state.cmf.settings.props['Container(DataGrid)#CustomizedAvroDatagrid'] = {
			avroRenderer: {
				intCellRenderer: 'CustomIntCellRenderer',
				dateCellRenderer: 'CustomDateCellRenderer',
				booleanCellRenderer: 'CustomBooleanCellRenderer',
			},
			actionCreators: {
				onFocusedCell: 'datagrid:focus-cell',
				onFocusedColumn: 'datagrid:focus-column',
			},
			headerRenderer: 'CustomHeaderRenderer',
			pinHeaderRenderer: 'CustomPinHeaderRenderer',
			source: 'sample',
		};

		state.cmf.settings.props['Container(DataGrid)#HightLightRows'] = {
			actionCreators: {
				onFocusedCell: 'datagrid:focus-cell',
				onFocusedColumn: 'datagrid:focus-column',
			},
			cellRenderer: 'DefaultCellRenderer',
			rowSelection: 'multiple',
			source: 'sample',
			theme: 'grid-focus-row',
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
