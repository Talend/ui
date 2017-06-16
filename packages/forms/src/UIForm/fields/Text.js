import React, { PropTypes } from 'react';
import FieldTemplate from './FieldTemplate';

function convertValue(type, value) {
	if (type === 'number') {
		return parseFloat(value);
	}
	return value;
}

export default function Text(props) {
	const { id, isValid, errorMessage, onChange, schema, value } = props;
	const { autoFocus, description, disabled, placeholder, readOnly, title, type } = schema;

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			labelAfter={title}
		>
			<input
				id={id}
				autoFocus={autoFocus}
				className="form-control"
				disabled={disabled}
				label={title}
				placeholder={placeholder}
				onChange={event => onChange(event, schema, convertValue(type, event.target.value))}
				readOnly={readOnly}
				type={type}
				value={value}
			/>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Text.propTypes = {
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
Text.defaultProps = {
	isValid: true,
	value: '',
};
