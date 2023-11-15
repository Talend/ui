import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header.component';

describe('Header', () => {
	it('should render', () => {
		// given
		const props = {
			headerDefault: [
				{
					disabled: false,
					label: 'Search for specific values',
					icon: 'talend-search',
					id: 'search',
					onClick: jest.fn(), // provided click callback
				},
			],
		};
		const { container } = render(<Header {...props} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should trigger callback when clicking on header button', () => {
		// given
		const props = {
			headerDefault: [
				{
					disabled: false,
					label: 'Search for specific values',
					icon: 'talend-search',
					id: 'search',
					onClick: jest.fn(), // provided click callback
				},
			],
		};

		// when
		render(<Header {...props} />);
		userEvent.click(screen.getByLabelText('Search for specific values'));

		// then
		expect(screen.getAllByRole('link').length).toBe(1);
		expect(props.headerDefault[0].onClick).toHaveBeenCalled();
	});
});
