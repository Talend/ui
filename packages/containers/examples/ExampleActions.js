import React from 'react';

import { action } from '@storybook/addon-actions';
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
