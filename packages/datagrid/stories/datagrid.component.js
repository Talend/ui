import React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsProvider } from '@talend/react-components';

import DataGrid from '../src/components/';
import sample from './sample.json';

storiesOf('Component Datagrid')
	.add('default', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid
				data={sample}
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onRowsSelected={event => console.log(event)}
				rowSelection="multiple"
			/>
		</div>
	))
	.add('in progress', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid data={sample} inProgress />
		</div>
	));
