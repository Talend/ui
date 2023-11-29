import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DateTimeContext } from '../Context';
import Input from './Input.component';

describe('DateTime.Input', () => {
	it('should render', () => {
		// given
		const managerValue = {
			errorManagement: {
				inputErrorId: 'inputErrorId',
				onInputFocus: jest.fn(),
			},
			datetime: {
				textInput: '2007-01-02',
			},
			inputManagement: {
				placeholder: 'YYY-MM-DD',
			},
		};

		// when
		render(
			<DateTimeContext.Provider value={managerValue}>
				<Input aria-labelledby="labelId" />
			</DateTimeContext.Provider>,
		);

		// then
		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('aria-labelledby', 'labelId');
		expect(input).toHaveAttribute('aria-describedby', 'inputErrorId');
		expect(input).toHaveAttribute('placeholder', 'YYY-MM-DD');
		expect(input).toHaveValue('2007-01-02');
	});

	it('should call manager focus callback in input focus', async () => {
		const user = userEvent.setup();

		// given
		const managerValue = {
			errorManagement: {
				onInputFocus: jest.fn(),
			},
			datetime: {
				textInput: '',
			},
		};

		render(
			<DateTimeContext.Provider value={managerValue}>
				<Input aria-labelledby="labelId" />
			</DateTimeContext.Provider>,
		);
		expect(managerValue.errorManagement.onInputFocus).not.toHaveBeenCalled();

		// when
		await user.click(screen.getByRole('textbox'));

		// then
		expect(managerValue.errorManagement.onInputFocus).toHaveBeenCalled();
	});
});
