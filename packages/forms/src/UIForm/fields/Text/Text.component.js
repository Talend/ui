/* eslint-disable jsx-a11y/no-autofocus */

import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
import PasswordWidget from './PasswordWidget';

import { convertValue, extractDataAttributes } from '../../utils/properties';

export default function Text(props) {
	const { id, isValid, errorMessage, onChange, onFinish, schema, value, valueIsUpdating } = props;
	const {
		autoComplete,
		autoFocus,
		description,
		disabled = false,
		placeholder,
		readOnly = false,
		title,
		labelProps,
		type,
		...rest
	} = schema;

	if (type === 'hidden') {
		return <input id={id} type={type} value={value} />;
	}
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	return (
		<FieldTemplate
			hint={schema.hint}
			className={schema.className}
			description={description}
			descriptionId={descriptionId}
			errorId={errorId}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			labelProps={labelProps}
			required={schema.required}
			valueIsUpdating={valueIsUpdating}
		>
			{type === 'password' ? (
				<PasswordWidget
					id={id}
					autoComplete={autoComplete}
					autoFocus={autoFocus}
					className="form-control"
					disabled={disabled || valueIsUpdating}
					onBlur={event => onFinish(event, { schema })}
					onChange={event =>
						onChange(event, { schema, value: convertValue(type, event.target.value) })
					}
					placeholder={placeholder}
					readOnly={readOnly}
					type={type}
					value={value}
					min={get(schema, 'schema.minimum')}
					max={get(schema, 'schema.maximum')}
					step={get(schema, 'schema.step')}
					// eslint-disable-next-line jsx-a11y/aria-proptypes
					aria-invalid={!isValid}
					aria-required={get(schema, 'required')}
					aria-describedby={`${descriptionId} ${errorId}`}
					{...extractDataAttributes(rest)}
				/>
			) : (
				<input
					id={id}
					autoComplete={autoComplete}
					autoFocus={autoFocus}
					className="form-control"
					disabled={disabled || valueIsUpdating}
					onBlur={event => onFinish(event, { schema })}
					onChange={event =>
						onChange(event, { schema, value: convertValue(type, event.target.value) })
					}
					placeholder={placeholder}
					readOnly={readOnly}
					type={type}
					value={value}
					min={get(schema, 'schema.minimum')}
					max={get(schema, 'schema.maximum')}
					step={get(schema, 'schema.step')}
					// eslint-disable-next-line jsx-a11y/aria-proptypes
					aria-invalid={!isValid}
					aria-required={get(schema, 'required')}
					aria-describedby={`${descriptionId} ${errorId}`}
					{...extractDataAttributes(rest)}
				/>
			)}
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
			className: PropTypes.string,
			autoComplete: PropTypes.string,
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			required: PropTypes.bool,
			title: PropTypes.string,
			labelProps: PropTypes.object,
			hint: PropTypes.shape({
				icon: PropTypes.string,
				className: PropTypes.string,
				overlayComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
				overlayPlacement: PropTypes.string,
			}),
			type: PropTypes.string,
			schema: PropTypes.object,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		valueIsUpdating: PropTypes.bool,
	};
}

Text.defaultProps = {
	isValid: true,
	schema: {},
	value: '',
};
