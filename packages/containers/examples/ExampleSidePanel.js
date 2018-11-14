import React from 'react';
import { IconsProvider } from '@talend/react-components';
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
			<IconsProvider />
			<SidePanel actions={actions} />
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
