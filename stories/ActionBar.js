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
	],
	right: [
		{
			label: 'Secondary2',
			icon: 'fa fa-asterisk',
			onClick: action('You clicked me'),
		},
		{
			label: 'Secondary3',
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

storiesOf('Actionbar', module)
	.addWithInfo('default', () => (
		<nav>
			<h1>Actionbar</h1>
			<h2>Definition</h2>
			<p>The actionbar component display a group buttons to let the user dispatch actions</p>
			<h2>Examples</h2>
			<p>No Selected, Layout: Left Space Right</p>
			<ActionBar {...Object.assign({}, basicProps, { selected: 0 })} />

			<p>1 Selected, Layout: Left Space Right</p>
			<ActionBar {...Object.assign({}, basicProps, { selected: 1 })} />

			<p>1 Selected, Layout: Right</p>
			<ActionBar
				selected={1}
				actions={{ left: [primary] }}
				multiSelectActions={{ right: [multi3] }}
			/>

		</nav>
	));
