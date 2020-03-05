import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Actions from './Actions.component';

const actions = [
	{
		label: 'Preparations',
		icon: 'fa fa-asterisk',
		'data-feature': 'actions.item',
		onClick: action('Preparations clicked'),
		bsStyle: 'primary',
	},
	{
		label: 'Datasets',
		icon: 'fa fa-file-excel-o',
		'data-feature': 'actions.item',
		onClick: action('Datasets clicked'),
	},
	{
		label: 'Favorites',
		icon: 'fa fa-star',
		'data-feature': 'actions.item',
		onClick: action('Favorites clicked'),
		inProgress: true,
	},
	{
		id: 'dropdown',
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'fa fa-file-excel-o',
		items: [
			{
				label: 'document 1',
				'data-feature': 'actions.dropdown.items',
				onClick: action('document 1 click'),
			},
			{
				label: 'document 2',
				'data-feature': 'actions.dropdown.items',
				onClick: action('document 2 click'),
			},
		],
	},
	{
		id: 'split-dropdown-id',
		displayMode: 'splitDropdown',
		label: 'add file',
		'data-feature': 'actions.splitdropdown',
		onClick: action('click'),
		items: [
			{
				label: 'file 1',
				'data-feature': 'actions.splitdropdown.items',
				onClick: action('file 1 click'),
			},
			{
				label: 'file 2',
				'data-feature': 'actions.splitdropdown.items',
				onClick: action('file 2 click'),
			},
		],
	},
];

storiesOf('Buttons/ButtonGroup', module).add('default', () => (
	<div>
		<p>By default :</p>
		<div id="default">
			<Actions actions={actions} />
		</div>
		<p>Vertical</p>
		<div id="vertical">
			<Actions actions={actions} vertical />
		</div>
	</div>
));
