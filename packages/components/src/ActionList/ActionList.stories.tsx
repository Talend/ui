import type { Meta, StoryObj } from '@storybook/react';
import ActionList from './ActionList.component';

const actions = [
	{
		label: 'Recent datasets',
		icon: 'talend-clock',
		'data-feature': 'actionlist.item',
		onClick: () => console.log('Recent clicked'),
	},
	{
		label: 'Favorite datasets of the year 2019',
		iconName: 'star',
		'data-feature': 'actionlist.item',
		onClick: () => console.log('Favorite clicked'),
		beta: true,
		active: true,
	},
	{
		label: 'Certified datasets',
		icon: 'talend-badge',
		'data-feature': 'actionlist.item',
		onClick: () => console.log('Certified clicked'),
	},
	{
		label: 'All datasets',
		icon: 'talend-expanded',
		'data-feature': 'actionlist.item',
		onClick: () => console.log('All clicked'),
	},
	{
		label: 'Import file',
		icon: 'talend-folder',
		'data-feature': 'actionlist.item',
		onClick: () => console.log('Import clicked'),
	},
	{
		label: 'Use magic',
		icon: 'talend-tdp-negative',
		'data-feature': 'actionlist.item',
		onClick: () => console.log('Magic clicked'),
	},
];

type Story = StoryObj<typeof ActionList>;

const meta: Meta<typeof ActionList> = {
	title: 'Components/Navigation/ActionList',
	component: ActionList,
	tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
	render: () => (
		<div style={{ display: 'inline-table' }}>
			<ActionList
				id="context"
				actions={actions}
				onSelect={() => console.log('onItemSelect')}
				onToggleDock={() => console.log('onToggleDock')}
				tooltipPlacement="top"
			/>
		</div>
	),
};

export const Reverse: Story = {
	render: () => (
		<div style={{ display: 'inline-table' }}>
			<ActionList
				id="context"
				actions={actions}
				onSelect={() => console.log('onItemSelect')}
				onToggleDock={() => console.log('onToggleDock')}
				tooltipPlacement="top"
				reverse
			/>
		</div>
	),
};

export const WithCustomClassNames: Story = {
	render: () => (
		<div>
			<p>You can add your custom classnames to the container and items</p>
			<pre>
				{`
.custom-container-classname {
    border: 5px solid turquoise;
}

.custom-item-classname {
    background-color: pink;
}
                    `}
			</pre>
			<pre>
				{`
<ActionList
    className={'custom-container-classname'}
    itemClassName={'custom-item-classname'}
    {...otherProps}
/>
            `}
			</pre>
			<style>
				{`.custom-container-classname {
                        border: 5px solid turquoise;
                    }

                    .custom-item-classname {
                        background-color: pink;
                    }`}
			</style>
			<div style={{ display: 'inline-table' }}>
				<ActionList
					id="context"
					actions={actions}
					onSelect={() => console.log('onItemSelect')}
					onToggleDock={() => console.log('onToggleDock')}
					tooltipPlacement="top"
					className="custom-container-classname"
					itemClassName="custom-item-classname"
				/>
			</div>
		</div>
	),
};

export const Single: Story = {
	render: () => (
		<div style={{ display: 'inline-table' }}>
			<ActionList
				id="context"
				actions={[actions[1]]}
				onSelect={() => console.log('onItemSelect')}
				onToggleDock={() => console.log('onToggleDock')}
				tooltipPlacement="top"
			/>
		</div>
	),
};
