import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FIELD_MINUTES, FIELD_HOURS } from '../../DateTime/constants';
import TimePicker from './TimePicker.component';
import { DateTimeContext } from '../../DateTime/Context';

describe('TimePicker', () => {
	const providerValue = {
		errorManagement: {
			hasError: () => false,
			onInputFocus: jest.fn(),
			hoursErrorId: 'error-hours',
			minutesErrorId: 'error-minutes',
			secondsErrorId: 'error-seconds',
		},
	};
	beforeEach(() => {
		jest.resetAllMocks();
	});
	it('should render', () => {
		// when
		const { container } = render(
			<DateTimeContext.Provider value={providerValue}>
				<TimePicker value={{ hours: '15', minutes: '38' }} onChange={jest.fn()} />
			</DateTimeContext.Provider>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render with error', () => {
		providerValue.errorManagement.hasError = () => true;
		// when
		render(
			<DateTimeContext.Provider value={providerValue}>
				<TimePicker value={{ hours: '15', minutes: '38' }} onChange={jest.fn()} useSeconds />,
			</DateTimeContext.Provider>,
		);

		// then
		const hour = screen.getByRole('textbox', { name: 'hours' });
		expect(hour).toHaveAttribute('aria-invalid', 'true');
		expect(hour).toHaveAttribute('aria-describedby', 'error-hours');
		expect(hour).toHaveClass('theme-time-error');
		const minutes = screen.getByRole('textbox', { name: 'minutes' });
		expect(minutes).toHaveAttribute('aria-invalid', 'true');
		expect(minutes).toHaveAttribute('aria-describedby', 'error-minutes');
		expect(minutes).toHaveClass('theme-time-error');
	});

	it('should render UTC legend', () => {
		// when
		render(
			<DateTimeContext.Provider value={providerValue}>
				<TimePicker value={{ hours: '15', minutes: '38' }} onChange={jest.fn()} useUTC />
			</DateTimeContext.Provider>,
		);

		// then
		expect(screen.getByText('UTC')).toBeVisible();
	});

	it('should trigger onChange on hours change', async () => {
		// given
		jest.useFakeTimers();
		providerValue.errorManagement.hasError = () => true;
		const onChange = jest.fn();
		render(
			<DateTimeContext.Provider value={providerValue}>
				<TimePicker value={{ hours: '15', minutes: '38' }} onChange={onChange} />
			</DateTimeContext.Provider>,
		);

		expect(onChange).not.toBeCalled();

		// when
		const hours = screen.getAllByRole('textbox')[0];
		hours.value = ''; // clear current value
		await userEvent.click(hours);
		await userEvent.keyboard('17');
		jest.runAllTimers();

		// then
		expect(onChange).toBeCalledWith(expect.anything(), { hours: '17', minutes: '38' }, FIELD_HOURS);
	});

	it('should trigger onChange on minutes change', () => {
		// given
		jest.useFakeTimers();
		const onChange = jest.fn();
		render(
			<DateTimeContext.Provider value={providerValue}>
				<TimePicker value={{ hours: '15', minutes: '38' }} onChange={onChange} />
			</DateTimeContext.Provider>,
		);
		expect(onChange).not.toBeCalled();

		// when
		const minutes = screen.getAllByRole('textbox')[1];
		minutes.value = ''; // clear current value
		userEvent.click(minutes);
		userEvent.keyboard('17');
		jest.runAllTimers();

		// then
		expect(onChange).toBeCalledWith(
			expect.anything(),
			{ hours: '15', minutes: '17' },
			FIELD_MINUTES,
		);
	});

	it('should manage tabIndex', () => {
		// given
		const { rerender } = render(
			<DateTimeContext.Provider value={providerValue}>
				<TimePicker onChange={jest.fn()} />
			</DateTimeContext.Provider>,
		);
		let [hours, minutes] = screen.getAllByRole('textbox');
		expect(hours).toHaveAttribute('tabIndex', '-1');
		expect(minutes).toHaveAttribute('tabIndex', '-1');

		// when
		rerender(
			<DateTimeContext.Provider value={providerValue}>
				<TimePicker onChange={jest.fn()} allowFocus />
			</DateTimeContext.Provider>,
		);

		// then
		expect(hours).toHaveAttribute('tabIndex', '0');
		expect(minutes).toHaveAttribute('tabIndex', '0');
	});
});
