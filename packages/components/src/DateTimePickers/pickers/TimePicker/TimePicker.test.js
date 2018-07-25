import React from 'react';
import { shallow } from 'enzyme';
import { mockDate, restoreDate } from '../../shared/utils/test/dateMocking';

import TimePicker from './TimePicker.component';

const getFirstRenderedIndexOf =
	middleDisplayIndex => middleDisplayIndex - 2;

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

				return actual.time - previous.time;
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

			const lastInterval = maxDayTime - lastItem.time;

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

		expect(firstItem.time).toBeGreaterThanOrEqual(0);
		expect(lastItem.time).toBeLessThanOrEqual(maxInclusiveDayTime);
	});

	describe('list index', () => {
		it('should default render with the current time in middle if matches exactly a selectable time', () => {
			mockDate(new Date(2025, 1, 20, 22, 35));

			const wrapper = shallow(<TimePicker
				interval={5}
				onSelect={() => {}}
			/>);

			const middleTimeExpected = 22 * 60 + 35;
			const initialIndexExpected = getFirstRenderedIndexOf(middleTimeExpected / 5);

			expect(wrapper.prop('initialIndex')).toBe(initialIndexExpected);

			restoreDate();
		});

		it('should default render with the closest selectable time of current time in middle', () => {
			mockDate(new Date(2025, 1, 20, 11, 7));

			const wrapper = shallow(<TimePicker
				interval={5}
				onSelect={() => {}}
			/>);

			const middleTimeExpected = 11 * 60 + 5;
			const initialIndexExpected = getFirstRenderedIndexOf(middleTimeExpected / 5);

			expect(wrapper.prop('initialIndex')).toBe(initialIndexExpected);

			restoreDate();
		});

		it('should render with the "selectedTime" in middle if matches exactly a selectable time', () => {
			const wrapper = shallow(<TimePicker
				interval={5}
				selectedTime={14 * 60 + 25}
				onSelect={() => {}}
			/>);

			const middleTimeExpected = 14 * 60 + 25;
			const initialIndexExpected = getFirstRenderedIndexOf(middleTimeExpected / 5);

			expect(wrapper.prop('initialIndex')).toBe(initialIndexExpected);
		});

		it('should render with the closest selectable time of the "selectedTime" in middle', () => {
			const wrapper = shallow(<TimePicker
				interval={5}
				selectedTime={14 * 60 + 59}
				onSelect={() => {}}
			/>);

			const middleTimeExpected = 15 * 60;
			const initialIndexExpected = getFirstRenderedIndexOf(middleTimeExpected / 5);

			expect(wrapper.prop('initialIndex')).toBe(initialIndexExpected);
		});
	});

	describe('selectedTime', () => {
		it('should have the correct selectable time selected if matches the "selectedTime"', () => {
			const wrapper = shallow(<TimePicker
				interval={5}
				selectedTime={1330}
				onSelect={() => {}}
			/>);

			const itemRenderer = wrapper.prop('itemRenderer');
			const items = wrapper.prop('items');

			const elements = items.map(item => itemRenderer(item));

			const selectedElement = elements
				.filter(element => element.props.isSelected === true);

			expect(selectedElement).toHaveLength(1);
			expect(selectedElement[0].props.label).toBe('22:10');
		});

		it('should not have any selected selectable time if no one matches the "selectedTime"', () => {
			const wrapper = shallow(<TimePicker
				interval={5}
				selectedTime={1331}
				onSelect={() => {}}
			/>);

			const itemRenderer = wrapper.prop('itemRenderer');
			const items = wrapper.prop('items');

			const elements = items.map(item => itemRenderer(item));

			const selectedElement = elements
				.filter(element => element.props.isSelected === true);

			expect(selectedElement).toHaveLength(0);
		});

		it('sould not have any selected selectable time if there is no "selectedTime"', () => {
			const wrapper = shallow(<TimePicker
				interval={5}
				onSelect={() => {}}
			/>);

			const itemRenderer = wrapper.prop('itemRenderer');
			const items = wrapper.prop('items');

			const elements = items.map(item => itemRenderer(item));

			const selectedElement = elements
				.filter(element => element.props.isSelected === true);

			expect(selectedElement).toHaveLength(0);
		});

		it('should callback with the time picked', () => {
			const onSelect = jest.fn();

			const wrapper = shallow(<TimePicker
				interval={10}
				selectedTime={510}
				onSelect={onSelect}
			/>);

			const itemRenderer = wrapper.prop('itemRenderer');
			const items = wrapper.prop('items');

			const elements = items.map(item => itemRenderer(item));

			const elementToSelect = elements
				.filter(element => element.props.label === '13:50')[0];

			const timeToSelectAction = shallow(elementToSelect);

			timeToSelectAction.simulate('click');

			expect(onSelect).toHaveBeenCalledWith(13 * 60 + 50);
		});
	});
});
