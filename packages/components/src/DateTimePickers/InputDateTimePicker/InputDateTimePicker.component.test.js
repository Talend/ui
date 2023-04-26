import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputDateTimePicker from './InputDateTimePicker.component';

describe('InputDateTimePicker', () => {
	it('should render', () => {
		// when
		window.HTMLElement.prototype.getBoundingClientRect = () => ({ width: 42 });
		const { container } = render(
			<InputDateTimePicker id="my-picker" value={new Date(2017, 3, 4, 15, 27)} useSeconds />,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
	describe('onChange', () => {
		it('should trigger props.onChange', async () => {
			// given
			const onChange = jest.fn();
			render(<InputDateTimePicker id="my-picker" onChange={onChange} />);
			expect(onChange).not.toBeCalled();

			// when
			await userEvent.click(screen.getByTestId('date-picker'));
			await userEvent.keyboard('2015-01-15');
			await userEvent.click(screen.getByTestId('time-picker'));
			await userEvent.keyboard('15:45');
			// force blur to trigger event
			await userEvent.click(screen.getByTestId('date-picker'));

			// then
			expect(onChange).toBeCalledTimes(2);
			const argsOnDate = onChange.mock.calls[0];
			expect(argsOnDate[1].errorMessage).toBe('Time is required');
			const argsOnTime = onChange.mock.calls[1];
			expect(argsOnTime[1]).toMatchObject({
				datetime: new Date(2015, 0, 15, 15, 45),
				textInput: '2015-01-15 15:45',
				errors: [],
				errorMessage: null,
			});
		});
	});
});
