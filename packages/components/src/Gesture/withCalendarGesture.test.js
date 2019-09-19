import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import keycode from 'keycode';
import { withCalendarGesture, withMonthCalendarGesture } from './withCalendarGesture';
import DayCalendar from '../../__mocks__/day-calendar';
import MonthCalendar from '../../__mocks__/month-calendar';

/**
 * Mock on March 2018
 * 	M	T	W	T	F	S	S
 *				1	2	3	4
 *	5	6	7	8	9	10	11
 *	12	13	14	15	16	17	18
 *	19	20	21	22	23	24	25
 *	26	27	28	29	30	31
 */
const MockWithGesture = withCalendarGesture(DayCalendar);
class DayCalendarWithGesture extends React.Component {
	static propTypes = {
		goToPreviousMonth: PropTypes.func,
		goToNextMonth: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = { month: 2, year: 2018 };

		this.goToPreviousMonth = this.goToPreviousMonth.bind(this);
		this.goToNextMonth = this.goToNextMonth.bind(this);
	}

	goToPreviousMonth(callback) {
		this.setState({ month: 1 }, callback);
		this.props.goToPreviousMonth();
	}

	goToNextMonth(callback) {
		this.setState({ month: 3 }, callback);
		this.props.goToNextMonth();
	}

	render() {
		return (
			<MockWithGesture
				goToPreviousMonth={this.goToPreviousMonth}
				goToNextMonth={this.goToNextMonth}
				{...this.state}
			/>
		);
	}
}

/**
 * Mock on a 3-month sets of months
 * 	JAN		FEB		MAR
 * 	APR		MAY		JUN
 * 	JUL		AUG		SEP
 * 	OCT		NOV		DEC
 */
const MonthCalendarWithGesture = withMonthCalendarGesture(MonthCalendar, /* Row size */ 3);

/**
 * Tests start from March 2018
 * 	M	T	W	T	F	S	S
 *				1	2	3	4
 *	5	6	7	8	9	10	11
 *	12	13	14	15	16	17	18
 *	19	20	21	22	23	24	25
 *	26	27	28	29	30	31
 */
