import React from 'react';
import Immutable from 'immutable';
import { action } from '@storybook/addon-actions';

import { ActionDropdown } from '../src';

export default function ExampleAction() {
	const propsInjectedItems = {
		id: 'injected-items',
		displayMode: 'dropdown',
		label: 'my injected items',
		onSelect: action('selectAction'),
		components: {
			itemsDropdown: [
				{
					component: 'Action',
					actionId: 'menu:first',
					withMenuItem: true,
				},
				{
					divider: true,
				},
				{
					component: 'FilterBar',
					dockable: false,
					docked: false,
					withMenuItem: true,
				},
				{
					component: 'Action',
					actionId: 'menu:second',
				},
			],
		},
	};
	const propsImmutableItems = {
		id: 'immutable-items',
		displayMode: 'dropdown',
		label: 'my immutable items',
		onSelect: action('selectAction'),
		items: Immutable.fromJS([
			{
				id: 'item1',
				label: 'First immutable label',
			},
			{
				id: 'item2',
				label: '2nd immutable',
			},
		]),
	};

	return (
		<div>
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
			<p>ActionDropdown with immutable items</p>
			<ActionDropdown {...propsImmutableItems} />
		</div>
	);
}
