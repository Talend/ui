import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Message from '../Message';

export default function TextArea(props) {
	const { id, isValid, errorMessage, onChange, schema, value } = props;
	const { autoFocus, description, disabled, placeholder, readOnly, title, type } = schema;

	const groupsClassNames = classNames(
		'form-group',
		{ 'has-error': !isValid },
	);
	return (
		<div className={groupsClassNames}>
			<textarea
				id={id}
				autoFocus={autoFocus}
				className="form-control"
				disabled={disabled}
				label={title}
				placeholder={placeholder}
				onChange={event => onChange(event, schema, event.target.value)}
				readOnly={readOnly}
				type={type}
				value={value}
			/>
			<label htmlFor={id} className="control-label">{title}</label>
			<Message
				errorMessage={errorMessage}
				description={description}
				isValid={isValid}
			/>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextArea.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}
TextArea.defaultProps = {
	isValid: true,
	value: '',
};
