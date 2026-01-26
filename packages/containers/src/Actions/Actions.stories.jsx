import { fn as action } from 'storybook/test';
import Actions from '.';

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
	title: 'Actions',
};

export function Default() {
	return (
		<div>
			<p>using action ids</p>
			<Actions actionIds={['menu:first', 'menu:second', 'menu:third']} />
			<p>Using pure component props</p>
			<Actions actions={infos} />
			<p>Using with items defined by id</p>
			<Actions actionIds={['menu:items-id']} />
			<p>Using with dynamics items by an expression</p>
			<Actions actionIds={['menu:items']} />
		</div>
	);
}
