import PropTypes from 'prop-types';
import React from 'react';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

import { convertValue } from '../../utils/properties';
import { isUpdating } from '../../utils/updating';

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
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const updating = isUpdating(props.updating, schema);

	return (
		<FieldTemplate
			description={description}
			descriptionId={descriptionId}
			errorId={errorId}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			labelAfter
			required={schema.required}
			updating={updating}
		>
			<input
				id={id}
				autoFocus={autoFocus}
				className="form-control"
				disabled={disabled || updating}
				onBlur={event => onFinish(event, { schema })}
				onChange={event =>
					onChange(event, { schema, value: convertValue(type, event.target.value) })
				}
				placeholder={placeholder}
				readOnly={readOnly}
				type={type}
				value={value}
				min={schema.schema.minimum}
				max={schema.schema.maximum}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-invalid={!isValid}
				aria-required={schema.required}
				aria-describedby={`${descriptionId} ${errorId}`}
			/>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Text.propTypes = {
		updating: PropTypes.arrayOf(PropTypes.string),
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
			schema: PropTypes.object,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

Text.defaultProps = {
	isValid: true,
	schema: {},
	value: '',
};
