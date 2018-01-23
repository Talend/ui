import React from 'react';

import Grid from '../src/components/grid.component';
import HeaderGrid from '../src/components/header-grid.component';
import CellRenderer from '../src/components/cell-renderer.component';
import { rowData, columnDefs } from './config';

export default function ReactCellRenderer() {
	const renderers = {
		cellRenderer: CellRenderer,
		headerGrid: HeaderGrid,
	};

	const columnReactDefs = columnDefs.map(columnDefinition => ({
		...columnDefinition,
		...(columnDefinition.field.includes('col')
			? { cellRenderer: 'cellRenderer' }
			: { cellClass: 'index-cell' }),
	}));

	return (
		<div>
			<Grid rowData={rowData} columnDefs={columnReactDefs} renderers={renderers} />
		</div>
	);
}
