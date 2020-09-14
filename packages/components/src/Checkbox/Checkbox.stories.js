import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Checkbox from '.';

const onChange = action('onChange');

const defaultProps = {
	id: 'id1',
	onChange,
};
const intermediate = {
	id: 'id2',
	onChange,
	intermediate: true,
};
const checked = {
	id: 'id3',
	onChange,
	checked: true,
};
const disabled = {
	id: 'id4',
	onChange,
	disabled: true,
};
const withLabel = {
	id: 'id5',
	onChange,
	label: 'Some label',
};

storiesOf('Form/Controls/Checkbox', module).add('default', () => (
	<div style={{ padding: 30 }}>
		<h1>Checkbox</h1>
		<h2>Definition</h2>
		<p>The Checkbox component is basically a fancy checkbox like you have in your iphone</p>
		<h2>Examples</h2>
		<form>
			<h3>Default Checkbox</h3>
			<Checkbox {...defaultProps} />

			<h3>
				Checkbox with <code>intermediate: true</code>
			</h3>
			<Checkbox {...intermediate} />

			<h3>
				Checkbox with <code>checked: true</code>
			</h3>
			<Checkbox {...checked} />

			<h3>
				Checkbox with <code>disabled: true</code>
			</h3>
			<Checkbox {...disabled} />

			<h3>
				Checkbox with <code>label: Some label</code>
			</h3>
			<Checkbox {...withLabel} />
		</form>
	</div>
));
