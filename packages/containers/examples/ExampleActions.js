import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { action } from '@storybook/react';
import { Actions } from '../src';

const infos = [
	{
		label: 'Preparations',
		icon: 'fa fa-asterisk',
		onClick: action('Preparations clicked'),
		bsStyle: 'primary',
	},
	{
		label: 'Datasets',
		icon: 'fa fa-file-excel-o',
		onClick: action('Datasets clicked'),
	},
	{
		label: 'Favorites',
		icon: 'fa fa-star',
		onClick: action('Favorites clicked'),
		inProgress: true,
	},
	{
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'fa fa-file-excel-o',
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

export default function ExampleActions() {
	return (
		<div>
			<IconsProvider />
			<p>using action ids</p>
			<Actions names={['menu:first', 'menu:second', 'menu:third']} />
			<p>Using pure component props</p>
			<Actions actions={infos} />
			<p>Using with items defined by id</p>
			<Actions names={['menu:items-id']} />
			<p>Using with dynamics items by an expression</p>
			<Actions names={['menu:items']} />
		</div>
	);
}
