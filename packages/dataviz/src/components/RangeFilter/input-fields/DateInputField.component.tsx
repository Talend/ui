import React from 'react';
import isValid from 'date-fns/isValid';
import startOfDay from 'date-fns/startOfDay';

import { InputDatePicker } from '@talend/react-components';
import { formatDate } from '../../../formatters/formatters';
import useRangeInputField from './useRangeInputField.hook';

interface InputFieldProps {
	value: number;
	onChange: (value: number) => void;
}

const parser = (input: string) =>
	isValid(new Date(input)) ? startOfDay(new Date(input)).getTime() : null;

function DateInputField({ value: rangeValue, onChange }: InputFieldProps): JSX.Element {
	const { setInputValue, submit, ...props } = useRangeInputField(
		rangeValue,
		formatDate,
		parser,
		onChange,
	);

	return (
		<InputDatePicker
			onChange={(_: any, data: { textInput: string; origin: string }) => {
				if (data.origin === 'PICKER') {
					submit(data.textInput);
				}
				setInputValue(data.textInput);
			}}
			{...props}
		/>
	);
}

export default DateInputField;
