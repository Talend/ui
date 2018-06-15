import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';

import { ActionBar, FilterBar, IconsProvider } from '../src/';

const propsDockToggle = {
	id: 'FILTER-dockAndDockable',
	dockable: true,
	docked: false,
	navbar: true,
	onFilter: action('onFilter'),
	onBlur: action('onBlur'),
	onFocus: action('onFocus'),
	onToggle: action('onToggle'),
	placeholder: 'My placeholder',
	highlight: false,
	tooltipPlacement: 'bottom',
};

const propsIconAlwaysVisble = Object.assign({}, propsDockToggle, {
	iconAlwaysVisible: true,
	dockable: false,
});

const propsNoDockToggle = {
	id: 'FILTER-noDockAndNoDockable',
	dockable: false,
	docked: false,
	navbar: false,
	onFilter: action('onFilter'),
	onBlur: action('onBlur'),
	onFocus: action('onFocus'),
	onToggle: action('onToggle'),
	placeholder: 'My placeholder',
	tooltipPlacement: 'bottom',
	highlight: false,
};

const stories = storiesOf('FilterBar', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

const divStyle = {
	width: '30rem',
};

stories
	.addDecorator(checkA11y)
	.addWithInfo('default-dock and dockable', () => (
		<div style={divStyle}>
			<IconsProvider />
			<p>When not docked but dockable in an ActionBar</p>
			<ActionBar>
				<FilterBar {...propsDockToggle} />
			</ActionBar>
		</div>
	))
	.addWithInfo('no docked, no dockable and icon visible', () => (
		<div style={divStyle}>
			<IconsProvider />
			<p>When icon always visible and not docked, no dockable in an ActionBar</p>
			<ActionBar>
				<FilterBar {...propsIconAlwaysVisble} />
			</ActionBar>
		</div>
	))
	.addWithInfo('custom-undock no dockable', () => (
		<div>
			<IconsProvider />
			<p>When not docked and no dockable take full width</p>
			<FilterBar {...propsNoDockToggle} />
		</div>
	));
