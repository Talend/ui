import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Toggle } from '../src/index';

const defaultProps = {
	id: 'id1',
	onChange: () => {},
};
const isChecked = {
	id: 'id2',
	onChange: () => {},
	isChecked: true
};
const isDisabled = {
	id: 'id3',
	onChange: () => {},
	isDisabled: true
};
const withLabel = {
	id: 'id4',
	onChange: () => {},
	label: 'Some label'
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

			<h3>Default Toggle</h3>
			<Toggle {...defaultProps} />

			<h3>Toggle with <code>isChecked: true</code></h3>
			<Toggle {...isChecked} />

			<h3>Toggle with <code>isDisabled: true</code></h3>
			<Toggle {...isDisabled} />

			<h3>Toggle with <code>label: 'Some label'</code></h3>
			<Toggle {...withLabel} />
		</div>
	));
