import React from 'react';
import { shallow } from 'enzyme';
import { mockDate, restoreDate } from '../../dateMocking';

import TimePicker, { twoDigits } from './TimePicker.component';

describe('TimePicker', () => {
	it('should render', () => {
		const wrapper = shallow(
			<TimePicker
				selectedTime={1250}
				onSelect={() => {}}
			/>
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	describe('interval', () => {
		function hasCorrectInterval(items, interval) {
			const diffs = items.map((item, index, arr) => {
				if (index === 0) {
					return undefined;
				}

				const previous = arr[index - 1];
				const actual = item;

				return actual.id - previous.id;
			}).splice(1);

			return diffs.filter(diff => diff !== interval).length === 0;
		}

		it('should have a default interval of 15 minutes', () => {
			const wrapper = shallow(
				<TimePicker
					onSelect={() => {}}
				/>
			);

			const items = wrapper.prop('items');

			expect(hasCorrectInterval(items, 15)).toBe(true);
		});

		it('should have a interval configured with "interval" if exists', () => {
			const wrapper = shallow(
				<TimePicker
					interval={7}
					onSelect={() => {}}
				/>
			);

			const items = wrapper.prop('items');

			expect(hasCorrectInterval(items, 7)).toBe(true);
		});

		it('should have the last selectable values interval lower or equal to the configured interval', () => {
			const wrapper = shallow(
				<TimePicker
					interval={13}
					onSelect={() => {}}
				/>
			);

			const items = wrapper.prop('items');

			const lastItem = items[items.length - 1];

			const maxDayTime = 24 * 60;

			const lastInterval = maxDayTime - lastItem.id;

			expect(lastInterval).toBeLessThanOrEqual(13);
		});
	});

	it('should start at 00:00 and ends before or at 23:59', () => {
		const wrapper = shallow(
			<TimePicker
				interval={77}
				onSelect={() => {}}
			/>
		);

		const items = wrapper.prop('items');

		const firstItem = items[0];
		const lastItem = items[items.length - 1];

		const maxInclusiveDayTime = 23 * 60 + 59;

		expect(firstItem.id).toBeGreaterThanOrEqual(0);
		expect(lastItem.id).toBeLessThanOrEqual(maxInclusiveDayTime);
	});

	describe('list index', () => {
		it('should default render with the current time in middle if matches exactly a selectable time', () => {
			mockDate(new Date(2025, 1, 20, 22, 35));

			const wrapper = shallow(<TimePicker
				interval={5}
				onSelect={() => {}}
			/>);

			const middleTimeExpected = 22 * 60 + 35;

			expect(wrapper.prop('initialMiddleVisibleItemId')).toBe(middleTimeExpected);

			restoreDate();
		});

		it('should default render with the closest selectable time of current time in middle', () => {
			mockDate(new Date(2025, 1, 20, 11, 7));

			const wrapper = shallow(<TimePicker
				interval={5}
				onSelect={() => {}}
			/>);

			const middleTimeExpected = 11 * 60 + 5;

			expect(wrapper.prop('initialMiddleVisibleItemId')).toBe(middleTimeExpected);

			restoreDate();
		});

		it('should render with the "selectedTime" in middle if matches exactly a selectable time', () => {
			const wrapper = shallow(<TimePicker
				interval={5}
				selectedTime={14 * 60 + 25}
				onSelect={() => {}}
			/>);

			const middleTimeExpected = 14 * 60 + 25;

			expect(wrapper.prop('initialMiddleVisibleItemId')).toBe(middleTimeExpected);
		});

		it('should render with the closest selectable time of the "selectedTime" in middle', () => {
			const wrapper = shallow(<TimePicker
				interval={5}
				selectedTime={14 * 60 + 59}
				onSelect={() => {}}
			/>);

			const middleTimeExpected = 15 * 60;

			expect(wrapper.prop('initialMiddleVisibleItemId')).toBe(middleTimeExpected);
		});
	});

	describe('selectedTime', () => {
		it('should callback with the time picked', () => {
			const onSelect = jest.fn();

			const wrapper = shallow(<TimePicker
				interval={5}
				onSelect={onSelect}
			/>);

			const item = wrapper.prop('items')[10];
			wrapper.prop('onSelect')(item);

			expect(onSelect).toHaveBeenCalledWith(item.id);
		});
	});
});


describe('twoDigits', () => {
	it('should return the exact input if number already have exactly 2 digits in string format', () => {
		expect(twoDigits(45)).toBe('45');
	});

	it('should return the exact input if number already have more than 2 digits in string format', () => {
		expect(twoDigits(123)).toBe('123');
	});

	it('should return the input number preprend with 0 digit if have only 1 digit initially, in string format', () => {
		expect(twoDigits(6)).toBe('06');
	});
});
