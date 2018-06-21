import React from 'react';
import { shallow } from 'enzyme';

import DateTimeView, { euclideanModulo } from './DateTimeView.component';

describe('DateTimeView', () => {
	it('should render', () => {
		const wrapper = shallow(<DateTimeView
			selectedMonthIndex={5}
			selectedYear={2006}
		/>);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should callback when title is clicked', () => {
		const onClickTitle = jest.fn();
		const wrapper = shallow(<DateTimeView
			selectedMonthIndex={5}
			selectedYear={2006}
			onClickTitle={onClickTitle}
		/>);

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

	describe('should callback when month switched with the new month index and year', () => {
		function getActions(wrapper) {
			return wrapper.find('ViewLayout').shallow().find('IconButton');
		}

		function getPreviousAction(wrapper) {
			return getActions(wrapper).first();
		}

		function getNextAction(wrapper) {
			return getActions(wrapper).last();
		}

		it('in simple previous case', () => {
			const onSelectMonthYear = jest.fn();
			const wrapper = shallow(<DateTimeView
				selectedMonthIndex={5}
				selectedYear={2006}
				onSelectMonthYear={onSelectMonthYear}
			/>);

			const previousAction = getPreviousAction(wrapper);

			previousAction.simulate('click');

			expect(onSelectMonthYear).toHaveBeenCalledTimes(1);
			expect(onSelectMonthYear).toHaveBeenCalledWith({
				monthIndex: 4,
				year: 2006,
			});
		});

		it('in simple next case', () => {
			const onSelectMonthYear = jest.fn();
			const wrapper = shallow(<DateTimeView
				selectedMonthIndex={5}
				selectedYear={2006}
				onSelectMonthYear={onSelectMonthYear}
			/>);

			const nextAction = getNextAction(wrapper);
			nextAction.simulate('click');

			expect(onSelectMonthYear).toHaveBeenCalledTimes(1);
			expect(onSelectMonthYear).toHaveBeenCalledWith({
				monthIndex: 6,
				year: 2006,
			});
		});

		it('in advance previous case', () => {
			const onSelectMonthYear = jest.fn();
			const wrapper = shallow(<DateTimeView
				selectedMonthIndex={0}
				selectedYear={2006}
				onSelectMonthYear={onSelectMonthYear}
			/>);

			const previousAction = getPreviousAction(wrapper);
			previousAction.simulate('click');

			expect(onSelectMonthYear).toHaveBeenCalledTimes(1);
			expect(onSelectMonthYear).toHaveBeenCalledWith({
				monthIndex: 11,
				year: 2005,
			});
		});

		it('in advance next case', () => {
			const onSelectMonthYear = jest.fn();
			const wrapper = shallow(<DateTimeView
				selectedMonthIndex={11}
				selectedYear={2006}
				onSelectMonthYear={onSelectMonthYear}
			/>);

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
