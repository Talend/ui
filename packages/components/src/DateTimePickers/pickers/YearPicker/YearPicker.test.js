import React from 'react';
import { shallow } from 'enzyme';

import { mockDate, restoreDate } from '../../dateMocking';

import YearPicker from './YearPicker.component';

const NB_YEAR_RANGE = 300;
const getFirstRenderedIndexOf =
	middleDisplayIndex => middleDisplayIndex - 2;

describe('YearPicker', () => {
	it('should render', () => {
		mockDate(new Date(2015, 11, 31));

		const wrapper = shallow(<YearPicker
			selectedYear={2012}
			onSelect={() => {}}
		/>);

		expect(wrapper.getElement()).toMatchSnapshot();

		restoreDate();
	});

	it('should have the right number of years selectable', () => {
		mockDate(new Date(2022, 13, 5));

		const wrapper = shallow(<YearPicker
			onSelect={() => {}}
		/>);

		expect(wrapper.prop('items')).toHaveLength(NB_YEAR_RANGE);

		restoreDate();
	});

	it('should have the correct year range selectable', () => {
		const todayYear = 2022;
		mockDate(new Date(todayYear, 13, 5));

		const wrapper = shallow(<YearPicker
			onSelect={() => {}}
		/>);

		const firstYearExpected = todayYear - (NB_YEAR_RANGE / 2) + 1;
		const lastYearExpected = todayYear + NB_YEAR_RANGE / 2;

		const items = wrapper.prop('items');
		expect(items[0].id).toBe(firstYearExpected);
		const lastIndex = items.length - 1;
		expect(items[lastIndex].id).toBe(lastYearExpected);

		restoreDate();
	});

	it('should default render with current year in middle when "selectedYear" prop not provided', () => {
		mockDate(new Date(2025, 1, 20));

		const wrapper = shallow(<YearPicker
			onSelect={() => {}}
		/>);

		const initialIndexExpected = getFirstRenderedIndexOf(NB_YEAR_RANGE / 2);

		expect(wrapper.prop('initialIndex')).toBe(initialIndexExpected);

		restoreDate();
	});

	it('should default render with "selectedYear" prop in middle when provided', () => {
		const todayYear = 2025;
		const selectedYear = 2030;
		mockDate(new Date(todayYear, 1, 20));

		const wrapper = shallow(<YearPicker
			selectedYear={selectedYear}
			onSelect={() => {}}
		/>);

		const initialIndexExpected = getFirstRenderedIndexOf(
			(NB_YEAR_RANGE / 2) + (selectedYear - todayYear));

		expect(wrapper.prop('initialIndex')).toBe(initialIndexExpected);

		restoreDate();
	});

	it('should have the right selected year', () => {
		const todayYear = 2025;
		const selectedYear = 2012;
		mockDate(new Date(todayYear, 1, 20));

		const wrapper = shallow(<YearPicker
			selectedYear={selectedYear}
			onSelect={() => {}}
		/>);

		const itemRenderer = wrapper.prop('itemRenderer');
		const items = wrapper.prop('items');

		const elements = items.map(item => itemRenderer(item));

		const selectedElement = elements
			.filter(element => element.props.isSelected === true);

		expect(selectedElement).toHaveLength(1);
		expect(selectedElement[0].props.label).toBe(selectedYear.toString());

		restoreDate();
	});

	it('should callback with the year picked', () => {
		const selectedYear = 2012;
		const yearToSelect = 2013;
		const todayYear = 2014;
		mockDate(new Date(todayYear, 1, 20));

		const onSelect = jest.fn();

		const wrapper = shallow(<YearPicker
			selectedYear={selectedYear}
			onSelect={onSelect}
		/>);

		const itemRenderer = wrapper.prop('itemRenderer');
		const items = wrapper.prop('items');

		const elements = items.map(item => itemRenderer(item));

		const elementToSelect = elements
			.filter(element => element.props.label === yearToSelect.toString())[0];

		const yearToSelectAction = shallow(elementToSelect);

		yearToSelectAction.simulate('click');

		expect(onSelect).toHaveBeenCalledWith(yearToSelect);
	});

	it('should not update the global years range if the selected year change');

	it('should not update the visible years range if the selected year change');
});
