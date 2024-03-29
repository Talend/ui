import { action } from '@storybook/addon-actions';
import ActionBar from '.';

const infos = [
	{
		label: 'Preparations',
		icon: 'talend-dataprep',
		onClick: action('Preparations clicked'),
		bsStyle: 'primary',
	},
	{
		label: 'Datasets',
		icon: 'talend-datasets',
		onClick: action('Datasets clicked'),
	},
	{
		label: 'Favorites',
		icon: 'talend-star',
		onClick: action('Favorites clicked'),
	},
	{
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'talend-file-xls-o',
		items: [
			{
				label: 'document 1',
				onClick: action('document 1 click'),
			},
			{
				label: 'document 2',
				onClick: action('document 2 click'),
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
