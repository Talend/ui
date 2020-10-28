import React from 'react';
import get from 'lodash/get';
import { storiesOf } from '@storybook/react';

import withCMF from '@talend/react-storybook-cmf';
import { IconsProvider } from '@talend/react-components';
import api, { mock } from '@talend/react-cmf';

import DataGrid from '.';
import register from '../register';
import theme from '../components/DataGrid/DataGrid.scss';
import sample from '../../stories/sample.json';
import sampleRenderer from '../../stories/sampleRenderer.json';

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

const cmfState = mock.store.state();
cmfState.cmf.collections = cmfState.cmf.collections.set('sample', sample);
cmfState.cmf.collections = cmfState.cmf.collections.set('sampleRenderer', sampleRenderer);
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

cmfState.cmf.settings.props['Container(DataGrid)#TypeRenderer'] = {
	dataExpression: {
		id: 'cmf.collections.get',
		args: ['sampleRenderer', []],
	},
	onFocusedCellActionCreator: 'datagrid:focus-cell',
	onFocusedColumnActionCreator: 'datagrid:focus-column',
	onScrollActionCreator: 'datagrid:vertical-scroll',
	cellRenderer: 'DefaultCellRenderer',
};

function registerCustomizedComponents() {
	api.component.register('CustomCellRenderer', props => (
		<span>{get(props, 'value.value.bytes', '') || get(props, 'value.value', '')}</span>
	));
	api.component.register('CustomHeaderRenderer', props => <span>{props.displayName}</span>);
	api.component.register('CustomPinHeaderRenderer', () => <span />);
	api.component.register('CustomStringCellRenderer', props => (
		<span>
			I'm a string(
			{props.data.value})
		</span>
	));
	api.component.register('CustomIntCellRenderer', props => (
		<span>
			I'm an int(
			{props.data.value})
		</span>
	));
	api.component.register('CustomBooleanCellRenderer', props => (
		<span>
			I'm a boolean(
			{props.data.value})
		</span>
	));
	api.component.register('CustomDateCellRenderer', props => (
		<span>
			I'm a date(
			{props.data.value})
		</span>
	));
}

register();
registerCustomizedComponents();

const logMiddleware = () => next => action => {
	// eslint-disable-next-line no-console
	console.log(action);
	return next(action);
};
const options = {
	cmf: {
		middleware: logMiddleware,
		state: cmfState,
	},
};

storiesOf('Data/Datagrid/Containers', module)
	.addDecorator(withCMF)
	.add(
		'default',
		() => (
			<div style={{ height: '100vh' }}>
				<IconsProvider />
				<DataGrid />
			</div>
		),
		{ ...options },
	)
	.add(
		'loading',
		() => (
			<div style={{ height: '100vh' }}>
				<IconsProvider />
				<DataGrid componentId="ProgressDatagrid" />
			</div>
		),
		{ ...options },
	)
	.add(
		'with custom renderers',
		() => (
			<div style={{ height: '100vh' }}>
				<IconsProvider />
				<DataGrid componentId="CustomizedDatagrid" />
			</div>
		),
		{ ...options },
	)
	.add(
		'with custom avro renderers',
		() => (
			<div style={{ height: '100vh' }}>
				<IconsProvider />
				<DataGrid componentId="CustomizedAvroDatagrid" />
			</div>
		),
		{ ...options },
	)
	.add(
		'with selected rows',
		() => (
			<div style={{ height: '100vh' }}>
				<IconsProvider />
				<DataGrid componentId="HightLightRows" className={theme['td-grid-focus-row']} />
			</div>
		),
		{ ...options },
	)
	.add(
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
		{ ...options },
	)
	.add(
		'type renderer',
		() => (
			<div style={{ height: '100vh' }}>
				<IconsProvider />
				<DataGrid componentId="TypeRenderer" data={sampleRenderer} />
			</div>
		),
		{ ...options },
	);
