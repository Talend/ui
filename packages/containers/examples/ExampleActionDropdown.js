import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { ActionDropdown } from '../src';

export default function ExampleAction() {
	const propsInjectedItems = {
		id: 'injected-items',
		displayMode: 'dropdown',
		label: 'my injected items',
		components: {
			itemsDropdown: [
				{
					component: 'Action',
					actionId: 'menu:first',
				},
				{
					divider: true,
				},
				{
					component: 'FilterBar',
					dockable: false,
					docked: false,
				},
				{
					component: 'Action',
					actionId: 'menu:second',
				},
			],
		},
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
			<p>ActionDropdown with components</p>
			<ActionDropdown {...propsInjectedItems} />
		</div>
	);
}
