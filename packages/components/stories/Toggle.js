import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Toggle } from '../src/index';

const onChange = action('onChange');

const defaultProps = {
	id: 'id1',
	onChange,
};
const checked = {
	id: 'id2',
	onChange,
	checked: true,
};
const disabled = {
	id: 'id3',
	onChange,
	disabled: true,
};
const withLabel = {
	id: 'id4',
	onChange,
	label: 'Some label',
};


storiesOf('Toggle', module)
	.addWithInfo('default', () => (
		<div>
			<h1>Toggle</h1>
			<h2>Definition</h2>
			<p>
				The Toggle component is basically a fancy checkbox like you have in your iphone
			</p>
			<h2>Examples</h2>
			<form>
				<h3>Default Toggle</h3>
				<Toggle {...defaultProps}>On/Off</Toggle>

				<h3>Toggle with <code>checked: true</code></h3>
				<Toggle {...checked} />

				<h3>Toggle with <code>disabled: true</code></h3>
				<Toggle {...disabled} />

				<h3>Toggle with <code>label: 'Some label'</code></h3>
				<Toggle {...withLabel} />
			</form>
		</div>
	));
