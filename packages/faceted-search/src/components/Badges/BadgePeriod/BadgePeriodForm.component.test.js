import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import getDefaultT from '../../../translate';
import { BadgePeriodForm } from './BadgePeriodForm.component';

const t = getDefaultT();

describe('BadgeMenuPeriod', () => {
	it('should render options and custom if value is empty', () => {
		// Given
		const props = {
			id: 'myId',
			value: {},
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			t,
		};
		// When
		render(<BadgePeriodForm {...props} />);
		// Then
		expect(screen.getByTestId('badge-period-form-item-LAST_24_HOURS')).toHaveTextContent(
			'Last 24 hours',
		);
		expect(screen.getByTestId('badge-period-form-item-LAST_3_DAYS')).toHaveTextContent(
			'Last 3 days',
		);
		expect(screen.getByTestId('badge-period-form-item-LAST_WEEK')).toHaveTextContent('Last 7 days');
		expect(screen.getByTestId('badge-period-form-item-LAST_MONTH')).toHaveTextContent(
			'Last 30 days',
		);
		expect(screen.getByTestId('badge-period-form-item-CUSTOM')).toHaveTextContent('Custom');
	});
	it('should render date range picker when value is range', () => {
		// Given
		const props = {
			id: 'myId',
			value: {
				id: 'CUSTOM',
				startDateTime: new Date('2020-01-01'),
				endDateTime: new Date('2020-01-02'),
			},
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			t,
		};
		// When
		render(<BadgePeriodForm {...props} />);
		expect(screen.getAllByTestId('date-picker')[0]).toHaveValue('2020-01-01');
		expect(screen.getAllByTestId('time-picker')[0]).toHaveValue('00:00');
		expect(screen.getAllByTestId('date-picker')[1]).toHaveValue('2020-01-02');
		expect(screen.getAllByTestId('time-picker')[1]).toHaveValue('00:00');
	});
	it('should call onSubmit when option is selected', async () => {
		const user = userEvent.setup();
		// Given
		const props = {
			id: 'myId',
			value: {},
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			t,
		};
		// When
		render(<BadgePeriodForm {...props} />);
		await user.click(screen.getByTestId('badge-period-form-item-LAST_24_HOURS'));
		expect(props.onSubmit).toHaveBeenCalledTimes(1);
	});
	it('should call onSubmit when custom date range is selected', async () => {
		const user = userEvent.setup();
		// Given
		const props = {
			id: 'myId',
			value: {},
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			t,
		};
		// When
		render(<BadgePeriodForm {...props} />);
		await user.click(screen.getByTestId('badge-period-form-item-CUSTOM'));
		await user.click(screen.getByRole('button', { name: /apply/i }));
		expect(props.onSubmit).toHaveBeenCalledTimes(1);
	});
	it('should restore range to last day when reset button is clicked', async () => {
		const user = userEvent.setup();
		// Given
		const props = {
			id: 'myId',
			value: {
				id: 'CUSTOM',
			},
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			t,
		};
		// When
		render(<BadgePeriodForm {...props} />);
		await user.clear(screen.getAllByTestId('date-picker')[0]);
		// expect(props.onChange).toHaveBeenCalledTimes(1);
		await user.click(screen.getByRole('button', { name: /reset/i }));
		expect(props.onChange).toHaveBeenCalledTimes(2);
	});
	it('should toggle date range picker when custom is selected', async () => {
		const user = userEvent.setup();
		// Given
		const props = {
			id: 'myId',
			value: {},
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			t,
		};
		// When
		render(<BadgePeriodForm {...props} />);
		// Then date range picker is not visible
		expect(screen.queryByTestId('date-picker')).not.toBeInTheDocument();
		// When click on custom
		await user.click(screen.getByTestId('badge-period-form-item-CUSTOM'));
		// Then date range picker is visible
		expect(screen.getAllByTestId('date-picker')).toHaveLength(2);
		// When click on custom again
		await user.click(screen.getByTestId('badge-period-form-custom-button'));
		// Then date range picker is not visible
		expect(screen.queryByTestId('date-picker')).not.toBeInTheDocument();
	});
});
