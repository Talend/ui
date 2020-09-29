import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Toggle from './Toggle.component';

const onChange = action('onChange');
const onBlur = action('onBlur');

const defaultProps = {
	id: 'id1',
	onBlur,
	onChange,
};
const checked = {
	id: 'id2',
	onBlur,
	onChange,
	checked: true,
};
const disabled = {
	id: 'id3',
	onBlur,
	onChange,
	disabled: true,
};
const withLabel = {
	id: 'id4',
	onBlur,
	onChange,
	label: 'Some label',
};

const labelToggleProps = {
	values: [
		{ value: 'val1', label: 'Value 1' },
		{ value: 'val2', label: 'Value 2' },
		{ value: 'val3', label: 'Value 3' },
	],
};

const InteractiveLabelToggle = ({ defaultValue = '', name, autoFocus }) => {
	const [value, setValue] = useState(defaultValue);

	return (
		<Toggle.Label
			{...labelToggleProps}
			value={value}
			onChange={setValue}
			name={name}
			autoFocus={autoFocus}
		/>
	);
};
InteractiveLabelToggle.propTypes = {
	defaultValue: PropTypes.string,
	autoFocus: PropTypes.bool,
	name: PropTypes.string.isRequired,
};

storiesOf('Form/Controls/Toggle', module)
	.add('default', () => (
		<div>
			<h1>Toggle</h1>
			<h2>Definition</h2>
			<p>The Toggle component is basically a fancy checkbox like you have in your iphone</p>
			<h2>Examples</h2>
			<form>
				<h3>Default Toggle</h3>
				<Toggle {...defaultProps} />

				<h3>
					Toggle with <code>checked: true</code>
				</h3>
				<Toggle {...checked} />

				<h3>
					Toggle with <code>disabled: true</code>
				</h3>
				<Toggle {...disabled} />

				<h3>
					Toggle with <code>label: 'Some label'</code>
				</h3>
				<Toggle {...withLabel} />
			</form>
		</div>
	))
	.add('Label toggle', () => (
		<div>
			<h1>Label Toggle</h1>
			<form>
				<h3>Non interactive two states</h3>
				<Toggle.Label
					name="toggle1"
					values={[
						{ value: 'basic', label: 'Basic' },
						{ value: 'advanced', label: 'Advanced' },
					]}
					value="advanced"
					onChange={onChange}
				/>
				<h3>Interactive</h3>
				<InteractiveLabelToggle name="toggle2" />
				<h3>Interactive autofocused</h3>
				<InteractiveLabelToggle name="toggle3" autoFocus />
				<h3>Interactive with default selected value</h3>
				<InteractiveLabelToggle defaultValue="val3" name="toggle4" />
				<h3>Disabled with selected value</h3>
				<Toggle.Label
					{...labelToggleProps}
					value="val2"
					disabled
					name="toggle5"
					onChange={onChange}
				/>
			</form>
		</div>
	));
