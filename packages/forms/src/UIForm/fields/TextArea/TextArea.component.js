import React, { PropTypes } from 'react';
import FieldTemplate from '../FieldTemplate';

export default function TextArea({ id, isValid, errorMessage, onChange, schema, value }) {
	const {
		autoFocus,
		description,
		disabled,
		key,
		placeholder,
		readOnly,
		rows = 5,
		title,
	} = schema;

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			labelAfter
		>
			<textarea
				id={id}
				autoFocus={autoFocus}
				className="form-control"
				disabled={disabled}
				name={key[key.length - 1]}
				placeholder={placeholder}
				onChange={event => onChange(event, { schema, value: event.target.value })}
				readOnly={readOnly}
				rows={rows}
				value={value}
			/>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextArea.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			key: PropTypes.arrayOf(PropTypes.string),
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			rows: PropTypes.number,
			title: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

TextArea.defaultProps = {
	isValid: true,
	schema: {},
	value: '',
};
