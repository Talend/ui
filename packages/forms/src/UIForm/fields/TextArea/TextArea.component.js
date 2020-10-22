/* eslint-disable jsx-a11y/no-autofocus */

import PropTypes from 'prop-types';
import React from 'react';
import CoralForm from '@talend/design-system/lib/components/Form';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

export default function TextArea({
	id,
	isValid,
	errorMessage,
	onChange,
	onFinish,
	schema,
	value,
	valueIsUpdating,
}) {
	const {
		autoFocus,
		description,
		disabled = false,
		placeholder,
		readOnly = false,
		rows = 5,
		title,
	} = schema;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	return (<CoralForm.Textarea
		id={id}
		label={title}
		required={schema.required}
		autoFocus={autoFocus}
		className="form-control"
		disabled={disabled || valueIsUpdating}
		placeholder={placeholder}
		onBlur={event => onFinish(event, { schema })}
		onChange={event => onChange(event, { schema, value: event.target.value })}
		readOnly={readOnly}
		rows={rows}
		value={value}
		// eslint-disable-next-line jsx-a11y/aria-proptypes
		aria-invalid={!isValid}
		aria-required={schema.required}
		aria-describedby={`${descriptionId} ${errorId}`}
	/>);
}

if (process.env.NODE_ENV !== 'production') {
	TextArea.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			className: PropTypes.string,
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			required: PropTypes.bool,
			rows: PropTypes.number,
			title: PropTypes.string,
			hint: PropTypes.shape({
				icon: PropTypes.string,
				className: PropTypes.string,
				overlayComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
				overlayPlacement: PropTypes.string,
			}),
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		valueIsUpdating: PropTypes.bool,
	};
}

TextArea.defaultProps = {
	isValid: true,
	schema: {},
	value: '',
};
