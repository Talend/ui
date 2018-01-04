import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { SidePanel } from '../src';

const ExampleSidePanel = {
	'default settings': () => (
		<div>
			<IconsProvider />
			<SidePanel actionIds={['menu:first', 'menu:second', 'menu:third']} />
		</div>
	),
	'injected settings': () => (
		<div>
			<IconsProvider />
			<SidePanel
				actionsComponents={[
					{
						component: 'FilterBar',
						docked: false,
					},
					{
						component: 'Action',
						actionId: 'dialog:delete:validate',
					},
				]}
			/>
		</div>
	),
};

export default ExampleSidePanel;
