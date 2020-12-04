import React, { useEffect, useState } from 'react';

interface InputFieldProps {
	value: number;
	onChange: (value: number) => void;
}
function NumberInputField({ value, onChange }: InputFieldProps): JSX.Element {
	const [inputValue, setInputValue] = useState<string>(`${value}`);

	useEffect(() => {
		setInputValue(`${value}`);
	}, [value]);

	return (
		<input
			className="form-control"
			type="number"
			step="any"
			value={inputValue}
			onBlur={() => onChange(+inputValue)}
			onChange={event => setInputValue(event.target.value)}
		/>
	);
}

export default NumberInputField;
