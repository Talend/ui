import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { getTheme } from '../../theme';

import css from './LabelToggle.scss';

const theme = getTheme(css);

/**
 *
 * @param {Array.<Object>} buttons - buttons that should be rendered
 * @param {string} name - the name attribute for all inputs
 * @param {string} checked - the checked value
 * @param {function} onChange - callback that handle the state change
 */
function LabelToggle({ id, values, name, value, onChange, disabled }) {
	const localId = id || uuid.v4();
	const handleChange = e => {
		onChange(e.target.value);
	};

	const getButtonId = currentValue => `${localId}-radio-${currentValue}`;

	return (
		<div className={theme('tc-label-toggle', { 'tc-radio-disabled': disabled })}>
			{values.map(button => (
				<label
					key={`radio${button.value}`}
					htmlFor={getButtonId(button.value)}
					className={theme({
						'tc-radio-selected': value === button.value,
					})}
				>
					<input
						id={getButtonId(button.value)}
						type="radio"
						value={button.value}
						checked={value === button.value}
						name={name}
						disabled={disabled}
						onChange={e => handleChange(e)}
					/>
					<span>{button.label}</span>
				</label>
			))}
		</div>
	);
}

LabelToggle.propTypes = {
	values: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
	),
	id: PropTypes.string,
	disabled: PropTypes.bool,
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default LabelToggle;
