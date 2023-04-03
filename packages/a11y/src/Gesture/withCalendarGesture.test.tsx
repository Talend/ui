import React from 'react';
import { render, screen, configure } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withCalendarGesture } from './withCalendarGesture';
import DayCalendar from '../../__mocks__/day-calendar';
import { CalendarGestureProps } from './propTypes';
configure({ testIdAttribute: 'data-test' });
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

type DateCalendarState = {
	month: number;
	year: number;
};

class DayCalendarWithGesture extends React.Component<CalendarGestureProps, DateCalendarState> {
	constructor(props: CalendarGestureProps) {
		super(props);
		// 0 jan, 1 feb
		this.state = { month: 2, year: 2018 };

		this.goToPreviousMonth = this.goToPreviousMonth.bind(this);
		this.goToNextMonth = this.goToNextMonth.bind(this);
	}

	goToPreviousMonth(callback?: () => void) {
		this.setState({ month: this.state.month - 1 }, callback);
		if (this.props.goToPreviousMonth) {
			this.props.goToPreviousMonth(callback);
		}
	}

	goToNextMonth(callback?: () => void) {
		this.setState({ month: this.state.month + 1 }, callback);
		if (this.props.goToNextMonth) {
			this.props.goToNextMonth(callback);
		}
	}

	render() {
		const props = { ...this.state };
		return (
			<MockWithGesture
				goToPreviousMonth={this.goToPreviousMonth}
				goToNextMonth={this.goToNextMonth}
				{...props}
			/>
		);
	}
}

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
	const props = {
		goToPreviousMonth: jest.fn(),
		goToNextMonth: jest.fn(),
	};
	beforeEach(() => {
		jest.clearAllMocks();
	});
	describe('LEFT keydown', () => {
		it('should focus on previous day in same week', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);
			// when
			await userEvent.click(screen.getByTestId('12'));
			expect(screen.getByTestId('12')).toHaveFocus();

			await userEvent.keyboard('[ArrowLeft]');

			// then
			expect(screen.getByTestId('11')).toHaveFocus();
		});

		it('should focus on previous day in the week before', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);
			screen.getByTestId('11').focus();
			// await fireEvent.focus(screen.getByTestId('11'));
			expect(screen.getByTestId('11')).toHaveFocus();
			// await fireEvent.keyDown(screen.getByTestId('11'), { key: 'ArrowLeft', code: 'ArrowLeft' });
			await userEvent.keyboard('[ArrowLeft]');
			// 			// when
			// 			wrapper
			// 				.find('button[data-value]')
			// 				.at(11) // 2018-03-12
			// 				.simulate('keydown', { keyCode: keycode.codes.left });

			// 			// then
			// await userEvent.keyboard('[ArrowLeft]');

			expect(screen.getByTestId('10')).toHaveFocus();
			// 			expect(document.activeElement.innerHTML).toBe('11');
			// 			wrapper.detach();
		});

		it('should focus on previous day in the month before', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);
			expect(props.goToPreviousMonth).not.toBeCalled();

			// when
			screen.getByTestId('1').focus();
			await userEvent.keyboard('[ArrowLeft]');

			// then
			expect(props.goToPreviousMonth).toBeCalled();
			expect(screen.getByTestId('28')).toHaveFocus();
		});
	});

	describe('RIGHT keydown', () => {
		it('should focus on next day in same week', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);

			// when
			screen.getByTestId('14').focus();
			await userEvent.keyboard('[ArrowRight]');

			// then
			expect(screen.getByTestId('15')).toHaveFocus();
		});
		it('should focus on next day in the week after', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);
			// when
			screen.getByTestId('18').focus();
			await userEvent.keyboard('[ArrowRight]');
			// then
			expect(screen.getByTestId('19')).toHaveFocus();
		});
		it('should focus on next day in the month after', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);
			expect(props.goToNextMonth).not.toBeCalled();
			// when
			screen.getByTestId('31').focus();
			await userEvent.keyboard('[ArrowRight]');
			// then
			expect(props.goToNextMonth).toBeCalled();
			expect(screen.getByTestId('1')).toHaveFocus();
		});
	});

	describe('UP keydown', () => {
		it('should focus on previous week', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);

			// when
			screen.getByTestId('14').focus();
			await userEvent.keyboard('[ArrowUp]');

			// then
			expect(screen.getByTestId('7')).toHaveFocus();
		});

		it('should focus on previous week in the month before', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);
			expect(props.goToPreviousMonth).not.toBeCalled();

			// when
			screen.getByTestId('6').focus();
			await userEvent.keyboard('[ArrowUp]');

			// then
			expect(props.goToPreviousMonth).toBeCalled();
			expect(screen.getByTestId('27')).toHaveFocus();
		});
	});

	describe('DOWN keydown', () => {
		it('should focus on next week', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);
			// when
			screen.getByTestId('14').focus();
			await userEvent.keyboard('[ArrowDown]');
			// then
			expect(screen.getByTestId('21')).toHaveFocus(); // 2018-04-21
		});
		it('should focus on next week in the month after', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);
			expect(props.goToNextMonth).not.toBeCalled();
			// when
			screen.getByTestId('28').focus(); // 2018-03-28
			await userEvent.keyboard('[ArrowDown]');
			// then
			expect(props.goToNextMonth).toBeCalled();
			expect(screen.getByTestId('4')).toHaveFocus(); // 2018-04-04
		});
	});

	describe('HOME keydown', () => {
		it('should focus on first day of the month', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);

			// when
			screen.getByTestId('14').focus(); // 2018-03-14
			await userEvent.keyboard('[Home]');

			// then
			expect(screen.getByTestId('1')).toHaveFocus(); // 2018-03-01
		});
	});

	describe('END keydown', () => {
		it('should focus on last day of the month', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);

			// when
			screen.getByTestId('14').focus(); // 2018-03-14
			await userEvent.keyboard('[End]');

			// then
			expect(screen.getByTestId('31')).toHaveFocus(); // 2018-03-31
		});
	});

	describe('PAGE UP keydown', () => {
		it('should go to previous month and focus on the same day', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);
			expect(props.goToPreviousMonth).not.toBeCalled();

			// when
			screen.getByTestId('14').focus(); // 2018-03-14
			await userEvent.keyboard('[PageUp]');

			// then
			expect(props.goToPreviousMonth).toBeCalled();
			expect(screen.getByTestId('14')).toHaveFocus(); // 2018-02-14
		});

		it('should go to previous month and focus on the last day if same day does not exist', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);
			expect(props.goToPreviousMonth).not.toBeCalled();

			// when
			screen.getByTestId('31').focus(); // 2018-03-31
			await userEvent.keyboard('[PageUp]');

			// then
			expect(props.goToPreviousMonth).toBeCalled();
			expect(screen.getByTestId('28')).toHaveFocus(); // 2018-02-28
		});
	});

	describe('PAGE DOWN keydown', () => {
		it('should go to next month and focus on the same day', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);
			expect(props.goToNextMonth).not.toBeCalled();

			// when
			screen.getByTestId('14').focus(); // 2018-03-14
			await userEvent.keyboard('[PageDown]');

			// then
			expect(props.goToNextMonth).toBeCalled();
			expect(screen.getByTestId('14')).toHaveFocus(); // 2018-02-14
		});

		it('should go to next month and focus on the last day if same day does not exist', async () => {
			// given
			render(<DayCalendarWithGesture {...props} />);
			expect(props.goToNextMonth).not.toBeCalled();

			// when
			screen.getByTestId('31').focus(); // 2018-03-31
			await userEvent.keyboard('[PageDown]');

			// then
			expect(props.goToNextMonth).toBeCalled();
			expect(screen.getByTestId('30')).toHaveFocus(); // 2018-02-30
		});
	});
});
