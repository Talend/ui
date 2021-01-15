import React from 'react';
import classNames from 'classnames';
import useRangeInputField, { InputFieldProps } from '../useRangeInputField.hook';
import styles from './NumberInputField.component.scss';
import { formatNumber } from '../../../../formatters/formatters';
import { Range } from '../../../../types';
import { RangeHandler } from '../range-handler.types';

const formatter = (input: number) => `${input}`;
const parser = (input: string) => +input;

export function NumberInputField({
	id,
	value: rangeValue,
	onChange,
}: InputFieldProps): JSX.Element {
	const { setInputValue, submit, ...props } = useRangeInputField(
		rangeValue,
		formatter,
		parser,
		onChange,
	);

	return (
		<input
			id={id}
			className={classNames('form-control', styles['number-input-field'])}
			type="number"
			step="any"
			onChange={event => setInputValue(event.target.value)}
			{...props}
		/>
	);
}

export const NumberRangeHandler: RangeHandler = {
	inputField: NumberInputField,
	tickFormatter: formatNumber,
	tickCount: (limits: Range) => (limits.max < 1e10 && limits.max > 1e-10 ? 5 : 3),
};
