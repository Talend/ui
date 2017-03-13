import React, { PropTypes } from 'react';

/**
 * The Checkbox component is basically a fancy checkbox like you have in your iphone.
 * Properties:
 * @param id {string}: the id to be used for htmlFor and maybe QA
 * @param onChange {function}: an event callback called each time the state is changed
 * @param checked {boolean}: sets the state of the Checkbox to be On or Off
 * @param disabled {boolean}: enables the read-only no-interaction mode
 * @param label {string}: a status label to be shown near Checkbox
 *
 * Required: [ id, onChange ]
 * Defaults: { checked: false, disabled: false, label: '' }
 *
 * @return XML(JSX) React pure component
 * **/
function Checkbox({ id, onChange, label, checked, disabled }) {
	return (
		<div className="tc-checkbox checkbox">
			<label htmlFor={id}>
				<input
					type="checkbox"
					id={id}
					onChange={onChange}
					checked={checked}
					disabled={disabled}
				/>
				<span>{label}</span>
			</label>
		</div>
	);
}

Checkbox.defaultProps = {
	disabled: false,
	checked: false,
	label: '',
};

Checkbox.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default Checkbox;
