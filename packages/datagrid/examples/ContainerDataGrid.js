import React from 'react';
import { IconsProvider } from '@talend/react-components';

import DataGrid from '../src/containers/datagrid.connect';
import register from '../src/components/register';

register();

export default function ReactCellRenderer() {
	return (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid />
		</div>
	);
}
