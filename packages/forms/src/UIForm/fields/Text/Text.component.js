import PropTypes from 'prop-types';
import React from 'react';
import FieldTemplate from '../FieldTemplate';
import { generateDescribedBy } from '../../Message/generateId';

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

	if (type === 'hidden') {
		return <input id={id} type={type} value={value} />;
	}

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			labelAfter
			required={schema.required}
		>
			<input
				id={id}
				autoFocus={autoFocus}
				className="form-control"
				disabled={disabled}
				onBlur={event => onFinish(event, { schema })}
				onChange={event =>
					onChange(event, { schema, value: convertValue(type, event.target.value) })
				}
				placeholder={placeholder}
				readOnly={readOnly}
				type={type}
				value={value}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-invalid={!isValid}
				aria-required={schema.required}
				aria-describedby={generateDescribedBy(id)}
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
