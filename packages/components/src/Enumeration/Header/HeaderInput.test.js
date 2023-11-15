import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HeaderInput from './HeaderInput.component';

describe('Header input', () => {
	it('should trigger callback when clicking on header button', async () => {
		const user = userEvent.setup();

		// given
		const props = {
			headerInput: [
				{
					disabled: false,
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: jest.fn(), // provided click callback
				},
				{
					label: 'Abort',
					icon: 'talend-cross',
					id: 'abort',
					onClick: jest.fn(), // provided click callback
				},
			],
		};
		const headerInputInstance = <HeaderInput {...props} />;

		// when
		render(headerInputInstance);
		const buttons = screen.getAllByRole('link');
		await user.click(buttons[0]);
		await user.click(buttons[1]);

		// then
		expect(props.headerInput[0].onClick).toHaveBeenCalled();
		expect(props.headerInput[1].onClick).toHaveBeenCalled();
	});
	it('should render only button which are not disabled', () => {
		// given
		const props = {
			headerInput: [
				{
					disabled: true,
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: jest.fn(), // provided click callback
				},
				{
					label: 'Abort',
					icon: 'talend-cross',
					id: 'abort',
					onClick: jest.fn(), // provided click callback
				},
			],
		};

		// when
		render(<HeaderInput {...props} />);
		const buttons = screen.getAllByRole('link');
		// then
		expect(buttons.length).toBe(1);
	});
});
