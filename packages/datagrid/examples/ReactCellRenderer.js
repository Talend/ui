import React from 'react';

import Grid from '../src/components/grid.component';
import HeaderGrid from '../src/components/default-header-renderer';
import CellRenderer from '../src/components/default-cell-renderer';
import { rowData, columnDefs } from './config';

export default function ReactCellRenderer() {
	const renderers = {
		cellRenderer: CellRenderer,
		headerGrid: HeaderGrid,
	};

	const columnReactDefs = columnDefs.map(columnDefinition => ({
		...columnDefinition,
		...(columnDefinition.field.includes('col') ? { cellRenderer: 'cellRenderer' } : {}),
	}));

	return (
		<div>
			<Grid
				rowData={rowData}
				columnDefs={columnReactDefs}
				renderers={renderers}
				rowSelection="single"
				onFocusChanged={event => console.log(event)}
				onFocusColumnChanged={event => console.log(event)}
			/>
		</div>
	);
}
