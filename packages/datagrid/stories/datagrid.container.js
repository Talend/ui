import React from 'react';
import { storiesOf, setAddon } from '@storybook/react';
import cmf from 'react-storybook-cmf';
import mock from '@talend/react-cmf/lib/mock';
import { IconsProvider } from '@talend/react-components';
import { api } from '@talend/react-cmf';

import DataGrid from '../src/';
import register from '../src/register';
import theme from '../src/components/DataGrid/DataGrid.scss';

import sample from './sample.json';

setAddon({ addWithCMF: cmf.addWithCMF });

Object.keys(api.expressions).forEach(id => api.expression.register(id, api.expressions[id]));

const registerActionCreator = api.actionCreator.register;
registerActionCreator('datagrid:focus-cell', (event, data) => ({
	...event,
	...data,
	type: 'DATAGRID_FOCUS_CELL',
}));

registerActionCreator('datagrid:focus-column', (event, data) => ({
	...event,
	...data,
	type: 'DATAGRID_FOCUS_COLUMN',
}));

registerActionCreator('datagrid:vertical-scroll', (event, data) => ({
	...event,
	...data,
	type: 'DATAGRID_SCROLL',
}));

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

const cmfState = mock.state();
cmfState.cmf.collections = cmfState.cmf.collections.set('sample', sample);
if (!cmfState.cmf.settings.props) {
	cmfState.cmf.settings.props = cmfState.cmf.settings.views;
}

cmfState.cmf.settings.props['Container(DataGrid)#default'] = {
	dataExpression: {
		id: 'cmf.collections.get',
		args: ['sample', []],
	},
	onFocusedCellActionCreator: 'datagrid:focus-cell',
	onFocusedColumnActionCreator: 'datagrid:focus-column',
	onVerticalScrollActionCreator: 'datagrid:vertical-scroll',
	cellRenderer: 'DefaultCellRenderer',
};

cmfState.cmf.settings.props['Container(DataGrid)#ProgressDatagrid'] = {
	dataExpression: {
		id: 'cmf.collections.get',
		args: ['sample', []],
	},
	onFocusedCellActionCreator: 'datagrid:focus-cell',
	onFocusedColumnActionCreator: 'datagrid:focus-column',
	cellRenderer: 'DefaultCellRenderer',
	loading: true,
};

cmfState.cmf.settings.props['Container(DataGrid)#CustomizedDatagrid'] = {
	dataExpression: {
		id: 'cmf.collections.get',
		args: ['sample', []],
	},
	onFocusedCellActionCreator: 'datagrid:focus-cell',
	onFocusedColumnActionCreator: 'datagrid:focus-column',
	onVerticalScrollActionCreator: 'datagrid:vertical-scroll',
	cellRenderer: 'CustomCellRenderer',
	headerRenderer: 'CustomHeaderRenderer',
	pinHeaderRenderer: 'CustomPinHeaderRenderer',
};

cmfState.cmf.settings.props['Container(DataGrid)#CustomizedAvroDatagrid'] = {
	avroRenderer: {
		intCellRenderer: 'CustomIntCellRenderer',
		dateCellRenderer: 'CustomDateCellRenderer',
		booleanCellRenderer: 'CustomBooleanCellRenderer',
	},
	dataExpression: {
		id: 'cmf.collections.get',
		args: ['sample', []],
	},
	onFocusedCellActionCreator: 'datagrid:focus-cell',
	onFocusedColumnActionCreator: 'datagrid:focus-column',
	onVerticalScrollActionCreator: 'datagrid:vertical-scroll',
	headerRenderer: 'CustomHeaderRenderer',
	pinHeaderRenderer: 'CustomPinHeaderRenderer',
};

cmfState.cmf.settings.props['Container(DataGrid)#HightLightRows'] = {
	dataExpression: {
		id: 'cmf.collections.get',
		args: ['sample', []],
	},
	onFocusedCellActionCreator: 'datagrid:focus-cell',
	onFocusedColumnActionCreator: 'datagrid:focus-column',
	onScrollActionCreator: 'datagrid:vertical-scroll',
	cellRenderer: 'DefaultCellRenderer',
	rowSelection: 'multiple',
};

const reducer = (state = {}, a) => {
	console.log(a);
	return state;
};

function registerCustomizedComponents() {
	api.component.register('CustomCellRenderer', props => <span>{props.value.value}</span>);
	api.component.register('CustomHeaderRenderer', props => <span>{props.displayName}</span>);
	api.component.register('CustomPinHeaderRenderer', () => <span />);
	api.component.register('CustomStringCellRenderer', props => (
		<span>I'm a string({props.data.value})</span>
	));
	api.component.register('CustomIntCellRenderer', props => (
		<span>I'm an int({props.data.value})</span>
	));
	api.component.register('CustomBooleanCellRenderer', props => (
		<span>I'm a boolean({props.data.value})</span>
	));
	api.component.register('CustomDateCellRenderer', props => (
		<span>I'm a date({props.data.value})</span>
	));
}

register();
registerCustomizedComponents();

const options = {
	reducer,
	state: cmfState,
};

storiesOf('Container Datagrid')
	.addWithCMF(
		'default',
		() => (
			<div style={{ height: '100vh' }}>
				<IconsProvider />
				<DataGrid />
			</div>
		),
		options,
	)
	.addWithCMF(
		'loading',
		() => (
			<div style={{ height: '100vh' }}>
				<IconsProvider />
				<DataGrid componentId="ProgressDatagrid" />
			</div>
		),
		options,
	)
	.addWithCMF(
		'with custom renderers',
		() => (
			<div style={{ height: '100vh' }}>
				<IconsProvider />
				<DataGrid componentId="CustomizedDatagrid" />
			</div>
		),
		options,
	)
	.addWithCMF(
		'with custom avro renderers',
		() => (
			<div style={{ height: '100vh' }}>
				<IconsProvider />
				<DataGrid componentId="CustomizedAvroDatagrid" />
			</div>
		),
		options,
	)
	.addWithCMF(
		'with selected rows',
		() => (
			<div style={{ height: '100vh' }}>
				<IconsProvider />
				<DataGrid componentId="HightLightRows" className={theme['td-grid-focus-row']} />
			</div>
		),
		options,
	)
	.addWithCMF(
		'multiple grid',
		() => (
			<div>
				<IconsProvider />
				<div style={{ height: '50vh' }}>
					<DataGrid componentId="HightLightRows" />
				</div>
				<div style={{ height: '50vh' }}>
					<DataGrid componentId="CustomizedAvroDatagrid" />
				</div>
			</div>
		),
		options,
	);
