import React from 'react';
import { IconsProvider } from '@talend/react-components';

import DataGrid from '../src/containers/datagrid.connect';

// import sample from '../.storybook/sample.json';

export default function ReactCellRenderer() {
	return (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid />
		</div>
	);
}