describe('withCalendarGesture', () => {
	describe('LEFT keydown', () => {
		it('should focus on previous day in same week', () => {
			// given
			const wrapper = mount(<DayCalendarWithGesture />);

			// when
			wrapper
				.find('button[id]')
				.at(13) // 2018-03-14
				.simulate('keydown', { keyCode: keycode.codes.left });

			// then
			expect(document.activeElement.innerHTML).toBe('13');
		});

		it('should focus on previous day in the week before', () => {
			// given
			const wrapper = mount(<DayCalendarWithGesture />);

			// when
			wrapper
				.find('button[id]')
				.at(11) // 2018-03-12
				.simulate('keydown', { keyCode: keycode.codes.left });

			// then
			expect(document.activeElement.innerHTML).toBe('11');
		});

		it('should focus on previous day in the month before', () => {
			// given
			const goToPreviousMonth = jest.fn();
			const wrapper = mount(<DayCalendarWithGesture goToPreviousMonth={goToPreviousMonth} />);
			expect(goToPreviousMonth).not.toBeCalled();

			// when
			wrapper
				.find('button[id]')
				.at(0) // 2018-03-01
				.simulate('keydown', { keyCode: keycode.codes.left });

			// then
			expect(goToPreviousMonth).toBeCalled();
			expect(document.activeElement.innerHTML).toBe('28'); // 2018-02-28
		});
	});

	describe('RIGHT keydown', () => {
		it('should focus on next day in same week', () => {
			// given
			const wrapper = mount(<DayCalendarWithGesture />);

			// when
			wrapper
				.find('button[id]')
				.at(13) // 2018-03-14
				.simulate('keydown', { keyCode: keycode.codes.right });

			// then
			expect(document.activeElement.innerHTML).toBe('15');
		});

		it('should focus on next day in the week after', () => {
			// given
			const wrapper = mount(<DayCalendarWithGesture />);

			// when
			wrapper
				.find('button[id]')
				.at(17) // 2018-03-18
				.simulate('keydown', { keyCode: keycode.codes.right });

			// then
			expect(document.activeElement.innerHTML).toBe('19');
		});

		it('should focus on next day in the month after', () => {
			// given
			const goToNextMonth = jest.fn();
			const wrapper = mount(<DayCalendarWithGesture goToNextMonth={goToNextMonth} />);
			expect(goToNextMonth).not.toBeCalled();

			// when
			wrapper
				.find('button[id]')
				.at(30) // 2018-03-31
				.simulate('keydown', { keyCode: keycode.codes.right });

			// then
			expect(goToNextMonth).toBeCalled();
			expect(document.activeElement.innerHTML).toBe('1'); // 2018-04-01
		});
	});

	describe('UP keydown', () => {
		it('should focus on previous week', () => {
			// given
			const wrapper = mount(<DayCalendarWithGesture />);

			// when
			wrapper
				.find('button[id]')
				.at(13) // 2018-03-14
				.simulate('keydown', { keyCode: keycode.codes.up });

			// then
			expect(document.activeElement.innerHTML).toBe('7'); // 2018-03-07
		});

		it('should focus on previous week in the month before', () => {
			// given
			const goToPreviousMonth = jest.fn();
			const wrapper = mount(<DayCalendarWithGesture goToPreviousMonth={goToPreviousMonth} />);
			expect(goToPreviousMonth).not.toBeCalled();

			// when
			wrapper
				.find('button[id]')
				.at(5) // 2018-03-06
				.simulate('keydown', { keyCode: keycode.codes.up });

			// then
			expect(goToPreviousMonth).toBeCalled();
			expect(document.activeElement.innerHTML).toBe('27'); // 2018-02-27
		});
	});

	describe('DOWN keydown', () => {
		it('should focus on next week', () => {
			// given
			const wrapper = mount(<DayCalendarWithGesture />);

			// when
			wrapper
				.find('button[id]')
				.at(13) // 2018-03-14
				.simulate('keydown', { keyCode: keycode.codes.down });

			// then
			expect(document.activeElement.innerHTML).toBe('21'); // 2018-03-21
		});

		it('should focus on next week in the month after', () => {
			// given
			const goToNextMonth = jest.fn();
			const wrapper = mount(<DayCalendarWithGesture goToNextMonth={goToNextMonth} />);
			expect(goToNextMonth).not.toBeCalled();

			// when
			wrapper
				.find('button[id]')
				.at(27) // 2018-03-28
				.simulate('keydown', { keyCode: keycode.codes.down });

			// then
			expect(goToNextMonth).toBeCalled();
			expect(document.activeElement.innerHTML).toBe('4'); // 2018-04-04
		});
	});

	describe('HOME keydown', () => {
		it('should focus on first day of the month', () => {
			// given
			const wrapper = mount(<DayCalendarWithGesture />);

			// when
			wrapper
				.find('button[id]')
				.at(13) // 2018-03-14
				.simulate('keydown', { keyCode: keycode.codes.home });

			// then
			expect(document.activeElement.innerHTML).toBe('1'); // 2018-03-01
		});
	});

	describe('END keydown', () => {
		it('should focus on last day of the month', () => {
			// given
			const wrapper = mount(<DayCalendarWithGesture />);

			// when
			wrapper
				.find('button[id]')
				.at(13) // 2018-03-14
				.simulate('keydown', { keyCode: keycode.codes.end });

			// then
			expect(document.activeElement.innerHTML).toBe('31'); // 2018-03-31
		});
	});

	describe('PAGE UP keydown', () => {
		it('should go to previous month and focus on the same day', () => {
			// given
			const goToPreviousMonth = jest.fn();
			const wrapper = mount(<DayCalendarWithGesture goToPreviousMonth={goToPreviousMonth} />);
			expect(goToPreviousMonth).not.toBeCalled();

			// when
			wrapper
				.find('button[id]')
				.at(13) // 2018-03-14
				.simulate('keydown', { keyCode: keycode.codes['page up'] });

			// then
			expect(goToPreviousMonth).toBeCalled();
			expect(document.activeElement.innerHTML).toBe('14'); // 2018-02-14
		});

		it('should go to previous month and focus on the last day if same day does not exist', () => {
			// given
			const goToPreviousMonth = jest.fn();
			const wrapper = mount(<DayCalendarWithGesture goToPreviousMonth={goToPreviousMonth} />);
			expect(goToPreviousMonth).not.toBeCalled();

			// when
			wrapper
				.find('button[id]')
				.at(30) // 2018-03-31
				.simulate('keydown', { keyCode: keycode.codes['page up'] });

			// then
			expect(goToPreviousMonth).toBeCalled();
			expect(document.activeElement.innerHTML).toBe('28'); // 2018-02-28
		});
	});

	describe('PAGE DOWN keydown', () => {
		it('should go to next month and focus on the same day', () => {
			// given
			const goToNextMonth = jest.fn();
			const wrapper = mount(<DayCalendarWithGesture goToNextMonth={goToNextMonth} />);
			expect(goToNextMonth).not.toBeCalled();

			// when
			wrapper
				.find('button[id]')
				.at(13) // 2018-03-14
				.simulate('keydown', { keyCode: keycode.codes['page down'] });

			// then
			expect(goToNextMonth).toBeCalled();
			expect(document.activeElement.innerHTML).toBe('14'); // 2018-04-14
		});

		it('should go to next month and focus on the last day if same day does not exist', () => {
			// given
			const goToNextMonth = jest.fn();
			const wrapper = mount(<DayCalendarWithGesture goToNextMonth={goToNextMonth} />);
			expect(goToNextMonth).not.toBeCalled();

			// when
			wrapper
				.find('button[id]')
				.at(30) // 2018-03-31
				.simulate('keydown', { keyCode: keycode.codes['page down'] });

			// then
			expect(goToNextMonth).toBeCalled();
			expect(document.activeElement.innerHTML).toBe('30'); // 2018-04-30
		});
	});
});

