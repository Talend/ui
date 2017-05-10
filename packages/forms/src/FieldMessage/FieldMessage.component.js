import React, { PropTypes } from 'react';

export default function FieldMessage(props) {
	const {
		errorMessage,
		description,
		isValid,
	} = props;

	const message = isValid ? description : errorMessage;
	return message ?
		(
			<div className="help-block">
				{ message }
			</div>
		) :
		null;
}

FieldMessage.propTypes = {
	errorMessage: PropTypes.string,
	description: PropTypes.string,
	isValid: PropTypes.bool,
};
