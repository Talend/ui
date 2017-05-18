import React, { PropTypes } from 'react';

import Message from '../Message';

export default function Button(props) {
	const { id, errorMessage, isValid, onChange, schema } = props;
	const { description, title, type } = schema;

	return (
		<div className={isValid ? null : 'has-error'}>
			<button
				id={id}
				className={'btn'}
				onClick={event => onChange(event, schema)}
				type={type}
			>
				{title}
			</button>
			<Message
				errorMessage={errorMessage}
				description={description}
				isValid={isValid}
			/>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Button.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func,
		schema: PropTypes.shape({
			description: PropTypes.string,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
	};
}
