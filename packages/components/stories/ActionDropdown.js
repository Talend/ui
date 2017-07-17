import React from 'react';
import { // eslint-disable-line import/no-extraneous-dependencies
	storiesOf,
	action,
} from '@kadira/storybook';

import { ActionDropdown, IconsProvider } from '../src/index';

const myAction = {
	id: 'context-dropdown-related-items',
	label: 'related items dlkasjdlasj diasj odijas oij dsaij diasj idsaj',
	icon: 'talend-file-xls-o',
	items: [
		{
			id: 'context-dropdown-item-document-1',
			icon: 'talend-file-json-o',
			label: 'document 1',
			onClick: action('document 1 click'),
		},
		{
			divider: true,
		},
		{
			id: 'context-dropdown-item-document-2',
			label: 'document 2',
			onClick: action('document 2 click'),
		},
	],
};

const oneEventAction = {
	id: 'context-dropdown-events',
	label: 'Dropdown',
	items: [
		{ id: 'item-1', label: 'Item 1' },
		{ id: 'item-2', label: 'Item 2' },
	],
	onSelect: action('onItemSelect'),
};

storiesOf('ActionDropdown', module)
	.addWithInfo('default', () => (
		<div>
			<p>By default :</p>
			<div id="default">
				<ActionDropdown {...myAction} />
			</div>
			<p>With one event handler:</p>
			<div id="oneEvent">
				<ActionDropdown {...oneEventAction} />
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
			<IconsProvider />
		</div>
	));
