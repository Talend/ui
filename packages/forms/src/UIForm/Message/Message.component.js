import React, { PropTypes } from 'react';

export default function Message(props) {
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

if (process.env.NODE_ENV !== 'production') {
	Message.propTypes = {
		errorMessage: PropTypes.string,
		description: PropTypes.string,
		isValid: PropTypes.bool,
	};
}
