import PropTypes from 'prop-types';
import React from 'react';

export default function Message(props) {
	const {
		errorMessage,
		description,
		isValid,
	} = props;

	const message = isValid ? description : errorMessage;
	return message ?
		(
			<p
				className="help-block"
				role="status"
			>
				{ message }
			</p>
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
