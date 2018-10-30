import React from 'react';
import { shallow } from 'enzyme';

import YearPicker from './YearPicker.component';

const NB_YEAR_RANGE = 300;

describe('YearPicker', () => {
	it('should render', () => {
		const OriginalDate = global.Date;
		global.Date = () => new OriginalDate(2015, 11, 31);

		const wrapper = shallow(<YearPicker selectedYear={2012} onSelect={() => {}} />);

		expect(wrapper.getElement()).toMatchSnapshot();
		global.Date = OriginalDate;
	});

	it('should have the right number of years selectable', () => {
		const wrapper = shallow(<YearPicker onSelect={() => {}} />);

		expect(wrapper.prop('items')).toHaveLength(NB_YEAR_RANGE);
	});

	it('should have the correct year range selectable', () => {
		const todayYear = 2022;
		const OriginalDate = global.Date;
		global.Date = () => new OriginalDate(todayYear, 13, 5);

		const wrapper = shallow(<YearPicker onSelect={() => {}} />);

		const firstYearExpected = todayYear - NB_YEAR_RANGE / 2 + 1;
		const lastYearExpected = todayYear + NB_YEAR_RANGE / 2;

		const items = wrapper.prop('items');
		expect(items[0].id).toBe(firstYearExpected);
		const lastIndex = items.length - 1;
		expect(items[lastIndex].id).toBe(lastYearExpected);
		global.Date = OriginalDate;
	});

	it('should default render with current year in middle when "selectedYear" prop is not provided', () => {
		const currentYear = 2025;
		const OriginalDate = global.Date;
		global.Date = () => new OriginalDate(currentYear, 1, 20);

		const wrapper = shallow(<YearPicker onSelect={() => {}} />);

		expect(wrapper.prop('initialIndex')).toBe(150);
		global.Date = OriginalDate;
	});

	it('should render with "selectedYear" prop in middle when provided', () => {
		const todayYear = 2025;
		const selectedYear = 2030;
		const OriginalDate = global.Date;
		global.Date = () => new OriginalDate(todayYear, 1, 20);

		const wrapper = shallow(<YearPicker selectedYear={selectedYear} onSelect={() => {}} />);

		expect(wrapper.prop('initialIndex')).toBe(155);
		global.Date = OriginalDate;
	});

	it('should callback with the year picked', () => {
		const selectedYear = 2012;
		const yearToSelect = 2013;
		const todayYear = 2014;
		const OriginalDate = global.Date;
		global.Date = () => new OriginalDate(todayYear, 1, 20);

		const onSelect = jest.fn();

		const wrapper = shallow(<YearPicker selectedYear={selectedYear} onSelect={onSelect} />);

		const yearItem = wrapper.prop('items').find(item => item.id === yearToSelect);

		const mockedEvent = {
			whatever: 'prop',
		};
		wrapper.prop('onSelect')(mockedEvent, yearItem);

		expect(onSelect).toHaveBeenCalledWith(mockedEvent, yearToSelect);
		global.Date = OriginalDate;
	});
});
