import React from 'react';
import { shallow, mount } from 'enzyme';
import cases from 'jest-in-case';

import DateView from './DateView.component';

function getActions(wrapper) {
	return wrapper
		.find('ViewLayout')
		.shallow()
		.find('Action');
}

function clickOnPreviousMonth(wrapper) {
	getActions(wrapper)
		.first()
		.simulate('click');
}

function clickOnNextMonth(wrapper) {
	getActions(wrapper)
		.last()
		.simulate('click');
}

describe('DateView', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(
			<DateView
				allowFocus
				calendar={{
					monthIndex: 5,
					year: 2006,
				}}
				onTitleClick={jest.fn()}
				onSelectMonthYear={jest.fn()}
				onSelectDate={jest.fn()}
				onSelectTime={jest.fn()}
				selectedTime={{ hours: '15', minutes: '45' }}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render without timePicker', () => {
		// when
		const wrapper = shallow(
			<DateView
				allowFocus
				calendar={{
					monthIndex: 5,
					year: 2006,
				}}
				onTitleClick={jest.fn()}
				onSelectMonthYear={jest.fn()}
				onSelectDate={jest.fn()}
				onSelectTime={jest.fn()}
				selectedTime={{ hours: '15', minutes: '45' }}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should trigger props.onTitleClick when title is clicked', () => {
		// given
		const onTitleClick = jest.fn();
		const wrapper = mount(
			<DateView
				calendar={{
					monthIndex: 5,
					year: 2006,
				}}
				onSelectMonthYear={jest.fn()}
				onSelectDate={jest.fn()}
				onSelectTime={jest.fn()}
				onTitleClick={onTitleClick}
			/>,
		);
		expect(onTitleClick).not.toBeCalled();

		// when
		const titleAction = wrapper
			.find('ViewLayout')
			.find('HeaderTitle')
			.find('button');
		titleAction.simulate('click');

		// then
		expect(onTitleClick).toBeCalled();
	});

	it('should manage tabIndex', () => {
		// given
		const wrapper = mount(
			<DateView
				calendar={{
					monthIndex: 5,
					year: 2006,
				}}
				onSelectMonthYear={jest.fn()}
				onSelectDate={jest.fn()}
				onSelectTime={jest.fn()}
				onTitleClick={jest.fn()}
			/>,
		);

		expect(
			wrapper
				.find('ViewLayout')
				.find('HeaderTitle')
				.find('button')
				.prop('tabIndex'),
		).toBe(-1);

		// when
		wrapper.setProps({ allowFocus: true });

		// then
		expect(
			wrapper
				.find('ViewLayout')
				.find('HeaderTitle')
				.find('button')
				.prop('tabIndex'),
		).toBe(0);
	});

	cases(
		'month switch management',
		({ calendar, button, expectedMonthYear }) => {
			// given
			const onSelectMonthYear = jest.fn();
			const wrapper = shallow(
				<DateView
					calendar={calendar}
					onTitleClick={jest.fn()}
					onSelectMonthYear={onSelectMonthYear}
					onSelectDate={jest.fn()}
					onSelectTime={jest.fn()}
				/>,
			);
			expect(onSelectMonthYear).not.toBeCalled();

			// when
			if (button === 'previous') {
				clickOnPreviousMonth(wrapper);
			} else if (button === 'next') {
				clickOnNextMonth(wrapper);
			}

			// then
			expect(onSelectMonthYear).toBeCalledWith(expectedMonthYear, undefined);
		},
		[
			{
				name: 'should go to previous month within same year',
				calendar: { monthIndex: 5, year: 2006 },
				button: 'previous',
				expectedMonthYear: { monthIndex: 4, year: 2006 },
			},
			{
				name: 'should go to next month within same year',
				calendar: { monthIndex: 5, year: 2006 },
				button: 'next',
				expectedMonthYear: { monthIndex: 6, year: 2006 },
			},
			{
				name: 'should go from january to previous month',
				calendar: { monthIndex: 0, year: 2006 },
				button: 'previous',
				expectedMonthYear: { monthIndex: 11, year: 2005 },
			},
			{
				name: 'should go from december to next month',
				calendar: { monthIndex: 11, year: 2006 },
				button: 'next',
				expectedMonthYear: { monthIndex: 0, year: 2007 },
			},
		],
	);
});
