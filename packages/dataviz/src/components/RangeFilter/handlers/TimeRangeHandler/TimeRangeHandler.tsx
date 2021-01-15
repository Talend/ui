import React from 'react';
import isValid from 'date-fns/isValid';
import { InputTimePicker } from '@talend/react-components';
import useRangeInputField, { InputFieldProps } from '../useRangeInputField.hook';
import { RangeHandler } from '../range-handler.types';

function parser(input: string): number | null {
	const date = new Date(`1970-01-01T${input}Z`);
	return isValid(date) ? Math.floor(date.getTime() / 1000) : null;
}

function formatter(value: number): string {
	return new Date(value * 1000).toISOString().substr(11, 8);
}

export function TimeInputField({ id, value: rangeValue, onChange }: InputFieldProps): JSX.Element {
	const { setInputValue, submit, ...rest } = useRangeInputField(
		rangeValue,
		formatter,
		parser,
		onChange,
	);

	return (
		<InputTimePicker
			id={id}
			useSeconds
			onChange={(_: any, data: { textInput: string; origin: string }) => {
				if (data.origin === 'PICKER') {
					submit(data.textInput);
				}
				setInputValue(data.textInput);
			}}
			{...rest}
		/>
	);
}

export const TimeRangeHandler: RangeHandler = {
	inputField: TimeInputField,
	tickFormatter: formatter,
	getMinValue: Math.floor,
	getMaxValue: Math.floor
};
