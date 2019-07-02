import React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsProvider } from '@talend/react-components';

import FabricDatagrid from '../src/components/FabricDetailsList/FabricDetailsList.component';

import { getComponent } from './datagrid.component';
import sample from './sample.json';

storiesOf('Fabric', module).add('default', () => (
	<div style={{ height: '100vh' }}>
		<IconsProvider />
		<FabricDatagrid sample={sample} getComponent={getComponent} />
	</div>
));
