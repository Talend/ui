import React from 'react';

import DataGrid from '.';
import theme from '../components/DataGrid/DataGrid.scss';
import sampleRenderer from '../../stories/sampleRenderer.json';

export default {
	title: 'Datagrid/Containers',
	decorators: [story => <div style={{ height: '90vh' }}>{story()}</div>],
};

export const Default = () => <DataGrid />;
export const Loading = () => <DataGrid componentId="ProgressDatagrid" />;
export const CustomRenderers = () => <DataGrid componentId="CustomizedDatagrid" />;
export const CustomAvroRenderers = () => <DataGrid componentId="CustomizedAvroDatagrid" />;
export const SelectedRows = () => (
	<DataGrid componentId="HightLightRows" className={theme['td-grid-focus-row']} />
);
export const MultipleGrid = () => (
	<>
		<div style={{ height: '45vh' }}>
			<DataGrid componentId="HightLightRows" />
		</div>
		<div style={{ height: '45vh' }}>
			<DataGrid componentId="CustomizedAvroDatagrid" />
		</div>
	</>
);
export const TypeRenderer = () => <DataGrid componentId="TypeRenderer" data={sampleRenderer} />;
