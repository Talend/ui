import React from 'react';

import DataGrid from '../src/components/datagrid.component';
import { rowData, columnDefs } from './config';

export default function ReactCellRenderer() {
	return (
		<div>
			<DataGrid
				rowData={rowData}
				columnDefs={columnDefs}
				rowSelection="multiple"
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onRowsSelected={event => console.log(event)}
			/>
		</div>
	);
}
