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
		const onTitleClick = jest.fn();
		const wrapper = shallow(<DateTimeView
			monthIndexSelected={5}
			yearSelected={2006}
			onTitleClick={onTitleClick}
		/>);

		const headerClickFn = wrapper.find('ViewLayout').shallow()
			.find('HeaderTitle').props().button.onClick;

		headerClickFn();
		expect(onTitleClick).toHaveBeenCalledTimes(1);
	});

	describe('should callback when switch month', () => {
		function getActions(wrapper) {
			return wrapper.find('ViewLayout').shallow().find('IconButton');
		}

		function getPreviousAction(wrapper) {
			return getActions(wrapper).first();
		}

		function getNextAction(wrapper) {
			return getActions(wrapper).last();
		}

		describe('with the month index updated', () => {
			it('in simple previous case', () => {
				const onMonthSelected = jest.fn();
				const wrapper = shallow(<DateTimeView
					monthIndexSelected={5}
					yearSelected={2006}
					onMonthSelected={onMonthSelected}
				/>);

				const previousAction = getPreviousAction(wrapper);
				previousAction.simulate('click');

				expect(onMonthSelected).toHaveBeenCalledTimes(1);
				expect(onMonthSelected).toHaveBeenCalledWith(4);
			});

			it('in simple next case', () => {
				const onMonthSelected = jest.fn();
				const wrapper = shallow(<DateTimeView
					monthIndexSelected={5}
					yearSelected={2006}
					onMonthSelected={onMonthSelected}
				/>);

				const nextAction = getNextAction(wrapper);
				nextAction.simulate('click');

				expect(onMonthSelected).toHaveBeenCalledTimes(1);
				expect(onMonthSelected).toHaveBeenCalledWith(6);
			});

			it('in advance previous case', () => {
				const onMonthSelected = jest.fn();
				const wrapper = shallow(<DateTimeView
					monthIndexSelected={0}
					yearSelected={2006}
					onMonthSelected={onMonthSelected}
				/>);

				const previousAction = getPreviousAction(wrapper);
				previousAction.simulate('click');

				expect(onMonthSelected).toHaveBeenCalledTimes(1);
				expect(onMonthSelected).toHaveBeenCalledWith(11);
			});

			it('in advance next case', () => {
				const onMonthSelected = jest.fn();
				const wrapper = shallow(<DateTimeView
					monthIndexSelected={11}
					yearSelected={2006}
					onMonthSelected={onMonthSelected}
				/>);

				const nextAction = getNextAction(wrapper);
				nextAction.simulate('click');

				expect(onMonthSelected).toHaveBeenCalledTimes(1);
				expect(onMonthSelected).toHaveBeenCalledWith(0);
			});
		});

		describe('with the year updated if needed', () => {
			it('in simple previous case', () => {
				const onYearSelected = jest.fn();
				const wrapper = shallow(<DateTimeView
					monthIndexSelected={5}
					yearSelected={2006}
					onYearSelected={onYearSelected}
				/>);

				const previousAction = getPreviousAction(wrapper);
				previousAction.simulate('click');

				expect(onYearSelected).not.toHaveBeenCalled();
			});

			it('in simple next case', () => {
				const onYearSelected = jest.fn();
				const wrapper = shallow(<DateTimeView
					monthIndexSelected={5}
					yearSelected={2006}
					onYearSelected={onYearSelected}
				/>);

				const nextAction = getNextAction(wrapper);
				nextAction.simulate('click');

				expect(onYearSelected).not.toHaveBeenCalled();
			});

			it('in advance previous case', () => {
				const onYearSelected = jest.fn();
				const wrapper = shallow(<DateTimeView
					monthIndexSelected={0}
					yearSelected={2006}
					onYearSelected={onYearSelected}
				/>);

				const previousAction = getPreviousAction(wrapper);
				previousAction.simulate('click');

				expect(onYearSelected).toHaveBeenCalledTimes(1);
				expect(onYearSelected).toHaveBeenCalledWith(2005);
			});

			it('in advance next case', () => {
				const onYearSelected = jest.fn();
				const wrapper = shallow(<DateTimeView
					monthIndexSelected={11}
					yearSelected={2006}
					onYearSelected={onYearSelected}
				/>);

				const nextAction = getNextAction(wrapper);
				nextAction.simulate('click');

				expect(onYearSelected).toHaveBeenCalledTimes(1);
				expect(onYearSelected).toHaveBeenCalledWith(2007);
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
