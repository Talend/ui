import PropTypes from 'prop-types';
import React from 'react';
import ReSelect from 'react-select';
import 'react-select/dist/react-select.css';
import FieldTemplate from '../FieldTemplate';
import theme from './Select.scss';

function getSelectedOptions(selectedValue, multiple) {
	if (!selectedValue) {
		return undefined;
	}
	if (multiple) {
		return selectedValue.map(option => option.value);
	}
	return selectedValue.value;
}

export default function Select({ id, isValid, errorMessage, onChange, onFinish, schema, value }) {
	const { autoFocus, description, disabled = false, placeholder, readOnly = false, title } = schema;

	const multiple = schema.schema.type === 'array' && schema.schema.uniqueItems;
	const options = schema.titleMap.map(option => ({
		value: option.value,
		label: option.name,
	}));
	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			required={schema.required}
		>
			<ReSelect
				id={id}
				multi={multiple}
				autoFocus={autoFocus}
				disabled={disabled}
				className={theme.select}
				onChange={selectedValue => {
					const payload = { schema, value: getSelectedOptions(selectedValue, multiple) };
					onChange(event, payload);
					onFinish(event, payload);
				}}
				readOnly={readOnly}
				value={value}
				options={options}
				placeholder={placeholder}
			/>
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
	};
}

Select.defaultProps = {
	isValid: true,
	schema: {},
	value: '',
};
