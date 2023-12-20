import { endOfDay } from 'date-fns/endOfDay';
import { isValid } from 'date-fns/isValid';
import { parseISO } from 'date-fns/parseISO';
import { startOfDay } from 'date-fns/startOfDay';

import { InputDatePicker } from '@talend/react-components';

import { formatDate } from '../../../../formatters/formatters';
import { RangeHandler } from '../range-handler.types';
import { formatTimeTicks } from '../slider-ticks.utils';
import useRangeInputField, { InputFieldProps } from '../useRangeInputField.hook';

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
	getMinValue,
	getMaxValue,
	// slider should move day by day
	getStep: () => 24 * 3600 * 1000,
	getTicks: limits => formatTimeTicks(limits, formatDate),
};
