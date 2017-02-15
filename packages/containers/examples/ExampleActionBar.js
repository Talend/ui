import React from 'react';
import { IconsProvider } from 'react-talend-components';
import { action } from '@kadira/storybook';
import { ActionBar } from '../src';

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
			<ActionBar names={{ left: ['menu:first', 'menu:second', 'menu:third'] }} />
			<p>Using pure component props</p>
			<ActionBar actions={{ left: infos }} />
		</div>
	);
}
