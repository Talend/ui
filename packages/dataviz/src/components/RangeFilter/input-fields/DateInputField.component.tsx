import React, { useEffect, useState } from 'react';
import { InputDatePicker } from '@talend/react-components';
import { formatDate } from '../../../formatters/formatters';

interface InputFieldProps {
	value: number;
	onChange: (value: number) => void;
}

function DateInputField({ value, onChange }: InputFieldProps): JSX.Element {
	const [inputValue, setInputValue] = useState<string>('');

	useEffect(() => {
		setInputValue(formatDate(value));
	}, [value]);

	return (
		<InputDatePicker
			onChange={(_: any, data: { textInput: string; origin: string }) => {
				if (data.origin === 'PICKER') {
					onChange(new Date(data.textInput).getTime());
				}
				setInputValue(data.textInput);
			}}
			value={inputValue}
			onBlur={() => {
				if (new Date(inputValue).getTime()) {
					onChange(new Date(inputValue).getTime());
				} else {
					setInputValue(formatDate(value));
				}
			}}
		/>
	);
}

export default DateInputField;
