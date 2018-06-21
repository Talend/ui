import React from 'react';
import { shallow } from 'enzyme';

import DateTimeView, { euclideanModulo } from './DateTimeView.component';

describe('DateTimeView', () => {
	it('should render', () => {
		const wrapper = shallow(<DateTimeView
			monthIndexSelected={5}
			yearSelected={2006}
		/>);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should callback when title is clicked', () => {
		const spy = jest.fn();
		const wrapper = shallow(<DateTimeView
			monthIndexSelected={5}
			yearSelected={2006}
			onTitleClick={spy}
		/>);

		const headerClickFn = wrapper.find('ViewLayout').shallow()
			.find('HeaderTitle').props().button.onClick;

		headerClickFn();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should callback with the month index updated', () => {
		const spy = jest.fn();
		const wrapper = shallow(<DateTimeView
			monthIndexSelected={5}
			yearSelected={2006}
			onMonthSelected={spy}
		/>);

		const monthActions = wrapper.find('ViewLayout').shallow().find('IconButton');
		const previousAction = monthActions.first();
		const nextAction = monthActions.last();

		// Simple previous case
		wrapper.setProps({
			monthIndexSelected: 5,
			yearSelected: 2006,
		});
		spy.mockClear();
		previousAction.simulate('click');
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(4);

		// Simple next case
		wrapper.setProps({
			monthIndexSelected: 5,
			yearSelected: 2006,
		});
		spy.mockClear();
		nextAction.simulate('click');
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(6);

		// Advance previous case
		wrapper.setProps({
			monthIndexSelected: 0,
			yearSelected: 2006,
		});
		spy.mockClear();
		previousAction.simulate('click');
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(11);

		// Advance next case
		wrapper.setProps({
			monthIndexSelected: 11,
			yearSelected: 2006,
		});
		spy.mockClear();
		nextAction.simulate('click');
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(0);
	});

	it('should callback with the year updated', () => {
		const spy = jest.fn();
		const wrapper = shallow(<DateTimeView
			monthIndexSelected={5}
			yearSelected={2006}
			onYearSelected={spy}
		/>);

		const monthActions = wrapper.find('ViewLayout').shallow().find('IconButton');
		const previousAction = monthActions.first();
		const nextAction = monthActions.last();

		// Simple previous case
		wrapper.setProps({
			monthIndexSelected: 5,
			yearSelected: 2006,
		});
		spy.mockClear();
		previousAction.simulate('click');
		expect(spy).not.toHaveBeenCalled();

		// Simple next case
		wrapper.setProps({
			monthIndexSelected: 5,
			yearSelected: 2006,
		});
		spy.mockClear();
		nextAction.simulate('click');
		expect(spy).not.toHaveBeenCalled();

		// Advance previous case
		wrapper.setProps({
			monthIndexSelected: 0,
			yearSelected: 2006,
		});
		spy.mockClear();
		previousAction.simulate('click');
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(2005);

		// Advance next case
		wrapper.setProps({
			monthIndexSelected: 11,
			yearSelected: 2006,
		});
		spy.mockClear();
		nextAction.simulate('click');
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(2007);
	});
});

describe('euclideanModulo', () => {
	it('should give a positive modulo whatever the input', () => {
		// Dividend lower than divisor (for absolute values)
		expect(euclideanModulo(5, 12)).toBe(5);
		expect(euclideanModulo(-7, 18)).toBe(11);
		expect(euclideanModulo(-4, -7)).toBe(3);
		expect(euclideanModulo(13, -527)).toBe(13);

		// Dividend greater than divisor (for absolute values)
		expect(euclideanModulo(12, 5)).toBe(2);
		expect(euclideanModulo(-527, 13)).toBe(6);
		expect(euclideanModulo(-7, -4)).toBe(1);
		expect(euclideanModulo(18, -7)).toBe(4);

		// Dividend equal than divisor (for absolute values)
		expect(euclideanModulo(12, 12)).toBe(0);
		expect(euclideanModulo(-527, 527)).toBe(0);
		expect(euclideanModulo(-7, -7)).toBe(0);
		expect(euclideanModulo(18, -18)).toBe(0);
	});
});
