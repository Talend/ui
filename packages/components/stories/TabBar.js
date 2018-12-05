import React from 'react';
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

class InteractiveTabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selectedKey: '2' };
		this.onSelect = this.onSelect.bind(this);
	}
	onSelect(event, item) {
		this.setState({ selectedKey: item.key });
	}
	render() {
		return (
			<TabBar {...this.props} selectedKey={this.state.selectedKey} onSelect={this.onSelect}>
				I'm the child of tab {this.state.selectedKey}
			</TabBar>
		);
	}
}

const stories = storiesOf('TabBar', module);

stories
	.add('default', () => (
		<nav>
			<h3>Default TabBar</h3>
			<div id="default">
				<TabBar {...tabProps}>I'm the child</TabBar>
			</div>
		</nav>
	))
	.add('custom id generator', () => (
		<nav>
			<h3>TabBar with custom ids</h3>
			<p>
				By default, you pass an id (required for accessibility) to the component and all ids are
				generated.<br />
				But you can customize the ids.<br />
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
				<div id="my-custom-id-1" style={{ display: 'none' }}>I'm the existing content of tab 1</div>
				<div id="my-custom-id-2">I'm the existing content of tab 2</div>
				<div id="my-custom-id-3" style={{ display: 'none' }}>I'm the existing content of tab 3</div>
				<div id="my-custom-id-4" style={{ display: 'none' }}>I'm the existing content of tab 4</div>
				<div id="my-custom-id-5" style={{ display: 'none' }}>I'm the existing content of tab 5</div>
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
