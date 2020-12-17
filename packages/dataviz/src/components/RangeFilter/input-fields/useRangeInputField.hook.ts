import { useCallback, useEffect, useState } from 'react';

function useRangeInputField(
	rangeValue: number,
	formatter: (input: number) => string,
	parser: (input: string) => number | null,
	onChange: (input: number) => void,
) {
	const [inputValue, setInputValue] = useState<string>('');

	const resetValue = useCallback(() => {
		setInputValue(formatter(rangeValue));
	}, [formatter, rangeValue]);

	function submit(stringValue: string) {
		const parsed = parser(stringValue);
		if (parsed !== null) {
			if (parsed !== rangeValue) {
				onChange(parsed);
			}
		} else {
			resetValue();
		}
	}

	useEffect(() => {
		resetValue();
	}, [resetValue]);

	return {
		value: inputValue,
		setInputValue,
		onKeyDown: (event: { key: string }) => {
			if (event.key === 'Enter') {
				submit(inputValue);
			} else if (event.key === 'Escape') {
				resetValue();
			}
		},
		onBlur: () => submit(inputValue),
		submit,
	};
}

export default useRangeInputField;
