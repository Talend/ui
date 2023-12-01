import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputDateTimeRangePicker from './InputDateTimeRangePicker.component';

jest.unmock('@talend/design-system');

describe('InputDateTimeRangePicker', () => {
	it('should render', () => {
		// when
		window.HTMLElement.prototype.getBoundingClientRect = () => ({ width: 42 });
		const { container } = render(
			<InputDateTimeRangePicker
				id="my-picker"
				startDateTime="2019-12-01 00:00:00"
				endDateTime="2019-12-11 23:59:59"
				useSeconds
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should works with default time', async () => {
		const user = userEvent.setup();

		// when
		const onChange = jest.fn();
		render(
			<InputDateTimeRangePicker
				id="my-picker"
				onChange={onChange}
				defaultTimeStart={{
					hours: '00',
					minutes: '00',
				}}
				defaultTimeEnd={{
					hours: '12',
					minutes: '24',
				}}
			/>,
		);
		const start = screen.getByTestId('range-start');
		const end = screen.getByTestId('range-end');

		// then
		// start time
		await user.click(within(start).getByTestId('date-picker'));
		await user.click(within(start).getAllByText('10')[0]);
		// note first call seems to trigger a JS error...
		await user.click(within(start).getByTestId('time-picker'));
		await user.click(within(start).getByText('08:00'));

		const payload = onChange.mock.calls[1][1];
		expect(payload.errors.length).toBe(0);
		expect(payload.errorMessage).toBe(null);
		// TZ=Europe/Paris
		const today = new Date();
		expect(payload.startDateTime).toEqual(
			new Date(today.getFullYear(), today.getMonth(), 10, 8, 0, 0),
		);

		// // end time
		await user.click(within(end).getByTestId('date-picker'));
		await user.click(within(end).getByText('13'));
		await user.click(within(end).getByTestId('time-picker'));
		await user.click(within(end).getByText('10:00'));

		const payloadEnd = onChange.mock.calls[3][1];
		expect(payloadEnd.errors.length).toBe(0);
		expect(payloadEnd.errorMessage).toBe(null);
		// TZ=Europe/Paris
		expect(payloadEnd.endDateTime).toEqual(
			new Date(new Date(today.getFullYear(), today.getMonth(), 13, 10, 0, 0)),
		);
	});
});
