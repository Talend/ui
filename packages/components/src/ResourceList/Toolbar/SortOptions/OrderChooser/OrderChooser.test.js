import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import OrderChooser from './OrderChooser.component';

describe('OrderChooser', () => {
	it('should render OrderChooser in default mode', () => {
		const props = {
			icon: 'talend-sort-desc',
			label: 'Sort by date',
			onClick: jest.fn(),
		};

		const { container } = render(<OrderChooser {...props} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render OrderChooser in asc mode', () => {
		const props = {
			icon: 'talend-sort-asc',
			label: 'Sort by date',
			asc: true,
			onClick: jest.fn(),
		};

		render(<OrderChooser {...props} />);

		expect(screen.getByLabelText('Sort by date').children[1]).toHaveClass('theme-asc');
	});
	it('should pass onClick', async () => {
		const user = userEvent.setup();

		const props = {
			icon: 'talend-sort-asc',
			label: 'Sort by date',
			asc: true,
			onClick: jest.fn(),
		};
		render(<OrderChooser {...props} />);
		await user.click(screen.getByLabelText('Sort by date'));
		expect(props.onClick).toHaveBeenCalled();
	});
});
