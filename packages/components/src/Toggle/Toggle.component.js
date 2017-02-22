import React, { PropTypes } from 'react';
import theme from './Toggle.scss';

const Toggle = ({ id, isChecked, isDisabled, onChange, label }) => (
	<div className={theme['tc-toggle']}>
		<input
			type="checkbox"
			id={id}
			className={theme['tc-toggle-model']}
			onChange={onChange}
			checked={isChecked}
			disabled={isDisabled}
		/>
		<label htmlFor={id} className={theme['tc-toggle-element']} />
		{label && <label htmlFor={id} className={theme['tc-toggle-status-label']}>{label}</label>}
	</div>
);

Toggle.propTypes = {
	id: PropTypes.string.isRequired,
	isChecked: PropTypes.bool,
	isDisabled: PropTypes.bool,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

Toggle.defaultProps = {
	isChecked: false,
	isDisabled: false,
};

export default Toggle;
