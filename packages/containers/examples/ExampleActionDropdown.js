import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { ActionDropdown } from '../src';

export default function ExampleAction() {
	const customItemsWithId = {
		id: 'context-dropdown-custom-items',
		label: 'Custom Items With Id',
		customItems: [
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
		],
	};
	const customItemsWithIdWithoutComponentId = {
		id: 'context-dropdown-custom-items-without-component-id',
		label: 'Custom Items Without component Id',
		customItems: [
			{
				actionId: 'menu:first',
			},
			{
				dockable: false,
				docked: false,
			},
			{
				actionId: 'menu:second',
			},
		],
	};

	const customItemsWithoutId = {
		id: 'context-dropdown-custom-items-without-id',
		label: 'Custom Items Without Id',
		defaultCustomItemId: 'FilterBar',
		customItems: [
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
		],
	};

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
			<p>ActionDropdown with customItems</p>
			<ActionDropdown {...customItemsWithId} />
			<p>ActionDropdown with customItems and defaultCustomItemId</p>
			<ActionDropdown {...customItemsWithoutId} />
			<p>ActionDropdown with customItems but no componentId</p>
			<ActionDropdown {...customItemsWithIdWithoutComponentId} />
		</div>
	);
}
