import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderInput from './HeaderInput.component';

describe('Header input', () => {
	it('should trigger callback when clicking on header button', () => {
		// given
		const props = {
			headerInput: [
				{
					label: 'Abort',
					icon: 'talend-cross',
					id: 'abort',
					onClick: jest.fn(), // provided click callback
				},
			],
		};
		render(<HeaderInput {...props} />);

		// when
		userEvent.click(screen.getByLabelText('Abort'));

		// then
		expect(props.headerInput[0].onClick).toBeCalled();
	});
});
