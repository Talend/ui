import { Range } from '../../../types';
import { InputFieldProps } from './useRangeInputField.hook';

export interface Ticks {
 [value: number]: string
}

export interface RangeHandler {
	inputField: (props: InputFieldProps) => JSX.Element;
	getMinValue?: (value: number) => number;
	getMaxValue?: (value: number) => number;
	getTicks: (limit: Range) => Ticks;
	getStep?: (limits: Range) => number | string;
}
