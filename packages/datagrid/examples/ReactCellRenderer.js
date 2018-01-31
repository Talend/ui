import React from 'react';
import { IconsProvider } from '@talend/react-components';

import DataGrid from '../src/components/datagrid.component';
import { columnDefs, rowData, pinnedColumnDefs } from './config';

export default function ReactCellRenderer() {
	return (
		<div>
			<IconsProvider />
			<DataGrid
				rowData={rowData}
				pinnedColumnDefs={pinnedColumnDefs}
				columnDefs={columnDefs}
				rowSelection="multiple"
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onRowsSelected={event => console.log(event)}
			/>
		</div>
	);
}
