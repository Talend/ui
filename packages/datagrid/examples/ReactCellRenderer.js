import React from 'react';
import { IconsProvider } from '@talend/react-components';

import DataGrid from '../src/components/datagrid.component';
import { columnDefs, rowData, pinnedColumnDefs, valueGetter } from './config';

export default function ReactCellRenderer() {
	return (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid
				rowData={rowData}
				pinnedColumnDefs={pinnedColumnDefs}
				columnDefs={columnDefs}
				rowSelection="multiple"
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onRowsSelected={event => console.log(event)}
				valueGetter={valueGetter}
			/>
		</div>
	);
}
