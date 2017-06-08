import React, { PropTypes } from 'react';
import classNames from 'classnames';

import { convertValue } from '../utils/properties';
import Message from '../Message';

function getSelectedOptions(select, type, multiple) {
	if (multiple) {
		return Array.from(select.options)
			.filter(option => option.selected)
			.map(option => convertValue(type, option.value));
	}

	return convertValue(type, select.value);
}

export default function Select(props) {
	const { id, isValid, errorMessage, onChange, schema, value } = props;
	const { autoFocus, description, disabled, placeholder, readOnly, title } = schema;

	const groupsClassNames = classNames(
		'form-group',
		{ 'has-error': !isValid },
	);
	const options = schema.titleMap;
	const multiple = schema.schema.type === 'array' && schema.schema.uniqueItems;
	const itemsType = multiple ?
		schema.schema.items.type :
		schema.schema.type;

	return (
		<div className={groupsClassNames}>
			<select
				id={id}
				multiple={multiple}
				autoFocus={autoFocus}
				className="form-control"
				disabled={disabled}
				onChange={
					event => onChange(event, schema, getSelectedOptions(event.target, itemsType, multiple))
				}
				readOnly={readOnly}
				value={value}
			>
				<option disabled>{placeholder}</option>
				{
					options.map((option, index) => {
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
			<label htmlFor={id} className="control-label">{title}</label>
			<Message
				errorMessage={errorMessage}
				description={description}
				isValid={isValid}
			/>
		</div>
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
