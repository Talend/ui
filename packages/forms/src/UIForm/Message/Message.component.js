import React from 'react';
import PropTypes from 'prop-types';

export default function Message(props) {
	const { description, descriptionId, errorId, errorMessage, isValid } = props;

	return (
		<div>
			<p key="description" className="help-block" id={descriptionId}>
				{isValid ? description : ''}
			</p>
			<p key="error" className="help-block" role="status" aria-live="assertive" id={errorId}>
				{isValid ? '' : errorMessage}
			</p>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Message.propTypes = {
		description: PropTypes.string,
		descriptionId: PropTypes.string.isRequired,
		errorId: PropTypes.string.isRequired,
		errorMessage: PropTypes.string,
		isValid: PropTypes.bool,
	};
}
