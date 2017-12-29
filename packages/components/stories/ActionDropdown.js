import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf, action } from '@storybook/react';

import { ActionDropdown, IconsProvider, FilterBar, Action } from '../src/index';

const myAction = {
	id: 'context-dropdown-related-items',
	label: 'related items',
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

const customItems = {
	id: 'context-dropdown-custom-items',
	label: 'custom items',
	icon: 'talend-file-xls-o',
	items: [
		<Action label="customAction1" icon="talend-file-json-o" onClick={action('customAction1')} />,
		{
			divider: true,
		},
		<FilterBar dockable={false} />,
		<Action label="customAction2" bsStyle="talend-bell" onClick={action('customAction2')} />,
	],
};

const oneEventAction = {
	id: 'context-dropdown-events',
	label: 'Dropdown',
	items: [{ id: 'item-1', label: 'Item 1' }, { id: 'item-2', label: 'Item 2' }],
	onSelect: action('onItemSelect'),
};

storiesOf('ActionDropdown', module).addWithInfo('default', () => (
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
			<ActionDropdown {...myAction} hideLabel />
		</div>
		<p>Empty option</p>
		<div id="empty">
			<ActionDropdown {...myAction} items={[]} hideLabel />
		</div>
		<p>Dropup</p>
		<div id="dropup">
			<ActionDropdown {...myAction} dropup />
		</div>
		<p>Type link</p>
		<div id="typeLink">
			<ActionDropdown {...myAction} link />
		</div>
		<p>Custom Items</p>
		<div id="customItems">
			<ActionDropdown {...customItems} />
		</div>
		<IconsProvider />
	</div>
));
