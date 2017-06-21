import React, { PropTypes } from 'react';

import FieldTemplate from './FieldTemplate';

export default function Button(props) {
	const { id, errorMessage, isValid, onTrigger, schema } = props;
	const { description, title, triggers, type } = schema;

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
		>
			<button
				id={id}
				className={'btn'}
				onClick={event => onTrigger(event, triggers[0], schema)}
				type={type || 'button'}
			>
				{title}
			</button>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Button.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onTrigger: PropTypes.func,
		schema: PropTypes.shape({
			description: PropTypes.string,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
	};
}
