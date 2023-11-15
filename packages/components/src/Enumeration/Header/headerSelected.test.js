import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HeaderSelected from './HeaderSelected.component';

describe('Header selected', () => {
	it('should trigger callback when clicking on header action', () => {
		// given
		const props = {
			headerSelected: [
				{
					disabled: false,
					label: 'Delete',
					icon: 'talend-check',
					id: 'delete',
					onClick: jest.fn(), // provided click callback
				},
			],
			nbItemsSelected: 2,
		};
		render(<HeaderSelected {...props} />);

		// when
		const buttons = screen.getAllByRole('link');

		userEvent.click(buttons[0]);

		// then
		expect(props.headerSelected[0].onClick).toHaveBeenCalled();
	});
	it('should render only button which are not disabled', () => {
		// given
		const props = {
			headerSelected: [
				{
					disabled: true,
					label: 'Delete',
					icon: 'talend-check',
					id: 'delete',
					onClick: jest.fn(), // provided click callback
				},
			],
			nbItemsSelected: 2,
		};
		render(<HeaderSelected {...props} />);

		// then
		const buttons = screen.queryAllByRole('link');
		expect(buttons.length).toBe(0);
	});
});
