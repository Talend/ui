import { RangeHandler } from '../range-handler.types';
import { NumberRangeHandler } from '../NumberRangeHandler/NumberRangeHandler';

export const IntegerRangeHandler: RangeHandler = {
	...NumberRangeHandler,
	getStep: () => 1,
	getMinValue: Math.floor,
	getMaxValue: Math.ceil
};
