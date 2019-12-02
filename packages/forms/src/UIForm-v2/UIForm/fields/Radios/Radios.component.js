/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

export default function Radios({
	id,
	isValid,
	errorMessage,
	onChange,
	onFinish,
	schema,
	value,
	valueIsUpdating,
}) {
	const { autoFocus, description, disabled = false, inline, title } = schema;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const radioClassNames = classNames({
		radio: !inline,
		'radio-inline': inline,
		disabled,
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
			valueIsUpdating={valueIsUpdating}
		>
			{schema.titleMap &&
				schema.titleMap.map((option, index) => (
					<div className={radioClassNames} key={index}>
						<label>
							<input
								id={`${id}-${index}`}
								autoFocus={autoFocus}
								checked={option.value === value}
								disabled={disabled || valueIsUpdating}
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
		valueIsUpdating: PropTypes.bool,
	};
}

Radios.defaultProps = {
	isValid: true,
	schema: {},
};
