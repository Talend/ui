import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ActionBar from '../ActionBar';
import IconsProvider from '../IconsProvider';
import FilterBar from './FilterBar.component';

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

const propsIconAlwaysVisble = { ...propsDockToggle, iconAlwaysVisible: true, dockable: false };

const propsNoDockToggle = {
	id: 'FILTER-noDockAndNoDockable',
	dockable: false,
	docked: false,
	navbar: false,
	onFilter: action('onFilter'),
	onBlur: action('onBlur'),
	onFocus: action('onFocus'),
	onToggle: action('onToggle'),
	placeholder: 'Type your filter term',
	tooltipPlacement: 'bottom',
	highlight: false,
};

const propsDisabled = { ...propsDockToggle, disabled: true };

const divStyle = {
	width: '30rem',
};

storiesOf('Form/Inline form/FilterBar', module)
	.add('default-dock and dockable', () => (
		<div style={divStyle}>
			<IconsProvider bundles={[`${location.origin}${location.pathname}all.svg`]} />
			<p>When not docked but dockable in an ActionBar</p>
			<ActionBar>
				<FilterBar {...propsDockToggle} />
			</ActionBar>
		</div>
	))
	.add('no docked, no dockable and icon visible', () => (
		<div style={divStyle}>
			<IconsProvider bundles={[`${location.origin}${location.pathname}all.svg`]} />
			<p>When icon always visible and not docked, no dockable in an ActionBar</p>
			<ActionBar>
				<FilterBar {...propsIconAlwaysVisble} />
			</ActionBar>
		</div>
	))
	.add('custom-undock no dockable', () => (
		<div>
			<IconsProvider bundles={[`${location.origin}${location.pathname}all.svg`]} />
			<p>When not docked and no dockable take full width</p>
			<FilterBar {...propsNoDockToggle} />
		</div>
	))
	.add('disabled input', () => (
		<div style={divStyle}>
			<IconsProvider bundles={[`${location.origin}${location.pathname}all.svg`]} />
			<p>With the input filter disable</p>
			<ActionBar>
				<FilterBar {...propsDisabled} />
			</ActionBar>
		</div>
	));
