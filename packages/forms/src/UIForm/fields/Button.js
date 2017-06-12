import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Message from '../Message';

export default function Button(props) {
	const { id, errorMessage, isValid, onTrigger, schema } = props;
	const { description, title, triggers, type } = schema;

	return (
		<div className={classNames({ 'has-error': !isValid })} >
			<button
				id={id}
				className={'btn'}
				onClick={event => onTrigger(event, triggers[0], schema)}
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
		onTrigger: PropTypes.func,
		schema: PropTypes.shape({
			description: PropTypes.string,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
	};
}
