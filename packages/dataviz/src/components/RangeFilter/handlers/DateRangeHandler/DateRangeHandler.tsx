import React from 'react';
import isValid from 'date-fns/isValid';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import parseISO from 'date-fns/parseISO';
import { InputDatePicker } from '@talend/react-components';
import { formatDate } from '../../../../formatters/formatters';
import useRangeInputField, { InputFieldProps } from '../useRangeInputField.hook';
import { RangeHandler } from '../range-handler.types';

export function getMinValue(value: number): number {
	return startOfDay(new Date(value)).getTime();
}

export function getMaxValue(value: number): number {
	return endOfDay(new Date(value)).getTime();
}

function parser(input: string): number | null {
	// Create date in locale time zone
	const date = parseISO(input);
	return isValid(date) ? date.getTime() : null;
}

export function DateInputField({ id, value: rangeValue, onChange }: InputFieldProps): JSX.Element {
	const { setInputValue, submit, ...props } = useRangeInputField(
		rangeValue,
		formatDate,
		parser,
		onChange,
	);

	return (
		<InputDatePicker
			id={id}
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

export const DateRangeHandler: RangeHandler = {
	inputField: DateInputField,
	tickFormatter: formatDate,
	getMinValue,
	getMaxValue,
};
