import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { api } from '@talend/react-cmf';

import DataGrid from '../src/';
import register from '../src/components/register';

import theme from '../src/components/datagrid.scss';

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

const ExampleReactCellRenderer = {
	default: () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid />
		</div>
	),
};

ExampleReactCellRenderer['with custom renderers'] = () => (
	<div style={{ height: '100vh' }}>
		<IconsProvider />
		<DataGrid componentId="CustomizedDatagrid" />
	</div>
);

ExampleReactCellRenderer['with custom avro renderers'] = () => (
	<div style={{ height: '100vh' }}>
		<IconsProvider />
		<DataGrid componentId="CustomizedAvroDatagrid" />
	</div>
);

ExampleReactCellRenderer['with selected rows'] = () => (
	<div style={{ height: '100vh' }}>
		<IconsProvider />
		<DataGrid componentId="HightLightRows" className={theme['td-grid-focus-row']} />
	</div>
);

ExampleReactCellRenderer['multiple grid'] = () => (
	<div>
		<IconsProvider />
		<div style={{ height: '50vh' }}>
			<DataGrid componentId="HightLightRows" />
		</div>
		<div style={{ height: '50vh' }}>
			<DataGrid componentId="CustomizedAvroDatagrid" />
		</div>
	</div>
);

export default ExampleReactCellRenderer;
