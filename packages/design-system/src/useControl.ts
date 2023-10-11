import { useState } from 'react';

type UseControlOptions = {
	valueKey: string;
	defaultValueKey: string;
	onChangeKey: string;
	selector?: (...args: any) => any;
	defaultValue?: any;
};

export function useControl<T>(props: any, opts: UseControlOptions) {
	let defaultValue = props[opts.defaultValueKey];
	if (defaultValue === undefined) {
		if (props[opts.valueKey] !== undefined) {
			defaultValue = props[opts.valueKey];
		} else if (opts.defaultValue !== undefined) {
			defaultValue = props[opts.defaultValue];
		}
	}
	const [state, setState] = useState<T>(defaultValue);
	const isControlled = props[opts.valueKey] !== undefined && props[opts.onChangeKey] !== undefined;

	const onChange = (value: any) => {
		let safeValue = value;
		if (opts.selector) {
			safeValue = opts.selector(value);
		}
		if (props[opts.onChangeKey]) {
			props[opts.onChangeKey](value);
		} else {
			setState(safeValue);
		}
	};

	return {
		value: isControlled ? props[opts.valueKey] : state,
		onChange: isControlled ? props[opts.onChangeKey] : onChange,
	};
}
