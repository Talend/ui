import React from 'react';
import { mount } from 'enzyme';
import { IntegerRangeHandler } from './IntegerRangeHandler';

describe('Integer range handler', () => {
	it('Should create ticks', () => {
		const ticks = IntegerRangeHandler.getTicks({
			min: 2177,
			max: 9530,
		});

		expect(ticks).toEqual({
			2177: '2,177',
			4000: '4,000',
			6000: '6,000',
			8000: '8,000',
			9530: '9,530',
		});
	});
	it('Should create ticks for tiny range', () => {
		const ticks = IntegerRangeHandler.getTicks({
			min: 1,
			max: 6,
		});

		expect(ticks).toEqual({
			1: '1',
			2: '2',
			4: '4',
			6: '6',
		});
	});
});
