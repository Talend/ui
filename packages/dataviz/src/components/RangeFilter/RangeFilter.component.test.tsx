import React from 'react';
import { mount, ReactWrapper, shallow } from 'enzyme';
import RangeFilter from './RangeFilter.component';
import { DateRangeHandler, NumberRangeHandler } from './handlers';

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
			function checkMarks(component: ReactWrapper, marks: string[]) {
				marks.forEach((mark, index) => {
					expect(
						component
							.find('.rc-slider-mark-text')
							.at(index)
							.text(),
					).toEqual(mark);
				});
			}

			it('Should display only 3 marks for big values', () => {
				const component = mount(
					<RangeFilter
						range={{ min: 1e11, max: 1e15 }}
						limits={{ min: 1e11, max: 1e15 }}
						{...NumberRangeHandler}
						{...mocks}
					/>,
				);

				checkMarks(component, ['100000000000', '500050000000000', '1000000000000000']);
			});

			it('Should display only 5 number marks', () => {
				const component = mount(
					<RangeFilter
						range={{ min: 1, max: 1000 }}
						limits={{ min: 1, max: 1000 }}
						{...NumberRangeHandler}
						{...mocks}
					/>,
				);

				checkMarks(component, ['1', '251', '501', '750', '1,000']);
			});

			it('Should display 5 date marks', () => {
				const component = mount(
					<RangeFilter
						range={{ min: new Date('2010-01-01').getTime(), max: new Date('2015-01-01').getTime() }}
						limits={{
							min: new Date('2010-01-01').getTime(),
							max: new Date('2020-01-01').getTime(),
						}}
						{...DateRangeHandler}
						{...mocks}
					/>,
				);

				checkMarks(component, [
					'2010-01-01',
					'2012-07-02',
					'2015-01-01',
					'2017-07-02',
					'2020-01-01',
				]);
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
