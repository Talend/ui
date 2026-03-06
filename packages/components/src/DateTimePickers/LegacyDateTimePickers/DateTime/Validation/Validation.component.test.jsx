import { screen, render } from '@testing-library/react';

import { DateTimeContext } from '../Context';
import Validation from './Validation.component';

describe('DateTime.Validation', () => {
	it('should render', () => {
		// given
		const managerValue = {
			errorManagement: {
				errors: [
					{ code: 'INVALID_DATE_FORMAT', message: 'INVALID_DATE_FORMAT' },
					{ code: 'INVALID_HOUR', message: 'INVALID_HOUR_EMPTY' },
					{ code: 'INVALID_MINUTES', message: 'INVALID_MINUTES_EMPTY' },
					{ code: 'INVALID_SECONDS', message: 'INVALID_SECONDS_EMPTY' },
				],
				inputErrorId: 'my-custom-input-error',
				hoursErrorId: 'my-custom-hours-error',
				minutesErrorId: 'my-custom-minutes-error',
				secondsErrorId: 'my-custom-seconds-error',
			},
			formManagement: {
				onSubmit: jest.fn(),
			},
		};

		// when
		render(
			<DateTimeContext.Provider value={managerValue}>
				<Validation />
			</DateTimeContext.Provider>,
		);

		// then
		expect(screen.getByText('INVALID_DATE_FORMAT')).toBeVisible();
		expect(screen.getByText('INVALID_HOUR_EMPTY')).toBeVisible();
		expect(screen.getByText('INVALID_MINUTES_EMPTY')).toBeVisible();
		expect(screen.getByText('INVALID_SECONDS_EMPTY')).toBeVisible();
	});

	it('should show focused input error', () => {
		// given
		const managerValue = {
			errorManagement: {
				errors: [
					{ code: 'INVALID_DATE_FORMAT', message: 'INVALID_DATE_FORMAT' },
					{ code: 'INVALID_HOUR', message: 'INVALID_HOUR_EMPTY' },
					{ code: 'INVALID_MINUTES', message: 'INVALID_MINUTES_EMPTY' },
					{ code: 'INVALID_SECONDS', message: 'INVALID_SECONDS_EMPTY' },
				],
				inputErrorId: 'my-custom-input-error',
				hoursErrorId: 'my-custom-hours-error',
				minutesErrorId: 'my-custom-minutes-error',
				secondsErrorId: 'my-custom-seconds-error',
				focusedInput: 'my-custom-hours-error',
			},
			formManagement: {
				onSubmit: jest.fn(),
			},
		};

		// when
		render(
			<DateTimeContext.Provider value={managerValue}>
				<Validation />
			</DateTimeContext.Provider>,
		);

		// then
		expect(screen.getByText('INVALID_DATE_FORMAT')).toBeVisible();
		expect(screen.getByText('INVALID_DATE_FORMAT').parentElement).toHaveAttribute(
			'id',
			'my-custom-input-error',
		);
		expect(screen.getByText('INVALID_DATE_FORMAT').parentElement).toHaveAttribute(
			'aria-hidden',
			'true',
		);

		expect(screen.getByText('INVALID_HOUR_EMPTY')).toBeVisible();
		expect(screen.getByText('INVALID_HOUR_EMPTY').parentElement).toHaveAttribute(
			'id',
			'my-custom-hours-error',
		);
		expect(screen.getByText('INVALID_HOUR_EMPTY').parentElement).toHaveAttribute(
			'aria-hidden',
			'false',
		);
		expect(screen.getByText('INVALID_MINUTES_EMPTY')).toBeVisible();
		expect(screen.getByText('INVALID_MINUTES_EMPTY').parentElement).toHaveAttribute(
			'id',
			'my-custom-minutes-error',
		);
		expect(screen.getByText('INVALID_MINUTES_EMPTY').parentElement).toHaveAttribute(
			'aria-hidden',
			'true',
		);
		expect(screen.getByText('INVALID_SECONDS_EMPTY')).toBeVisible();
		expect(screen.getByText('INVALID_SECONDS_EMPTY').parentElement).toHaveAttribute(
			'id',
			'my-custom-seconds-error',
		);
		expect(screen.getByText('INVALID_SECONDS_EMPTY').parentElement).toHaveAttribute(
			'aria-hidden',
			'true',
		);
	});
});
