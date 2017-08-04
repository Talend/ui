import React from 'react';
import { // eslint-disable-line import/no-extraneous-dependencies
	storiesOf,
	action,
} from '@storybook/react';

import { TabBar } from '../src/';

const props = {
	items: [
		{
			id: 'tab-bar-action-1',
			key: '1',
			label: 'Tab1',
		},
		{
			id: 'tab-bar-action-2',
			key: '2',
			label: 'Tab2',
		},
		{
			id: 'tab-bar-action-3',
			key: '3',
			label: 'Tab3',
		},
	],
	onSelect: action('onSelect'),
	selected: '2',
};

const stories = storiesOf('TabBar', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addWithInfo('default', () => (
		<nav>
			<p>Default TabBar</p>
			<div id="default">
				<TabBar {...props} />
			</div>
		</nav>
	));