/**
 * Tests on a 3-month sets of months
 * 	JAN		FEB		MAR
 * 	APR		MAY		JUN
 * 	JUL		AUG		SEP
 * 	OCT		NOV		DEC
 */
describe('withMonthCalendarGesture', () => {
	describe('LEFT keydown', () => {
		it('should focus on previous month in the same set of months', () => {
			// given
			const wrapper = mount(<MonthCalendarWithGesture />);

			// when
			wrapper
				.find('button')
				.at(4) // MAY
				.simulate('keydown', { keyCode: keycode.codes.left });

			// then
			expect(document.activeElement.innerHTML).toBe('APR');
		});

		it('should focus on the previous month in the previous set of months', () => {
			// given
			const wrapper = mount(<MonthCalendarWithGesture />);

			// when
			wrapper
				.find('button')
				.at(3) // APR
				.simulate('keydown', { keyCode: keycode.codes.left });

			// then
			expect(document.activeElement.innerHTML).toBe('MAR');
		});

		it('should block focus on first month', () => {
			// given
			const wrapper = mount(<MonthCalendarWithGesture />);

			// when
			wrapper
				.find('button')
				.at(0) // JAN
				.simulate('keydown', { keyCode: keycode.codes.left });

			// then
			expect(document.activeElement.innerHTML).toBe('JAN');
		});
	});

	describe('RIGHT keydown', () => {
		it('should focus on next month in the same set of months', () => {
			// given
			const wrapper = mount(<MonthCalendarWithGesture />);

			// when
			wrapper
				.find('button')
				.at(4) // MAY
				.simulate('keydown', { keyCode: keycode.codes.right });

			// then
			expect(document.activeElement.innerHTML).toBe('JUN');
		});

		it('should focus on the next month in the next set of months', () => {
			// given
			const wrapper = mount(<MonthCalendarWithGesture />);

			// when
			wrapper
				.find('button')
				.at(5) // JUN
				.simulate('keydown', { keyCode: keycode.codes.right });

			// then
			expect(document.activeElement.innerHTML).toBe('JULY');
		});

		it('should block focus on last month', () => {
			// given
			const wrapper = mount(<MonthCalendarWithGesture />);

			// when
			wrapper
				.find('button')
				.at(11) // DEC
				.simulate('keydown', { keyCode: keycode.codes.right });

			// then
			expect(document.activeElement.innerHTML).toBe('DEC');
		});
	});

	describe('UP keydown', () => {
		it('should focus on previous set of month', () => {
			// given
			const wrapper = mount(<MonthCalendarWithGesture />);

			// when
			wrapper
				.find('button')
				.at(4) // MAY
				.simulate('keydown', { keyCode: keycode.codes.up });

			// then
			expect(document.activeElement.innerHTML).toBe('FEB');
		});

		it('should block focus when there is no previous set of month', () => {
			// given
			const wrapper = mount(<MonthCalendarWithGesture />);
			// when
			wrapper
				.find('button')
				.at(1) // FEB
				.simulate('keydown', { keyCode: keycode.codes.up });

			// then
			expect(document.activeElement.innerHTML).toBe('JAN');
		});
	});

	describe('DOWN keydown', () => {
		it('should focus on next set of month', () => {
			// given
			const wrapper = mount(<MonthCalendarWithGesture />);

			// when
			wrapper
				.find('button')
				.at(4) // MAY
				.simulate('keydown', { keyCode: keycode.codes.down });

			// then
			expect(document.activeElement.innerHTML).toBe('AUG');
		});

		it('should block focus when there is no following set of month', () => {
			// given
			const wrapper = mount(<MonthCalendarWithGesture />);

			// when
			wrapper
				.find('button')
				.at(10) // NOV
				.simulate('keydown', { keyCode: keycode.codes.down });

			// then
			expect(document.activeElement.innerHTML).toBe('DEC');
		});
	});

	describe('HOME keydown', () => {
		it('should focus on first month', () => {
			// given
			const wrapper = mount(<MonthCalendarWithGesture />);

			// when
			wrapper
				.find('button')
				.at(4) // MAY
				.simulate('keydown', { keyCode: keycode.codes.home });

			// then
			expect(document.activeElement.innerHTML).toBe('JAN');
		});
	});

	describe('END keydown', () => {
		it('should focus on last month', () => {
			// given
			const wrapper = mount(<MonthCalendarWithGesture />);

			// when
			wrapper
				.find('button')
				.at(4) // MAY
				.simulate('keydown', { keyCode: keycode.codes.end });

			// then
			expect(document.activeElement.innerHTML).toBe('DEC');
		});
	});
});
