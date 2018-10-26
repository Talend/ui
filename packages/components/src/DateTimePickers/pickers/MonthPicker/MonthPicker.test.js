import React from 'react';
import { shallow } from 'enzyme';

import MonthPicker from './MonthPicker.component';

describe('MonthPicker', () => {
	beforeAll(() => {
		mockDate();
	});
	afterAll(() => {
		restoreDate();
	});

	it('should render', () => {
		const wrapper = shallow(<MonthPicker onSelect={() => {}} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should have exactly one selected month', () => {
		const monthIndex = 8;
		const wrapper = shallow(<MonthPicker selectedMonthIndex={monthIndex} onSelect={() => {}} />);

		const actions = wrapper.find('PickerAction');

		expect(actions.length).toBe(12);

		const selectedActions = actions.filterWhere(action => action.prop('isSelected') === true);

		expect(selectedActions.length).toBe(1);
		const selectedAction = selectedActions.first();
		expect(selectedAction.parent().key()).toBe(monthIndex.toString());
	});

	it('should callback with the month index picked', () => {
		const monthIndexToSelect = 5;
		const onSelect = jest.fn();

		const wrapper = shallow(<MonthPicker onSelect={onSelect} />);

		const juneAction = wrapper
			.findWhere(n => n.key() === monthIndexToSelect.toString())
			.first()
			.find('PickerAction');

		const mockedEvent = {
			whatever: 'prop',
		};

		juneAction.simulate('click', mockedEvent);

		expect(onSelect).toHaveBeenCalledWith(mockedEvent, monthIndexToSelect);
	});
});
