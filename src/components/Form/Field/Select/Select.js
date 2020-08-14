import React from 'react';

import Field from '../Field';

import * as S from './Select.style';

function Select({ className = '', children, values, value: initialValue, multiple, ...rest }) {
	const [value, setValue] = React.useState(initialValue);

	function onChange(event) {
		let value = event.target.value;
		if (multiple) {
			const options = event.target.options;
			value = [];
			options.forEach(option => {
				if (option.selected) {
					value.push(option.value);
				}
			});
		}
		setValue(() => value);
		rest.onChange && rest.onChange(event);
	}

	function getOptions() {
		if (Array.isArray(values)) {
			return values.map((value, index) => (
				<option key={index} value={value}>
					{value}
				</option>
			));
		}
		if (values) {
			return Object.entries(values).map(([key, keyValues], i) => (
				<optgroup key={i} label={key}>
					{keyValues.map((value, j) => (
						<option key={j} value={value}>
							{value}
						</option>
					))}
				</optgroup>
			));
		}
		return children;
	}

	return (
		<S.FieldWrapper>
			<Field
				as="select"
				{...rest}
				className={`${className} select`}
				value={value}
				multiple={multiple}
				onChange={onChange}
			>
				{getOptions()}
			</Field>
		</S.FieldWrapper>
	);
}

export default Select;
