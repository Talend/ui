import React from 'react';
import PropTypes from 'prop-types';

import { InlineMessage } from '@talend/react-components';

export default function Message(props) {
	const { description, descriptionId, errorId, errorMessage, isValid } = props;

	return (
		<div className={props.className}>
			{isValid ? description && (
				<InlineMessage
					id={descriptionId}
					description={description}
					small
				/>
			) : errorMessage && (
				<InlineMessage
					id={errorId}
					type={InlineMessage.TYPES.ERROR}
					description={errorMessage}
					small
				/>
			)}
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Message.propTypes = {
		className: PropTypes.string,
		description: PropTypes.string,
		descriptionId: PropTypes.string.isRequired,
		errorId: PropTypes.string.isRequired,
		errorMessage: PropTypes.string,
		isValid: PropTypes.bool,
	};
}
