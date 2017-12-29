import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { ActionDropdown } from '../src';

export default function ExampleAction() {
	const customItemsWithId = [
		{
			componentId: 'Action',
			actionId: 'menu:first',
		},
		{
			componentId: 'FilterBar',
			dockable: false,
			docked: false,
		},
		{
			componentId: 'Action',
			actionId: 'menu:second',
		},
	];

	const customItemsWithoutId = [
		{
			dockable: false,
			docked: false,
		},
		{
			dockable: false,
			docked: false,
		},
		{
			dockable: false,
			docked: false,
		},
	];


	return (
		<div>
			<IconsProvider />
			<p>ActionDropdown with items in the settings</p>
			<ActionDropdown actionId="menu:items-id" />
			<p>ActionDropdown with items from an expression</p>
			<ActionDropdown actionId="menu:items" />
			<p>ActionDropdown from setting and items from props</p>
			<ActionDropdown actionId="menu:first" actionIds={['menu:first', 'menu:second']} />
			<p>ActionDropdown from setting and a link into the items</p>
			<ActionDropdown actionId="menu:dropdown-href" />
			<p>ActionDropdown with custom items</p>
			<ActionDropdown customItems={customItemsWithId} />
			<ActionDropdown defaultCustomItemId="FilterBar" customItems={customItemsWithoutId} />
		</div>
	);
}
