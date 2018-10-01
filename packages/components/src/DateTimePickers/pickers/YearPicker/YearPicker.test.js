import React from 'react';
import { shallow } from 'enzyme';

import { mockDate, restoreDate } from '../../shared/utils/test/dateMocking';

import YearPicker from './YearPicker.component';

const NB_YEAR_RANGE = 300;

describe('YearPicker', () => {
	beforeAll(() => {
		mockDate();
	});
	afterAll(() => {
		restoreDate();
	});

	it('should render', () => {
		mockDate(new Date(2015, 11, 31));

		const wrapper = shallow(<YearPicker selectedYear={2012} onSelect={() => {}} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should have the right number of years selectable', () => {
		const wrapper = shallow(<YearPicker onSelect={() => {}} />);

		expect(wrapper.prop('items')).toHaveLength(NB_YEAR_RANGE);
	});

	it('should have the correct year range selectable', () => {
		const todayYear = 2022;
		mockDate(new Date(todayYear, 13, 5));

		const wrapper = shallow(<YearPicker onSelect={() => {}} />);

		const firstYearExpected = todayYear - NB_YEAR_RANGE / 2 + 1;
		const lastYearExpected = todayYear + NB_YEAR_RANGE / 2;

		const items = wrapper.prop('items');
		expect(items[0].id).toBe(firstYearExpected);
		const lastIndex = items.length - 1;
		expect(items[lastIndex].id).toBe(lastYearExpected);
	});

	it('should default render with current year in middle when "selectedYear" prop is not provided', () => {
		const currentYear = 2025;
		mockDate(new Date(currentYear, 1, 20));

		const wrapper = shallow(<YearPicker onSelect={() => {}} />);

		expect(wrapper.prop('initialIndex')).toBe(150);
	});

	it('should render with "selectedYear" prop in middle when provided', () => {
		const todayYear = 2025;
		const selectedYear = 2030;
		mockDate(new Date(todayYear, 1, 20));

		const wrapper = shallow(<YearPicker selectedYear={selectedYear} onSelect={() => {}} />);

		expect(wrapper.prop('initialIndex')).toBe(155);
	});

	it('should callback with the year picked', () => {
		const selectedYear = 2012;
		const yearToSelect = 2013;
		const todayYear = 2014;
		mockDate(new Date(todayYear, 1, 20));

		const onSelect = jest.fn();

		const wrapper = shallow(<YearPicker selectedYear={selectedYear} onSelect={onSelect} />);

		const yearItem = wrapper.prop('items').find(item => item.id === yearToSelect);

		const mockedEvent = {
			whatever: 'prop',
		};
		wrapper.prop('onSelect')(mockedEvent, yearItem);

		expect(onSelect).toHaveBeenCalledWith(mockedEvent, yearToSelect);
	});
});
