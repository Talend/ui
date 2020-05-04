import React from 'react';
import PropTypes from 'prop-types';

export default function Message(props) {
	const { description, descriptionId, error, errorId } = props;

	return (
		<div className={props.className}>
			<p key="description" className="help-block" id={descriptionId}>
				{error ? '' : description}
			</p>
			<p key="error" className="help-block" role="status" aria-live="assertive" id={errorId}>
				{error}
			</p>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Message.propTypes = {
		className: PropTypes.string,
		description: PropTypes.string,
		descriptionId: PropTypes.string.isRequired,
		error: PropTypes.string,
		errorId: PropTypes.string.isRequired,
	};
}
