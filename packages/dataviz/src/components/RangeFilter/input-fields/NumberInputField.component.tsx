import React from 'react';
import useRangeInputField from './useRangeInputField.hook';

interface InputFieldProps {
	value: number;
	onChange: (value: number) => void;
}
function NumberInputField({ value: rangeValue, onChange }: InputFieldProps): JSX.Element {
	const { setInputValue, submit, ...props } = useRangeInputField(
		rangeValue,
		input => `${input}`,
		input => +input,
		onChange,
	);

	return (
		<input
			className="form-control"
			type="number"
			step="any"
			onChange={event => setInputValue(event.target.value)}
			{...props}
		/>
	);
}

export default NumberInputField;
