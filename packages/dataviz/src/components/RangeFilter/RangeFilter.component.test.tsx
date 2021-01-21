import React from 'react';
import { mount, ReactWrapper, shallow } from 'enzyme';
import RangeFilter from './RangeFilter.component';
import { NumberRangeHandler } from './handlers';

describe('Range filter', () => {
	const mocks = {
		onSliderChange: jest.fn(),
		onAfterChange: jest.fn(),
	};

	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe('Slider', () => {
		it('Should call onSliderChange', () => {
			const component = shallow(
				<RangeFilter
					range={{ min: 15, max: 20 }}
					{...NumberRangeHandler}
					limits={{ min: 15, max: 20 }}
					{...mocks}
				/>,
			);

			component.find('Slider').invoke('onChange')!([5, 20] as any);

			expect(mocks.onSliderChange).toHaveBeenCalledWith({
				min: 5,
				max: 20,
			});
		});

		it('Should call on', () => {
			const component = shallow(
				<RangeFilter
					range={{ min: 15, max: 20 }}
					{...NumberRangeHandler}
					limits={{ min: 15, max: 20 }}
					{...mocks}
				/>,
			);

			component.find('Slider').invoke('onAfterChange' as any)!([5, 20] as any);

			expect(mocks.onAfterChange).toHaveBeenCalledWith({
				min: 5,
				max: 20,
			});
		});

		describe('Marks', () => {
			function checkMark(component: ReactWrapper, index: number, style: string, value: string) {
				const mark = component.find('.rc-slider-mark-text').at(index);
				expect(mark.find(`.theme-range-filter__slider-mark--${style}`).text()).toEqual(value);
			}
			it('Should render min/max on bottom, and other marks on top', () => {
				const component = mount(
					<RangeFilter
						range={{ min: 2177.87, max: 9530.28 }}
						limits={{ min: 2177.87, max: 9530.28 }}
						{...NumberRangeHandler}
						{...mocks}
					/>,
				);
				checkMark(component, 0, 'bottom-left', '2,177.87');
				checkMark(component, 1, 'top', '4,000');
				checkMark(component, 2, 'top', '6,000');
				checkMark(component, 3, 'top', '8,000');
				checkMark(component, 4, 'bottom-right', '9,530.28');
			});
		});
	});

	describe('Inputs', () => {
		it('Should not go outside provided limits', () => {
			const limits = { min: 10, max: 50 };
			const component = shallow(
				<RangeFilter
					range={{ min: 15, max: 20 }}
					{...NumberRangeHandler}
					limits={limits}
					{...mocks}
				/>,
			);

			component
				.find('NumberInputField')
				.at(0)
				.invoke('onChange')!(5 as any);
			component
				.find('NumberInputField')
				.at(0)
				.invoke('onChange')!(100 as any);
			component
				.find('NumberInputField')
				.at(1)
				.invoke('onChange')!(100 as any);
			component
				.find('NumberInputField')
				.at(1)
				.invoke('onChange')!(0 as any);

			expect(mocks.onAfterChange).toHaveBeenNthCalledWith(1, {
				min: limits.min,
				max: 20,
			});
			expect(mocks.onAfterChange).toHaveBeenNthCalledWith(2, {
				min: 20,
				max: 20,
			});
			expect(mocks.onAfterChange).toHaveBeenNthCalledWith(3, {
				min: 15,
				max: limits.max,
			});
			expect(mocks.onAfterChange).toHaveBeenNthCalledWith(4, {
				min: 15,
				max: 15,
			});
		});
	});
});
