import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from './Header.component';

jest.unmock('@talend/design-system');
describe('Header', () => {
	it('should trigger callback when clicking on header button', async () => {
		const user = userEvent.setup();

		// given
		const props = {
			headerDefault: [
				{
					label: 'Add item',
					icon: 'talend-plus',
					id: 'add',
					onClick: jest.fn(), // provided click callback
				},
			],
		};
		const headerInstance = <Header {...props} />;

		// when
		render(headerInstance);
		await user.click(screen.getByLabelText('Add item'));

		// then
		expect(props.headerDefault[0].onClick).toHaveBeenCalled();
	});
	it('should not render disabled button', () => {
		// given
		const props = {
			headerDefault: [
				{
					disabled: true,
					label: 'Add item',
					icon: 'talend-plus',
					id: 'add',
					onClick: jest.fn(), // provided click callback
				},
			],
		};
		const headerInstance = <Header {...props} />;

		// when
		render(headerInstance);

		// then
		expect(screen.queryAllByRole('button').length).toBe(0);
	});
});
