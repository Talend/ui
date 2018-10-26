import React from 'react';
import { shallow } from 'enzyme';

import DateTimeView, { euclideanModulo } from './DateTimeView.component';

describe('DateTimeView', () => {
	beforeAll(() => {
		mockDate();
	});
	afterAll(() => {
		restoreDate();
	});

	it('should render', () => {
		const wrapper = shallow(
			<DateTimeView
				calendar={{
					monthIndex: 5,
					year: 2006,
				}}
				onClickTitle={() => {}}
				onSelectMonthYear={() => {}}
				onSelectDate={() => {}}
				onSelectTime={() => {}}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should callback when title is clicked', () => {
		const onClickTitle = jest.fn();
		const wrapper = shallow(
			<DateTimeView
				calendar={{
					monthIndex: 5,
					year: 2006,
				}}
				onClickTitle={onClickTitle}
				onSelectMonthYear={() => {}}
				onSelectDate={() => {}}
				onSelectTime={() => {}}
			/>,
		);

		const titleAction = wrapper
			.find('ViewLayout')
			.shallow()
			.find('HeaderTitle')
			.first()
			.shallow()
			.find('button');

		titleAction.simulate('click');
		expect(onClickTitle).toHaveBeenCalledTimes(1);
	});

	describe('month switch management', () => {
		function getActions(wrapper) {
			return wrapper
				.find('ViewLayout')
				.shallow()
				.find('IconButton');
		}

		function getPreviousAction(wrapper) {
			return getActions(wrapper).first();
		}

		function getNextAction(wrapper) {
			return getActions(wrapper).last();
		}

		it('should trigger callback when previous month is clicked with previous month and current year', () => {
			const onSelectMonthYear = jest.fn();
			const wrapper = shallow(
				<DateTimeView
					calendar={{
						monthIndex: 5,
						year: 2006,
					}}
					onClickTitle={() => {}}
					onSelectMonthYear={onSelectMonthYear}
					onSelectDate={() => {}}
					onSelectTime={() => {}}
				/>,
			);

			const previousAction = getPreviousAction(wrapper);

			previousAction.simulate('click');

			expect(onSelectMonthYear).toHaveBeenCalledTimes(1);
			expect(onSelectMonthYear).toHaveBeenCalledWith({
				monthIndex: 4,
				year: 2006,
			});
		});

		it('should trigger callback when next month is clicked with next month and current year', () => {
			const onSelectMonthYear = jest.fn();
			const wrapper = shallow(
				<DateTimeView
					calendar={{
						monthIndex: 5,
						year: 2006,
					}}
					onClickTitle={() => {}}
					onSelectMonthYear={onSelectMonthYear}
					onSelectDate={() => {}}
					onSelectTime={() => {}}
				/>,
			);

			const nextAction = getNextAction(wrapper);
			nextAction.simulate('click');

			expect(onSelectMonthYear).toHaveBeenCalledTimes(1);
			expect(onSelectMonthYear).toHaveBeenCalledWith({
				monthIndex: 6,
				year: 2006,
			});
		});

		it('should trigger callback when previous month is clicked with last month of year and previous year', () => {
			const onSelectMonthYear = jest.fn();
			const wrapper = shallow(
				<DateTimeView
					calendar={{
						monthIndex: 0,
						year: 2006,
					}}
					onClickTitle={() => {}}
					onSelectMonthYear={onSelectMonthYear}
					onSelectDate={() => {}}
					onSelectTime={() => {}}
				/>,
			);

			const previousAction = getPreviousAction(wrapper);
			previousAction.simulate('click');

			expect(onSelectMonthYear).toHaveBeenCalledTimes(1);
			expect(onSelectMonthYear).toHaveBeenCalledWith({
				monthIndex: 11,
				year: 2005,
			});
		});

		it('should trigger callback when next month is clicked with first month of year and next year', () => {
			const onSelectMonthYear = jest.fn();
			const wrapper = shallow(
				<DateTimeView
					calendar={{
						monthIndex: 11,
						year: 2006,
					}}
					onClickTitle={() => {}}
					onSelectMonthYear={onSelectMonthYear}
					onSelectDate={() => {}}
					onSelectTime={() => {}}
				/>,
			);

			const nextAction = getNextAction(wrapper);
			nextAction.simulate('click');

			expect(onSelectMonthYear).toHaveBeenCalledTimes(1);
			expect(onSelectMonthYear).toHaveBeenCalledWith({
				monthIndex: 0,
				year: 2007,
			});
		});
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
