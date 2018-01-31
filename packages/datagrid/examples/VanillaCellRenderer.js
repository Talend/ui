import React from 'react';

import DataGrid from '../src/components/datagrid.component';
import { columnDefs, pinnedColumnDefs, rowData } from './config';

class CellRenderer {
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
	return (
		<div>
			<DataGrid
				rowData={rowData}
				columnDefs={columnDefs}
				pinnedColumnDefs={pinnedColumnDefs}
				cellRenderer={CellRenderer}
			/>
		</div>
	);
}
