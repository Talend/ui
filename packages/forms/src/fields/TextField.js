import React, { PropTypes } from 'react';
import classNames from 'classnames';

import FieldMessage from '../FieldMessage';

function convertValue(type, value) {
	if (type === 'number') {
		return parseFloat(value);
	}
	return value;
}

export default function TextField(props) {
	const { id, isValid, errorMessage, onChange, schema, value } = props;
	const { description, placeholder, readOnly, title, type } = schema;

	const groupsClassNames = classNames(
		'form-group',
		{ 'has-error': !isValid },
	);
	return (
		<div className={groupsClassNames}>
			<input
				id={id}
				className="form-control"
				label={title}
				placeholder={placeholder}
				onChange={event => onChange(event, schema, convertValue(type, event.target.value))}
				readOnly={readOnly}
				type={type}
				value={value}
			/>
			<label htmlFor={id} className="control-label">{title}</label>
			<FieldMessage
				errorMessage={errorMessage}
				description={description}
				isValid={isValid}
			/>
		</div>
	);
}

TextField.propTypes = {
	id: PropTypes.string,
	isValid: PropTypes.bool,
	errorMessage: PropTypes.string,
	onChange: PropTypes.func,
	schema: PropTypes.shape({
		description: PropTypes.string,
		placeholder: PropTypes.string,
		readOnly: PropTypes.bool,
		title: PropTypes.string,
		type: PropTypes.string,
	}),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
TextField.defaultProps = {
	isValid: true,
	value: '',
};
