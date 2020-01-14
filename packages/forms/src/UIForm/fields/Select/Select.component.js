import PropTypes from 'prop-types';
import React from 'react';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

function getSelectedOptions(select, multiple) {
	if (multiple) {
		return Array.prototype.slice
			.call(select.options)
			.filter(option => option.selected)
			.map(option => option.value);
	}

	return select.value;
}

export default function Select({
	id,
	isValid,
	errorMessage,
	onChange,
	onFinish,
	schema,
	value,
	valueIsUpdating,
}) {
	const { autoFocus, description, disabled = false, placeholder, readOnly = false, title } = schema;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	const multiple = schema.schema.type === 'array' && schema.schema.uniqueItems;

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			descriptionId={descriptionId}
			errorId={errorId}
			id={id}
			isValid={isValid}
			label={title}
			labelAfter
			required={schema.required}
			valueIsUpdating={valueIsUpdating}
		>
			<select
				id={id}
				multiple={multiple}
				autoFocus={autoFocus}
				className="form-control"
				disabled={disabled || valueIsUpdating}
				onChange={event => {
					const payload = { schema, value: getSelectedOptions(event.target, multiple) };
					onChange(event, payload);
					onFinish(event, payload);
				}}
				readOnly={readOnly}
				value={value}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-invalid={!isValid}
				aria-required={schema.required}
				aria-describedby={`${descriptionId} ${errorId}`}
			>
				{placeholder ? (
					<option disabled value="">
						{placeholder}
					</option>
				) : null}
				{schema.titleMap &&
					schema.titleMap.map((option, index) => {
						const optionProps = {
							key: index,
							value: option.value,
						};
						return <option {...optionProps}>{option.name}</option>;
					})}
			</select>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Select.propTypes = {
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
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
			),
			type: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
		valueIsUpdating: PropTypes.bool,
	};
}

Select.defaultProps = {
	isValid: true,
	schema: {},
	value: '',
};
