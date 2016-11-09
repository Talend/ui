import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Actions } from '../src/index';

const actions = [
	{
		type: 'action',
		label: 'Preparations',
		icon: 'fa fa-asterisk',
		onClick: action('Preparations clicked'),
		bsStyle: 'primary',
	},
	{
		type: 'action',
		label: 'Datasets',
		icon: 'fa fa-file-excel-o',
		onClick: action('Datasets clicked'),
	},
	{
		type: 'action',
		label: 'Favorites',
		icon: 'fa fa-star',
		onClick: action('Favorites clicked'),
		inProgress: true,
	},
	{
		type: 'dropdown',
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
storiesOf('Actions', module)
	.addWithInfo('default', () => (
		<div>
			<h1>Actions</h1>
			<h2>Definition</h2>
			<p>The actions component display buttons to let the user dispatch those actions</p>
			<h2>Examples</h2>
			<p>By default :</p>
			<Actions actions={actions} />
			<p>With hideLabel option</p>
			<Actions
				actions={actions}
				hideLabel
			/>
			<p>Vertical</p>
			<Actions
				actions={actions}
				vertical
			/>
			<p>Vertical with hideLabel</p>
			<Actions
				actions={actions}
				placement="right"
				hideLabel
				vertical
			/>
		</div>
	));
