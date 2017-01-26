import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { ActionBar } from '../src/index';

const primary = {
	label: 'Primary',
	icon: 'fa fa-asterisk',
	bsStyle: 'primary',
	onClick: action('You clicked me'),
};

const actions = {
	left: [
		primary,
		{
			label: 'Secondary1',
			icon: 'fa fa-asterisk',
			onClick: action('You clicked me'),
		},
		{
			displayMode: 'splitDropdown',
			label: 'Secondary3',
			icon: 'fa fa-plus',
			onClick: action('on split button click'),
			items: [
				{
					label: 'From Local',
					onClick: action('From Local click'),
				},
				{
					label: 'From Remote',
					onClick: action('From Remote click'),
				},
			],
			emptyDropdownLabel: 'No option',
		},
	],
	right: [
		{
			label: 'Secondary4',
			icon: 'fa fa-asterisk',
			onClick: action('You clicked me'),
		},
		{
			label: 'Secondary5',
			icon: 'fa fa-asterisk',
			onClick: action('You clicked me'),
		},
	],
};
const multi3 = {
	label: 'multi3',
	icon: 'fa fa-asterisk',
	onClick: action('You clicked me'),
};

const multiSelectActions = {
	left: [
		{
			label: 'multi1',
			icon: 'fa fa-asterisk',
			onClick: action('You clicked me'),
		},
		{
			label: 'multi2',
			icon: 'fa fa-asterisk',
			onClick: action('You clicked me'),
		},
	],
	right: [
		multi3,
		{
			label: 'multi4',
			icon: 'fa fa-asterisk',
			onClick: action('You clicked me'),
		},
	],
};

const basicProps = {
	actions,
	multiSelectActions,
};

storiesOf('ActionBar', module)
	.addWithInfo('default', () => (
		<nav>
			<p>No Selected, Layout: Left Space Right</p>
			<div id="default">
				<ActionBar {...Object.assign({}, basicProps, { selected: 0 })} />
			</div>
			<p>1 Selected, Layout: Left Space Right</p>
			<div id="selected">
				<ActionBar {...Object.assign({}, basicProps, { selected: 1 })} />
			</div>

			<p>1 Selected, Layout: Right</p>
			<div id="right">
				<ActionBar
					selected={1}
					actions={{ left: [primary] }}
					multiSelectActions={{ right: [multi3] }}
				/>
			</div>
		</nav>
	));
