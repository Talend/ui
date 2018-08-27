import PropTypes from 'prop-types';
import React from 'react';
import { generateErrorId, generateDescriptionId } from './generateId';

export default function Message(props) {
	const { id, errorMessage, description, isValid } = props;

	return (
		<div>
			<p key="description" className="help-block" id={generateDescriptionId(id)}>
				{isValid ? description : ''}
			</p>
			<p
				key="error"
				className="help-block"
				role="status"
				aria-live="assertive"
				id={generateErrorId(id)}
			>
				{isValid ? '' : errorMessage}
			</p>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Message.propTypes = {
		errorMessage: PropTypes.string,
		description: PropTypes.string,
		id: PropTypes.string.isRequired,
		isValid: PropTypes.bool,
	};
}
