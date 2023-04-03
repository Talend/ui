import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import AppSwitcher from './AppSwitcher.component';

jest.unmock('@talend/design-system');

describe('AppSwitcher', () => {
	it('should render the products', () => {
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
		userEvent.click(screen.getByText('My App'));
		userEvent.click(screen.getByText('Data Preparation'));
		expect(brand.items[0].onClick).toHaveBeenCalled();
		expect(brand.onClick).not.toHaveBeenCalled();
	});

	it('should render with a Action', () => {
		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
		};
		render(<AppSwitcher {...brand} />);
		expect(screen.getByText('My App')).toBeInTheDocument();
		userEvent.click(screen.getByText('My App'));
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
});
