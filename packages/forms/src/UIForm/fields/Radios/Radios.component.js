/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
import { isUpdating } from '../../utils/updating';

export default function Radios({
	id,
	isValid,
	errorMessage,
	onChange,
	onFinish,
	schema,
	value,
	updating,
}) {
	const { autoFocus, description, disabled = false, inline, title } = schema;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const updatingValue = isUpdating(updating, schema);
	const radioClassNames = classNames({
		radio: !inline,
		'radio-inline': inline,
	});
	return (
		<FieldTemplate
			description={description}
			descriptionId={descriptionId}
			errorId={errorId}
			errorMessage={errorMessage}
			isValid={isValid}
			label={title}
			required={schema.required}
			updating={updatingValue}
		>
			{schema.titleMap &&
				schema.titleMap.map((option, index) => (
					<div className={radioClassNames} key={index}>
						<label>
							<input
								id={`${id}-${index}`}
								autoFocus={autoFocus}
								checked={option.value === value}
								disabled={disabled || updatingValue}
								name={id}
								onBlur={event => onFinish(event, { schema })}
								onChange={event => onChange(event, { schema, value: option.value })}
								type={'radio'}
								value={option.value}
								// eslint-disable-next-line jsx-a11y/aria-proptypes
								aria-invalid={!isValid}
								aria-describedby={`${descriptionId} ${errorId}`}
							/>
							<span>{option.name}</span>
						</label>
					</div>
				))}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Radios.propTypes = {
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
			inline: PropTypes.bool,
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
			),
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

Radios.defaultProps = {
	isValid: true,
	schema: {},
};
