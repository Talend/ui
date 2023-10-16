import { useState } from 'react';

type UseControlOptions = {
	valueKey: string;
	defaultValueKey: string;
	onChangeKey: string;
	selector?: (...args: any) => any;
	defaultValue?: any;
};
export type UseControlReturns<T> = {
	value: T | undefined;
	onChange: (...args: any) => void;
};

export function useControl<T>(props: any, opts: UseControlOptions): UseControlReturns<T> {
	const isControlled = props[opts.valueKey] !== undefined && props[opts.onChangeKey] !== undefined;
	let defaultValue = props[opts.defaultValueKey];
	if (defaultValue === undefined) {
		if (props[opts.valueKey] !== undefined) {
			defaultValue = props[opts.valueKey];
		} else if (opts.defaultValue !== undefined) {
			defaultValue = props[opts.defaultValue];
		}
	}
	const [state, setState] = useState<T>(defaultValue);

	const onChange = (value: any, ...args: any) => {
		let safeValue = value;
		if (opts.selector) {
			safeValue = opts.selector(value, ...args);
		}
		if (props[opts.onChangeKey]) {
			props[opts.onChangeKey](value);
		} else {
			setState(safeValue);
		}
	};
	let value = isControlled ? props[opts.valueKey] : state;
	if (value === undefined) {
		value = defaultValue;
	}
	return {
		value,
		onChange: isControlled ? props[opts.onChangeKey] : onChange,
	};
}
