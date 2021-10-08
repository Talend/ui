import React from 'react';

import { ActionSplitDropdown } from '../src';

export default function ExampleAction() {
	return (
		<div>
			<p>ActionSplitDropdown with items in the settings</p>
			<ActionSplitDropdown actionId="menu:items-id" />
			<p>ActionSplitDropdown with items from an expression</p>
			<ActionSplitDropdown actionId="menu:items" />
			<p>ActionSplitDropdown from setting and items from props</p>
			<ActionSplitDropdown actionId="menu:first" actionIds={['menu:first', 'menu:second']} />
			<p>ActionDropdown from setting and a link into the items</p>
			<ActionSplitDropdown actionId="menu:dropdown-href" />
		</div>
	);
}
