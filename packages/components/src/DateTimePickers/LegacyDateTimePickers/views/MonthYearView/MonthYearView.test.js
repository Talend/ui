import React from 'react';
import { shallow } from 'enzyme';

import MonthYearView from './MonthYearView.component';

describe('MonthYearView', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(
			<MonthYearView
				allowFocus
				onBackClick={jest.fn()}
				onSelectMonth={jest.fn()}
				onSelectYear={jest.fn()}
				selectedMonthIndex={8}
				selectedYear={2012}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should manage tabIndex', () => {
		// given
		const wrapper = shallow(
			<MonthYearView
				onBackClick={jest.fn()}
				onSelectMonth={jest.fn()}
				onSelectYear={jest.fn()}
				selectedMonthIndex={8}
				selectedYear={2012}
			/>,
		);
		expect(
			wrapper
				.find('ViewLayout')
				.shallow()
				.find('Action')
				.at(0)
				.prop('tabIndex'),
		).toBe(-1);

		// when
		wrapper.setProps({ allowFocus: true });

		// then
		expect(
			wrapper
				.find('ViewLayout')
				.shallow()
				.find('Action')
				.at(0)
				.prop('tabIndex'),
		).toBe(0);
	});

	it('should trigger props.onBackClick', () => {
		// given
		const onBackClick = jest.fn();
		const wrapper = shallow(
			<MonthYearView
				onBackClick={onBackClick}
				onSelectMonth={jest.fn()}
				onSelectYear={jest.fn()}
				selectedMonthIndex={8}
				selectedYear={2012}
			/>,
		);
		const event = { target: {} };
		expect(onBackClick).not.toBeCalled();

		// when
		wrapper
			.find('ViewLayout')
			.shallow()
			.find('Action')
			.at(0)
			.simulate('click', event);

		// then
		expect(onBackClick).toBeCalledWith(event);
	});
});
