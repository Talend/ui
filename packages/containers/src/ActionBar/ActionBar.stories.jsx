import { fn as action } from 'storybook/test';
import ActionBar from '.';

const infos = [
	{
		label: 'Preparations',
		icon: 'talend-dataprep',
		onClick: action(),
		bsStyle: 'primary',
	},
	{
		label: 'Datasets',
		icon: 'talend-datasets',
		onClick: action(),
	},
	{
		label: 'Favorites',
		icon: 'talend-star',
		onClick: action(),
	},
	{
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'talend-file-xls-o',
		items: [
			{
				label: 'document 1',
				onClick: action(),
			},
			{
				label: 'document 2',
				onClick: action(),
			},
		],
	},
];

export default {
	title: 'ActionBar',
};

export const Default = () => (
	<div>
		<p>using action ids</p>
		<ActionBar actionIds={{ left: ['menu:first', 'menu:second', 'menu:third', 'menu:fourth'] }} />
		<p>using btn groups</p>
		<ActionBar
			actionIds={{
				left: [
					{
						displayMode: 'btnGroup',
						actionIds: ['menu:first', 'menu:second', 'menu:third'],
					},
				],
			}}
		/>
		<p>using dropdown</p>
		<ActionBar
			actionIds={{
				left: [
					{
						displayMode: 'dropdown',
						actionId: 'menu:items',
					},
				],
			}}
		/>
		<p>using split dropdown</p>
		<ActionBar
			actionIds={{
				left: [
					{
						displayMode: 'splitDropdown',
						actionId: 'menu:items',
					},
				],
			}}
		/>
		<p>Using pure component props</p>
		<ActionBar actions={{ left: infos }} />
	</div>
);
