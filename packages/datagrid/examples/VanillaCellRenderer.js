import React from 'react';

import Grid from '../src/components/grid.component';
import { rowData, columnDefs } from './config';

class SimpleCellRenderer {
	init(params) {
		const div = document.createElement('div');

		div.innerHTML = `<b>${params.value}</b>`;
		this.eGui = div.firstChild;
	}

	getGui() {
		return this.eGui;
	}

	destroy() {
		clearInterval(this.timeout);
	}
}

export default function VanillaCellRenderer() {
	const columnReactDefs = columnDefs.map(columnDefefition => ({
		...columnDefefition,
		cellRenderer: SimpleCellRenderer,
	}));

	return (
		<div>
			<Grid rowData={rowData} columnDefs={columnReactDefs} />
		</div>
	);
}
