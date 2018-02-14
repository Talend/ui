import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { api } from '@talend/react-cmf';

import DataGrid from '../src/components/datagrid.component';
import sample from '../.storybook/sample.json';

export default function ReactCellRenderer() {
	return (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid
				data={sample}
				getComponent={api.component.get}
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onRowsSelected={event => console.log(event)}
				rowSelection="multiple"
			/>
		</div>
	);
}
