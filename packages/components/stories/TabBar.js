import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';

import { TabBar } from '../src/';

const props = {
	items: [
		{
			id: 'tab-bar-action-1',
			key: '1',
			label: 'Tab1',
			'data-feature': 'action.1',
		},
		{
			id: 'tab-bar-action-2',
			key: '2',
			label: 'Tab2',
			'data-feature': 'action.2',
		},
		{
			id: 'tab-bar-action-3',
			key: '3',
			label: 'Tab3',
			'data-feature': 'action.3',
		},
	],
	onSelect: action('onSelect'),
	selectedKey: '2',
};

const stories = storiesOf('TabBar', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addDecorator(checkA11y)
	.addWithInfo('default', () => (
		<nav>
			<p>Default TabBar</p>
			<div id="default">
				<TabBar {...props} />
			</div>
		</nav>
	));
