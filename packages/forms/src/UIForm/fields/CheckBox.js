import React, { PropTypes } from 'react';
import FieldTemplate from './FieldTemplate';

export default function CheckBox(props) {
	const { id, isValid, errorMessage, onChange, schema, value } = props;
	const { autoFocus, description, disabled, title, type } = schema;

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			isValid={isValid}
			type={type}
		>
			<label>
				<input
					id={id}
					autoFocus={autoFocus}
					disabled={disabled}
					label={title}
					onChange={event => onChange(event, schema, event.target.checked)}
					type="checkbox"
					checked={value}
				/>
				<span className="control-label" htmlFor={id}>{title}</span>
			</label>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	CheckBox.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
		value: PropTypes.bool,
	};
}
CheckBox.defaultProps = {
	isValid: true,
	value: false,
};
