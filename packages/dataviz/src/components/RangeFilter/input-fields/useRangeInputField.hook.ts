import { useEffect, useState } from 'react';

function useRangeInputField(
	rangeValue: number,
	formatter: (input: number) => string,
	parser: (input: string) => number | null,
	onChange: (input: number) => void,
) {
	const [inputValue, setInputValue] = useState<string>('');

	function resetValue() {
		setInputValue(formatter(rangeValue));
	}

  function submit(stringValue: string) {
    const parsed = parser(stringValue);
    if (parsed) {
      onChange(parsed);
    } else {
      resetValue();
    }
  }

  useEffect(() => {
		resetValue();
	}, [rangeValue]);

	return {
		value: inputValue,
		setInputValue,
		onKeyDown: (event: {key: string}) => {
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
