import React from 'react';
import { render, screen, configure } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withMonthCalendarGesture } from './withMonthCalendarGesture';
import MonthCalendar from '../__mocks__/month-calendar';
configure({ testIdAttribute: 'data-test' });

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

// /**
//  * Tests on a 3-month sets of months
//  * 	JAN		FEB		MAR
//  * 	APR		MAY		JUN
//  * 	JUL		AUG		SEP
//  * 	OCT		NOV		DEC
//  */
describe('withMonthCalendarGesture', () => {
	const props = {
		goToPreviousMonth: jest.fn(),
		goToNextMonth: jest.fn(),
	};
	beforeEach(() => {
		jest.resetAllMocks();
	});
	describe('LEFT keydown', () => {
		it('should focus on previous month in the same set of months', async () => {
			// given
			render(<MonthCalendarWithGesture {...props} />);
			// when
			screen.getByText('MAY').focus();
			await userEvent.keyboard('[ArrowLeft]');
			// then
			expect(screen.getByText('APR')).toHaveFocus();
		});
		it('should focus on the previous month in the previous set of months', async () => {
			// given
			render(<MonthCalendarWithGesture {...props} />);
			// when
			screen.getByText('APR').focus();
			await userEvent.keyboard('[ArrowLeft]');
			// then
			expect(screen.getByText('MAR')).toHaveFocus();
		});
		it('should block focus on first month', async () => {
			// given
			render(<MonthCalendarWithGesture {...props} />);
			// when
			screen.getByText('JAN').focus();
			await userEvent.keyboard('[ArrowLeft]');
			// then
			expect(screen.getByText('JAN')).toHaveFocus();
		});
	});
	describe('RIGHT keydown', () => {
		it('should focus on next month in the same set of months', async () => {
			// given
			render(<MonthCalendarWithGesture {...props} />);
			// when
			screen.getByText('MAY').focus();
			await userEvent.keyboard('[ArrowRight]');
			// then
			expect(screen.getByText('JUN')).toHaveFocus();
		});
		it('should focus on the next month in the next set of months', async () => {
			// given
			render(<MonthCalendarWithGesture {...props} />);
			// when
			screen.getByText('JUN').focus();
			await userEvent.keyboard('[ArrowRight]');
			// then
			expect(screen.getByText('JULY')).toHaveFocus();
		});
		it('should block focus on last month', async () => {
			// given
			render(<MonthCalendarWithGesture {...props} />);
			// when
			screen.getByText('DEC').focus();
			await userEvent.keyboard('[ArrowRight]');
			// then
			expect(screen.getByText('DEC')).toHaveFocus();
		});
	});
	describe('UP keydown', () => {
		it('should focus on previous set of month', async () => {
			// given
			render(<MonthCalendarWithGesture {...props} />);
			// when
			screen.getByText('MAY').focus();
			await userEvent.keyboard('[ArrowUp]');
			// then
			expect(screen.getByText('FEB')).toHaveFocus();
		});
		it('should block focus when there is no previous set of month', async () => {
			// given
			render(<MonthCalendarWithGesture {...props} />);
			// when
			screen.getByText('FEB').focus();
			await userEvent.keyboard('[ArrowUp]');
			// then
			expect(screen.getByText('JAN')).toHaveFocus();
		});
	});
	describe('DOWN keydown', () => {
		it('should focus on next set of month', async () => {
			// given
			render(<MonthCalendarWithGesture {...props} />);
			// when
			screen.getByText('MAY').focus();
			await userEvent.keyboard('[ArrowDown]');
			// then
			expect(screen.getByText('AUG')).toHaveFocus();
		});
		it('should block focus when there is no following set of month', async () => {
			// given
			render(<MonthCalendarWithGesture {...props} />);
			// when
			screen.getByText('NOV').focus();
			await userEvent.keyboard('[ArrowDown]');
			// then
			expect(screen.getByText('DEC')).toHaveFocus();
		});
	});
	describe('HOME keydown', () => {
		it('should focus on first month', async () => {
			// given
			render(<MonthCalendarWithGesture {...props} />);
			// when
			screen.getByText('MAY').focus();
			await userEvent.keyboard('[Home]');
			// then
			expect(screen.getByText('JAN')).toHaveFocus();
		});
	});
	describe('END keydown', () => {
		it('should focus on last month', async () => {
			// given
			render(<MonthCalendarWithGesture {...props} />);
			// when
			screen.getByText('MAY').focus();
			await userEvent.keyboard('[End]');
			// then
			expect(screen.getByText('DEC')).toHaveFocus();
		});
	});
});
