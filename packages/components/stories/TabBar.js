import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TabBar } from '../src/';

const tabProps = {
	id: 'my-tabs',
	items: [
		{
			key: '1',
			label: 'Tab1',
			'data-feature': 'action.1',
		},
		{
			key: '2',
			label: 'Tab2',
			'data-feature': 'action.2',
		},
		{
			key: '3',
			label: 'Tab3',
			'data-feature': 'action.3',
		},
		{
			key: '4',
			label: 'Tab4',
			'data-feature': 'action.4',
		},
		{
			key: '5',
			label: 'Tab5',
			'data-feature': 'action.5',
		},
		{
			key: '6',
			label: 'Tab6',
			'data-feature': 'action.6',
		},
		{
			key: '7',
			label: 'Tab7',
			'data-feature': 'action.7',
		},
		{
			key: '8',
			label: 'Tab8',
			'data-feature': 'action.8',
		},
	],
	onSelect: action('onSelect'),
	selectedKey: '2',
};

function generateChildId(key, kind) {
	if (kind === 'tab') {
		return `my-custom-id-${key}`;
	}
	return null;
}

const InteractiveTabs = props => {
	const [selectedKey, setSelectedKey] = useState('2');

	return (
		<TabBar
			{...props}
			selectedKey={selectedKey}
			onSelect={(event, item) => setSelectedKey(item.key)}
		>
			I'm the child of tab {selectedKey}
		</TabBar>
	);
};

function renderContent() {
	return (
		<div style={{ padding: '1rem 2rem' }}>
			<p>I'm the child</p>
		</div>
	);
}

const stories = storiesOf('TabBar', module);
stories
	.add('default', () => (
		<nav>
			<h3>Default TabBar</h3>
			<div id="default">
				<TabBar {...tabProps}>{renderContent()}</TabBar>
			</div>
			<h3>Default TabBar with too small container</h3>
			<div id="default-smaller" style={{ width: '30rem', border: '1px solid' }}>
				<TabBar {...tabProps}>{renderContent()}</TabBar>
			</div>
			<h3>
				Default TabBar with too small container and <code>responsive = false</code>
			</h3>
			<div id="default-smaller" style={{ width: '47rem', border: '1px solid' }}>
				<TabBar {...tabProps} responsive={false}>
					{renderContent()}
				</TabBar>
			</div>
		</nav>
	))
	.add('custom id generator', () => (
		<nav>
			<h3>TabBar with custom ids</h3>
			<p>
				By default, you pass an id (required for accessibility) to the component and all ids are
				generated.
				<br />
				But you can customize the ids.
				<br />
				The generated id will be passed to the panel as aria-describedby.
				<pre>{`
function generateChildId(key, kind) {
	if (kind === 'tab') {
		return \`my-custom-id-\${key}\`;
	}
}
...
<TabBar
	{...tabProps}
	generateChildId={generateChildId}
>
	I'm the child
</TabBar>
				`}</pre>
			</p>
			<div id="customId">
				<TabBar {...tabProps} generateChildId={generateChildId}>
					I'm the child
				</TabBar>
			</div>
		</nav>
	))
	.add('With existing content', () => (
		<nav>
			<h3>TabBar with custom content</h3>
			<div id="customContent">
				<TabBar {...tabProps} generateChildId={generateChildId} />
				<div id="my-custom-id-1" style={{ display: 'none' }}>
					I'm the existing content of tab 1
				</div>
				<div id="my-custom-id-2">I'm the existing content of tab 2</div>
				<div id="my-custom-id-3" style={{ display: 'none' }}>
					I'm the existing content of tab 3
				</div>
				<div id="my-custom-id-4" style={{ display: 'none' }}>
					I'm the existing content of tab 4
				</div>
				<div id="my-custom-id-5" style={{ display: 'none' }}>
					I'm the existing content of tab 5
				</div>
			</div>
		</nav>
	))
	.add('Fully interactive', () => (
		<nav>
			<h3>Interactive TabBar demo</h3>
			<div id="interactive">
				<InteractiveTabs {...tabProps}>I'm the child</InteractiveTabs>
			</div>
		</nav>
	));
