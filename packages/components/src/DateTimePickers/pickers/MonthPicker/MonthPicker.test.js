import React from 'react';
import { shallow } from 'enzyme';

import MonthPicker from './MonthPicker.component';

describe('MonthPicker', () => {
	it('should render', () => {
		const wrapper = shallow(<MonthPicker />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should have exactly one selected month', () => {
		const wrapper = shallow(<MonthPicker
			monthSelected={8}
		/>);

		const actions = wrapper.findWhere(n => n.name() === 'PickerAction');

		expect(actions.length).toBe(12);

		const unselectedActions = actions.filterWhere(action => action.prop('isSelected') === false);
		const selectedActions = actions.filterWhere(action => action.prop('isSelected') === true);

		expect(unselectedActions.length).toBe(11);

		unselectedActions.forEach(action => {
			expect(action.parent().key()).not.toBe('8');
		});

		expect(selectedActions.length).toBe(1);
		const selectedAction = selectedActions.first();
		expect(selectedAction.parent().key()).toBe('8');
	});

	it('should callback with the month index picked', () => {
		const monthIndexToSelect = 5;
		const spy = jest.fn();

		const wrapper = shallow(<MonthPicker
			onMonthSelected={spy}
		/>);

		const juneAction = wrapper.findWhere(n => n.name() === 'PickerAction' && n.parent().key() === monthIndexToSelect.toString());

		expect(juneAction.length).toBe(1);

		juneAction.simulate('click');

		// One call
		expect(spy.mock.calls.length).toBe(1);
		// One argument
		expect(spy.mock.calls[0].length).toBe(1);
		// The correct index
		expect(spy.mock.calls[0][0]).toBe(monthIndexToSelect);
	});
});
