import PropTypes from 'prop-types';
import React from 'react';
import FieldTemplate from '../FieldTemplate';

import { convertValue } from '../../utils/properties';

export default function Text(props) {
	const { id, isValid, errorMessage, onChange, onFinish, schema, value } = props;
	const {
		autoFocus,
		description,
		disabled = false,
		placeholder,
		readOnly = false,
		title,
		type,
	} = schema;

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			labelAfter
			required={schema.required || false}
		>
			<input
				id={id}
				autoFocus={autoFocus}
				className="form-control"
				disabled={disabled}
				label={title}
				onBlur={event => onFinish(event, { schema })}
				onChange={event =>
					onChange(event, { schema, value: convertValue(type, event.target.value) })
				}
				placeholder={placeholder}
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
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
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
	schema: {},
	value: '',
};
