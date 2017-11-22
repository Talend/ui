import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { ActionDropdown } from '../src';

export default function ExampleAction() {
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
		</div>
	);
}
