import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BadgeDropdown from './BadgeDropdown.component';

describe('BadgeDropdown', () => {
	it('should render a dropdown', () => {
		// given
		const dropdownProps = {
			id: 'context-dropdown-related-items',
			label: 'Label',
			items: [
				{
					id: 'context-dropdown-item-document-1',
					label: 'document 1',
					'data-feature': 'actiondropdown.items',
					onClick: jest.fn(),
				},
				{
					divider: true,
				},
				{
					id: 'context-dropdown-item-document-2',
					label: 'document 2',
					'data-feature': 'actiondropdown.items',
					onClick: jest.fn(),
				},
			],
		};
		// when
		render(<BadgeDropdown props={dropdownProps} />);
		// then
		expect(screen.getByText('Label')).toBeInTheDocument();
		expect(screen.getByText('document 1')).toBeInTheDocument();
		userEvent.click(screen.getByText('document 1'));
		expect(dropdownProps.items[0].onClick).toHaveBeenCalledTimes(1);
	});
});
