import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { ActionDropdown } from '../src/index';

const myAction = {
	id: 'context-dropdown-related-items',
	label: 'related items',
	icon: 'fa fa-file-excel-o',
	items: [
		{
			id: 'context-dropdown-item-document-1',
			label: 'document 1',
			onClick: action('document 1 click'),
		},
		{
			id: 'context-dropdown-item-document-2',
			label: 'document 2',
			onClick: action('document 2 click'),
		},
	],
};

storiesOf('ActionDropdown', module)
	.addWithInfo('default', () => (
		<div>
			<p>By default :</p>
			<div id="default">
				<ActionDropdown {...myAction} />
			</div>
			<p>With hideLabel option</p>
			<div id="hidelabel">
				<ActionDropdown
					{...myAction}
					hideLabel
				/>
			</div>
			<p>Empty option</p>
			<div id="empty">
				<ActionDropdown
					{...myAction}
					items={[]}
					hideLabel
				/>
			</div>
		</div>
	));
