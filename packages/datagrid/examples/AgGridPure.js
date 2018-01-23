import React from 'react';

import Grid from '../src/components/grid.component';
import { rowData, columnDefs } from './config';

export default function AGGridPure() {
	const columnReactDefs = columnDefs.map(columnDefefition => ({
		...columnDefefition,
	}));

	return (
		<div>
			<Grid rowData={rowData} columnDefs={columnReactDefs} />
		</div>
	);
}
