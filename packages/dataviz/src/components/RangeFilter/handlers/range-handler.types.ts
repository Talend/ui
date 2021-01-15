import { Range } from '../../../types';
import { InputFieldProps } from './useRangeInputField.hook';

export interface RangeHandler {
	inputField: (props: InputFieldProps) => JSX.Element;
	/** Returns this tick string to use in slider */
	tickFormatter: (value: number, precision?: number) => string;
	/** Returns the number of tick to show in slider */
	tickCount?: (limits: Range) => number;
	getMinValue?: (value: number) => number;
	getMaxValue?: (value: number) => number;
}
