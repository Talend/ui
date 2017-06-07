import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Message from '../Message';

function convertValue(type, value) {
	if (type === 'number') {
		return parseFloat(value);
	}
	return value;
}

export default function Select(props) {
	const { id, isValid, errorMessage, onChange, schema, value } = props;
	const { autoFocus, description, disabled, placeholder, readOnly, title, type } = schema;

	const groupsClassNames = classNames(
		'form-group',
		{ 'has-error': !isValid },
	);
	const options = schema.titleMap;
	const multiple = schema.schema.type === 'array' && schema.schema.uniqueItems;

	return (
		<div className={groupsClassNames}>
			<select
				id={id}
				multiple={multiple}
				autoFocus={autoFocus}
				className="form-control"
				disabled={disabled}
				onChange={event => {
					return onChange(event, schema, convertValue(type, event.target.value));
				}}
				readOnly={readOnly}
				value={value}
			>
				<option disabled>{placeholder}</option>
				{
					options.map((option, index) => {
						const optionProps = {
							key: index,
							value: option.name,
						};
						return (
							<option
								{...optionProps}
							>
								{option.value}
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
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}
Select.defaultProps = {
	isValid: true,
	value: [],
};
