import 'babel-polyfill';
import { storiesOf, configure, setAddon } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import cmf from 'react-storybook-cmf';
import mock from '@talend/react-cmf/lib/mock';
import { api } from '@talend/react-cmf';
import { List, Map, fromJS } from 'immutable';
import '@talend/bootstrap-theme/src/theme/theme.scss';
import 'focus-outline-manager';

import {
	NAMESPACE_INDEX,
	NAMESPACE_SAMPLE,
	COLUMN_INDEX,
	TALEND_QUALITY_KEY,
} from '../src/constants/';
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

function getColumnDefs(sample) {
	if (!sample) {
		return [];
	}

	return sample.schema.fields.map(avroField => ({
		headerName: avroField.doc,
		type: avroField.type.dqType || avroField.type.type,
		field: `${NAMESPACE_SAMPLE}${avroField.name}`,
		[TALEND_QUALITY_KEY]: avroField[TALEND_QUALITY_KEY],
		avro: avroField,
	}));
}

function getRowData(sample) {
	if (!sample) {
		return [];
	}

	return sample.data.map((row, index) =>
		Object.keys(row.value).reduce(
			(rowData, key) => ({
				...rowData,
				[`${NAMESPACE_SAMPLE}${key}`]: {
					value: row.value[key].value,
					quality: row.value[key].quality,
					comments: [],
					type: 'string',
					avro: {},
				},
			}),
			{
				[`${NAMESPACE_INDEX}${COLUMN_INDEX}`]: index,
			},
		),
	);
}

function getPinnedColumnDefs(sample) {
	if (!sample) {
		return [];
	}

	return [
		{
			field: `${NAMESPACE_INDEX}${COLUMN_INDEX}`,
			width: 100,
		},
	];
}

function valueGetter({ colDef, data }) {
	return data[colDef.field];
}

api.expression.register('getColumnDefs', props => {
	return getColumnDefs;
});

api.expression.register('getPinnedColumnDefs', props => {
	return getPinnedColumnDefs;
});

api.expression.register('getRowData', props => {
	return getRowData;
});

api.expression.register('getValueGetter', props => {
	return valueGetter;
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
			getColumnDefsExpression: 'getColumnDefs',
			getPinnedColumnDefsExpression: 'getPinnedColumnDefs',
			getRowDataExpression: 'getRowData',
			getValueGetterExpression: 'getValueGetter',
			source: 'sample',
		};

		state.cmf.settings.props['Container(DataGrid)#CustomizedDatagrid'] = {
			actionCreators: {
				onFocusedCell: 'datagrid:focus-cell',
				onFocusedColumn: 'datagrid:focus-column',
			},
			cellRenderer: 'CustomCellRenderer',
			getColumnDefsExpression: 'getColumnDefs',
			getPinnedColumnDefsExpression: 'getPinnedColumnDefs',
			getRowDataExpression: 'getRowData',
			getValueGetterExpression: 'getValueGetter',
			headerRenderer: 'CustomHeaderRenderer',
			pinHeaderRenderer: 'CustomPinHeaderRenderer',
			source: 'sample',
		};

		state.cmf.settings.props['Container(DataGrid)#CustomizedAvroDatagrid'] = {
			avroRenderer: {
				// stringCellRenderer: 'CustomStringCellRenderer',
				intCellRenderer: 'CustomIntCellRenderer',
				dateCellRenderer: 'CustomDateCellRenderer',
				booleanCellRenderer: 'CustomBooleanCellRenderer',
			},
			actionCreators: {
				onFocusedCell: 'datagrid:focus-cell',
				onFocusedColumn: 'datagrid:focus-column',
			},
			getColumnDefsExpression: 'getColumnDefs',
			getPinnedColumnDefsExpression: 'getPinnedColumnDefs',
			getRowDataExpression: 'getRowData',
			getValueGetterExpression: 'getValueGetter',
			headerRenderer: 'CustomHeaderRenderer',
			pinHeaderRenderer: 'CustomPinHeaderRenderer',
			source: 'sample',
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
