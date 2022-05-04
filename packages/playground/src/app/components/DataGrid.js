import React from 'react';
// eslint-disable-next-line @talend/import-depth
import data from '@talend/react-datagrid/stories/sample.json';
import DataGrid from '@talend/react-datagrid';
import Layout from '@talend/react-components/lib/Layout';
import SidePanel from '@talend/react-containers/lib/SidePanel';
import HeaderBar from '@talend/react-containers/lib/HeaderBar';

export function DataGridPlayground() {
	return (
		<Layout mode="TwoColumns" one={<SidePanel />} header={<HeaderBar />}>
			<div style={{ height: '100%' }}>
				<DataGrid data={data} />
			</div>
		</Layout>
	);
}
