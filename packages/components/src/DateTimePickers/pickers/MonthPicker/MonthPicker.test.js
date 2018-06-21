import React from 'react';
import { shallow } from 'enzyme';

import MonthPicker from './MonthPicker.component';

describe('MonthPicker', () => {
	it('should render', () => {
		const wrapper = shallow(<MonthPicker />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should have exactly one selected month', () => {
		const monthIndex = 8;
		const wrapper = shallow(<MonthPicker
			monthIndexSelected={monthIndex}
		/>);

		const actions = wrapper.findWhere(n => n.name() === 'PickerAction');

		expect(actions.length).toBe(12);

		const unselectedActions = actions.filterWhere(action => action.prop('isSelected') === false);
		const selectedActions = actions.filterWhere(action => action.prop('isSelected') === true);

		expect(unselectedActions.length).toBe(11);

		unselectedActions.forEach(action => {
			expect(action.parent().key()).not.toBe(monthIndex.toString());
		});

		expect(selectedActions.length).toBe(1);
		const selectedAction = selectedActions.first();
		expect(selectedAction.parent().key()).toBe(monthIndex.toString());
	});

	it('should callback with the month index picked', () => {
		const monthIndexToSelect = 5;
		const onMonthSelected = jest.fn();

		const wrapper = shallow(<MonthPicker
			onMonthSelected={onMonthSelected}
		/>);

		const juneAction = wrapper.findWhere(n =>
			n.name() === 'PickerAction'
			&& n.parent().key() === monthIndexToSelect.toString()
		);

		expect(juneAction.length).toBe(1);

		juneAction.simulate('click');

		expect(onMonthSelected).toHaveBeenCalledTimes(1);
		expect(onMonthSelected).toHaveBeenCalledWith(monthIndexToSelect);
	});
});
