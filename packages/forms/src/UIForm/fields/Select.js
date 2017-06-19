import React, { PropTypes } from 'react';
import FieldTemplate from './FieldTemplate';

function getSelectedOptions(select, multiple) {
	if (multiple) {
		return Array.from(select.options)
			.filter(option => option.selected)
			.map(option => option.value);
	}

	return select.value;
}

export default function Select(props) {
	const { id, isValid, errorMessage, onChange, schema, value } = props;
	const { autoFocus, description, disabled, placeholder, readOnly, title } = schema;

	const multiple = schema.schema.type === 'array' && schema.schema.uniqueItems;

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			labelAfter
		>
			<select
				id={id}
				multiple={multiple}
				autoFocus={autoFocus}
				className="form-control"
				disabled={disabled}
				onChange={
					event => onChange(event, schema, getSelectedOptions(event.target, multiple))
				}
				readOnly={readOnly}
				value={value}
			>
				<option disabled>{placeholder}</option>
				{
					schema.titleMap && schema.titleMap.map((option, index) => {
						const optionProps = {
							key: index,
							value: option.value,
						};
						return (
							<option
								{...optionProps}
							>
								{option.name}
							</option>
						);
					})
				}
			</select>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Select.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
	};
}
Select.defaultProps = {
	isValid: true,
	value: '',
};
