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
				actionIds={['menu:first', 'menu:second', 'menu:third']}
				components={{
					'before-actions': [
						{
							component: 'FilterBar',
							docked: false,
						},
					],
				}}
			/>
		</div>
	),
};

export default ExampleSidePanel;
