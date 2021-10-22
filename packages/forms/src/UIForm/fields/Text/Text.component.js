/* eslint-disable jsx-a11y/no-autofocus */

import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import { Link } from '@talend/design-system';
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
		labelProps,
		link = null,
		placeholder,
		readOnly = false,
		title,
		type,
		...rest
	} = schema;

	if (type === 'hidden') {
		return <input id={id} type={type} value={value} />;
	}
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const fieldProps = {
		id,
		autoComplete,
		autoFocus,
		className: 'form-control',
		disabled: disabled || valueIsUpdating,
		onBlur: event => onFinish(event, { schema }),
		onChange: event => onChange(event, { schema, value: convertValue(type, event.target.value) }),
		placeholder,
		readOnly,
		type,
		value,
		min: get(schema, 'schema.minimum'),
		max: get(schema, 'schema.maximum'),
		step: get(schema, 'schema.step'),
		...extractDataAttributes(rest),
	};

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
					{...fieldProps}
					aria-invalid={!isValid}
					aria-required={get(schema, 'required')}
					aria-describedby={`${descriptionId} ${errorId}`}
					link={
						link && (
							<Link href={link.url} aria-label={link.ariaLabel}>
								{link.label}
							</Link>
						)
					}
				/>
			) : (
				<input
					{...fieldProps}
					aria-invalid={!isValid}
					aria-required={get(schema, 'required')}
					aria-describedby={`${descriptionId} ${errorId}`}
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
			link: PropTypes.shape({
				url: PropTypes.string,
				label: PropTypes.string,
				ariaLabel: PropTypes.string,
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
