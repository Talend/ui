import React from 'react';

import Layout from '@talend/react-components/lib/Layout';
import HeaderBar from '@talend/react-containers/lib/HeaderBar';
import SidePanel from '@talend/react-containers/lib/SidePanel';
import DataGrid, { DatasetSerializer } from '@talend/react-datagrid';
// eslint-disable-next-line @talend/import-depth
import sample from '@talend/react-datagrid/mocks/sample.json';

export function DataGridPlayground() {
	return (
		<Layout mode="TwoColumns" one={<SidePanel />} header={<HeaderBar />}>
			<div style={{ height: '100%' }}>
				<DataGrid
					columnDefs={DatasetSerializer.getColumnDefs(sample.schema)}
					rowData={sample.data}
				/>
			</div>
		</Layout>
	);
}
