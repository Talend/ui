import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AppSwitcher from './AppSwitcher.component';

describe('AppSwitcher', () => {
	it('should render the products', async () => {
		const user = userEvent.setup();

		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
			items: [
				{
					icon: 'talend-tdp-colored',
					key: 'tdp',
					label: 'Data Preparation',
					onClick: jest.fn(),
				},
				{
					icon: 'talend-tic-colored',
					key: 'tic',
					label: 'Integration Cloud',
				},
				{
					icon: 'talend-tmc-colored',
					key: 'tmc',
					label: 'Management Console',
				},
			],
		};
		render(<AppSwitcher {...brand} />);
		expect(screen.getByText('My App')).toBeInTheDocument();
		expect(screen.getByText('Data Preparation')).toBeInTheDocument();
		await user.click(screen.getByText('My App'));
		await user.click(screen.getByText('Data Preparation'));
		expect(brand.items[0].onClick).toHaveBeenCalled();
		expect(brand.onClick).not.toHaveBeenCalled();
	});

	it('should render with a Action', async () => {
		const user = userEvent.setup();
		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
		};
		render(<AppSwitcher {...brand} />);
		expect(screen.getByText('My App')).toBeInTheDocument();
		await user.click(screen.getByText('My App'));
		expect(brand.onClick).toHaveBeenCalled();
	});

	it('should separated the component', () => {
		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
			isSeparated: true,
		};
		render(<AppSwitcher {...brand} />);
		expect(screen.getByRole('presentation')).toHaveClass('separated');
	});

	it('should render an icon', () => {
		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
			iconUrl: 'test.jpg',
		};
		render(<AppSwitcher {...brand} />);
		expect(screen.getByRole('presentation')).toHaveClass('hasIcon');
	});

	it('should keep the icon url inside a single css url() value', () => {
		const iconUrl = 'x.png\');}body{color:red}</style><b>"';
		const { container } = render(<AppSwitcher id="brand" label="My App" iconUrl={iconUrl} />);
		const style = container.querySelector('style');
		expect(container.querySelector('b')).toBeNull();
		expect(style.textContent).not.toContain('}body{');
		expect(style.textContent).not.toContain('</style>');
		expect(style.textContent.match(/url\(/g)).toHaveLength(2);
	});
});
