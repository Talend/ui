import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import get from 'lodash/get';
import { getTheme } from '../../theme';

import css from './LabelToggle.scss';

const theme = getTheme(css);

const getAutoFocusValue = (autoFocus, values, value) => {
	if (!autoFocus) {
		return null;
	}
	if (value) {
		return get(value, 'value');
	}
	return get(values, ['0', 'value']);
};

/**
 *
 * @param {Array.<Object>} values - buttons that should be rendered
 * @param {string} name - the name attribute for all inputs
 * @param {string} value - the checked value
 * @param {function} onChange - callback that handle the state change
 */
function LabelToggle({ id, values, name, value, onChange, disabled, autoFocus = false }) {
	const localId = id || uuid.v4();
	const handleChange = e => {
		onChange(e.target.value);
	};

	const getButtonId = currentValue => `${localId}-radio-${currentValue}`;
	const autoFocusValue = getAutoFocusValue(autoFocus, values, value);

	return (
		<div className={theme('tc-label-toggle', { 'tc-radio-disabled': disabled })}>
			{values.map(button => (
				<label
					data-feature={button.dataFeature}
					key={button.value}
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
						autoFocus={autoFocusValue === button.value}
					/>
					<span>{button.label}</span>
				</label>
			))}
		</div>
	);
}

LabelToggle.propTypes = {
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	id: PropTypes.string,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
	values: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			dataFeature: PropTypes.string,
		}).isRequired,
	),
};

export default LabelToggle;
