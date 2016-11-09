import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { ActionDropdown } from '../src/index';

const myAction = {
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
};

storiesOf('ActionDropdown', module)
	.addWithInfo('default', () => (
		<div>
			<h1>ActionDropdown</h1>
			<h2>Definition</h2>
			<p>
				The action component display a dropdown
				where each element let the user dispatch an action
			</p>
			<h2>Examples</h2>
			<p>By default :</p>
			<ActionDropdown {...myAction} />
			<p>With hideLabel option</p>
			<ActionDropdown
				{...myAction}
				hideLabel
			/>
			<p>Empty option</p>
			<ActionDropdown
				{...myAction}
				items={[]}
				hideLabel
			/>
		</div>
	));
