import React from 'react';

import { SidePanel } from '../src';

const actions = [
	{
		componentId: 'first',
		href: '/storybook',
	},
	{
		componentId: 'second',
		href: '/foo',
	},
	{
		componentId: 'configuration',
		href: '/configuration',
	},
];

const ExampleSidePanel = {
	'default settings': () => (
		<div>
			<SidePanel actions={actions} />
		</div>
	),
	'injected settings': () => (
		<div>
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
