import React from 'react';
import {
	// eslint-disable-line import/no-extraneous-dependencies
	storiesOf,
	action,
} from '@storybook/react';

import { Filter, IconsProvider } from '../src/';

const propsDockToggle = {
	id: 'FILTER-dockAndToggle',
	docked: false,
	navbar: true,
	toggeable: true,
	onFilter: action('onFilter'),
	onBlur: action('onBlur'),
	onFocus: action('onFocus'),
	onToggle: action('onToggle'),
	placeholder: 'My placeholder',
	highlight: false,
};

const propsNoDockToggle = {
	id: 'FILTER-noDockAndNoToggle',
	docked: false,
	navbar: false,
	toggeable: false,
	onFilter: action('onFilter'),
	onBlur: action('onBlur'),
	onFocus: action('onFocus'),
	onToggle: action('onToggle'),
	placeholder: 'My placeholder',
	highlight: false,
};

const stories = storiesOf('Filter', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

const divStyle = {
	width: '30rem',
};

stories
	.addWithInfo('default-dock and toggle', () => (
		<nav>
			<div style={divStyle}>
				<IconsProvider />
				<Filter {...propsDockToggle} />
			</div>
		</nav>
	))
	.addWithInfo('custom-undock no toggle', () => (
		<div>
			<IconsProvider />
			<Filter {...propsNoDockToggle} />
		</div>
	));
