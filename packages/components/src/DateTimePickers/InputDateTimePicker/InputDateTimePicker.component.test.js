import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputDateTimePicker from './InputDateTimePicker.component';

jest.unmock('@talend/design-system');

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
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<InputDateTimePicker id="my-picker" onChange={onChange} />);
			expect(onChange).not.toHaveBeenCalled();

			// when
			await user.click(screen.getByTestId('date-picker'));
			await user.keyboard('2015-01-15');
			await user.click(screen.getByTestId('time-picker'));
			await user.keyboard('15:45');
			// force blur to trigger event
			await user.click(screen.getByTestId('date-picker'));

			// then
			expect(onChange).toHaveBeenCalledTimes(2);
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
