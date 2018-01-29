import React from 'react';

import Grid from '../src/components/grid.component';
import HeaderGrid from '../src/components/default-header-renderer';
import { rowData, columnDefs } from './config';

export default function AGGridPure() {
	const renderers = {
		headerGrid: HeaderGrid,
	};
	const columnReactDefs = columnDefs.map(columnDefefition => ({
		...columnDefefition,
	}));

	return (
		<div>
			<Grid rowData={rowData} columnDefs={columnReactDefs} renderers={renderers} />
		</div>
	);
}
