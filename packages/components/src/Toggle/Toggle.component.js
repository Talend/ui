import React, { PropTypes } from 'react';
import classNames from 'classnames';

/**
 * The Toggle component is basically a fancy checkbox like you have in your iphone.
 * Properties:
 * @param id {string}: the id to be used for htmlFor and maybe QA
 * @param isChecked {boolean}: sets the state of the toggle to be On or Off
 * @param isDisabled {boolean}: enables the read-only no-interaction mode
 * @param onChange {function}: an event callback called each time the state is changed
 * @param label {string}: a status label to be shown near toggle
 *
 * Required: [ id, onChange ]
 * Defaults: { isChecked: false, isDisabled: false }
 *
 * @return XML(JSX) React pure component
 * **/
function Toggle({ id, isChecked, isDisabled, onChange, label, children }) {
	return (
		<div className="tc-toggle switch checkbox">
			<label htmlFor={id}>
				<input
					type="checkbox"
					id={id}
					onChange={onChange}
					checked={isChecked}
					disabled={isDisabled}
				/>
				<span>{label || children}</span>
			</label>
		</div>
	);
}

Toggle.propTypes = {
	id: PropTypes.string.isRequired,
	isChecked: PropTypes.bool,
	isDisabled: PropTypes.bool,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	children: PropTypes.node,
};

Toggle.defaultProps = {
	isChecked: false,
	isDisabled: false,
};

export default Toggle;
