import React, { useRef } from 'react';
import isValid from 'date-fns/isValid';
import startOfSecond from 'date-fns/startOfSecond';
import endOfSecond from 'date-fns/endOfSecond';
import parseISO from 'date-fns/parseISO';
import { InputDateTimePicker } from '@talend/react-components';
import { formatDate, formatDateTime } from '../../../../formatters/formatters';
import useRangeInputField, { InputFieldProps } from '../useRangeInputField.hook';
import styles from './DateTimeInputField.component.scss';
import { RangeHandler } from '../range-handler.types';

function parser(input: string): number | null {
	// Create date in locale time zone
	const date = parseISO(input);
	return isValid(date) ? date.getTime() : null;
}

export function DateTimeInputField({
	id,
	value: rangeValue,
	onChange,
}: InputFieldProps): JSX.Element {
	const ref = useRef<HTMLDivElement>(null);
	const { setInputValue, submit, ...rest } = useRangeInputField(
		rangeValue,
		formatDateTime,
		parser,
		onChange,
	);

	return (
		<div ref={ref} className={styles['date-time-input-field']}>
			<InputDateTimePicker
				id={id}
				useSeconds
				onChange={(_: any, data: { textInput: string; errors?: string[] }) => {
					if (!data.errors?.length) {
						setInputValue(data.textInput);
					}
				}}
				{...rest}
				onBlur={() => {
					// Trigger onBlur when clicking outside the datepicker & inputs
					if (!ref.current?.contains(document.activeElement)) {
						rest.onBlur();
					}
				}}
			/>
		</div>
	);
}

export const DateTimeRangeHandler: RangeHandler = {
	inputField: DateTimeInputField,
	tickFormatter: formatDate,
	getMinValue: value => startOfSecond(value).getTime(),
	getMaxValue: value => endOfSecond(value).getTime(),
};
