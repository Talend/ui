import React from 'react';
import { shallow } from 'enzyme';

import DateTimeView from './DateTimeView.component';

describe('DateTimeView', () => {
	it('should render', () => {
		const wrapper = shallow(<DateTimeView
			monthSelected={5}
			yearSelected={2006}
		/>);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should callback with the new month index selected', () => {
		const spy = jest.fn();
		const wrapper = shallow(<DateTimeView
			monthSelected={5}
			yearSelected={2006}
			onMonthSelected={spy}
		/>);

		const monthActions = wrapper.find('ViewLayout').shallow().find('IconButton');
		const previousAction = monthActions.first();
		const nextAction = monthActions.last();

		// Simple previous case
		wrapper.setProps({
			monthSelected: 5,
			yearSelected: 2006,
		});
		spy.mockClear();
		previousAction.simulate('click');
		expect(spy.mock.calls[0][0]).toBe(4);

		// Simple next case
		wrapper.setProps({
			monthSelected: 5,
			yearSelected: 2006,
		});
		spy.mockClear();
		nextAction.simulate('click');
		expect(spy.mock.calls[0][0]).toBe(6);

		// Advance previous case
		wrapper.setProps({
			monthSelected: 0,
			yearSelected: 2006,
		});
		spy.mockClear();
		previousAction.simulate('click');
		expect(spy.mock.calls[0][0]).toBe(11);

		// Advance next case
		wrapper.setProps({
			monthSelected: 11,
			yearSelected: 2006,
		});
		spy.mockClear();
		nextAction.simulate('click');
		expect(spy.mock.calls[0][0]).toBe(0);
	});

	it('should callback with the new year selected if changed', () => {
		const spy = jest.fn();
		const wrapper = shallow(<DateTimeView
			monthSelected={5}
			yearSelected={2006}
			onYearSelected={spy}
		/>);

		const monthActions = wrapper.find('ViewLayout').shallow().find('IconButton');
		const previousAction = monthActions.first();
		const nextAction = monthActions.last();

		// Simple previous case
		wrapper.setProps({
			monthSelected: 5,
			yearSelected: 2006,
		});
		spy.mockClear();
		previousAction.simulate('click');
		expect(spy.mock.calls.length).toBe(0);

		// Simple next case
		wrapper.setProps({
			monthSelected: 5,
			yearSelected: 2006,
		});
		spy.mockClear();
		nextAction.simulate('click');
		expect(spy.mock.calls.length).toBe(0);

		// Advance previous case
		wrapper.setProps({
			monthSelected: 0,
			yearSelected: 2006,
		});
		spy.mockClear();
		previousAction.simulate('click');
		expect(spy.mock.calls.length).toBe(1);
		expect(spy.mock.calls[0][0]).toBe(2005);

		// Advance next case
		wrapper.setProps({
			monthSelected: 11,
			yearSelected: 2006,
		});
		spy.mockClear();
		nextAction.simulate('click');
		expect(spy.mock.calls.length).toBe(1);
		expect(spy.mock.calls[0][0]).toBe(2007);
	});
});
