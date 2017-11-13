import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { ActionSplitDropdown } from '../src';

export default function ExampleAction() {
	return (
		<div>
			<IconsProvider />
			<p>ActionSplitDropdown with items in the settings</p>
			<ActionSplitDropdown actionId="menu:items-id" />
			<p>ActionSplitDropdown with items from an expression</p>
			<ActionSplitDropdown actionId="menu:items" />
			<p>ActionSplitDropdown from setting and items from props</p>
			<ActionSplitDropdown actionId="menu:first" actionIds={['menu:first', 'menu:second']} />
		</div>
	);
}
