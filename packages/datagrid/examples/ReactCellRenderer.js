import React from 'react';

import Grid from '../src/components/grid.component';
import { rowData, columnDefs } from './config';

function DataGridCell(params) {
	return <b>{params.value}</b>;
}

export default function ReactCellRenderer() {
	const renderers = {
		cellRenderer: DataGridCell,
	};

	const columnReactDefs = columnDefs.map(columnDefefition => ({
		...columnDefefition,
		cellRenderer: 'cellRenderer',
	}));

	return (
		<div>
			<Grid rowData={rowData} columnDefs={columnReactDefs} renderers={renderers} />
		</div>
	);
}
