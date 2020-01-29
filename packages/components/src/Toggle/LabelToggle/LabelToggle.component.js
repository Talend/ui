import React from 'react';
import PropTypes from 'prop-types';
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
function LabelToggle({ buttons, name, checked, onChange }) {
	const handleChange = e => {
		onChange(e.target.value);
	};

	return (
		<div className={theme('radio-toolbar')}>
			{buttons.map(button => (
				<React.Fragment key={`radio${button.value}`}>
					<input
						id={`radio${button.value}`}
						type="radio"
						value={button.value}
						checked={checked === button.value}
						name={name}
						onChange={e => handleChange(e)}
					/>
					<label htmlFor={`radio${button.value}`}>{button.label}</label>
				</React.Fragment>
			))}
		</div>
	);
}

LabelToggle.propTypes = {
	buttons: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
	),
	name: PropTypes.string.isRequired,
	checked: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default LabelToggle;
