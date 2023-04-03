import SidePanel from '.';

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

export default {
	title: 'SidePanel',
};

export const Default = () => <SidePanel actions={actions} />;
export const InjectedSettings = () => (
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
);
