import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderBarComponent from './HeaderBar.component';

describe('HeaderBar', () => {
	it('should render', () => {
		render(<HeaderBarComponent />);
		expect(screen.getByRole('navigation')).toBeInTheDocument();
	});

	it('should render logo', () => {
		// GIVEN
		const logo = {
			id: 'logo',
			label: 'My App',
			onClick: jest.fn(),
		};
		// WHEN
		render(<HeaderBarComponent logo={logo} />);

		// THEN get Logo element
		const element = screen.getAllByRole('button')[0];
		expect(element).toBeVisible();

		// THEN check Logo label
		expect(element).toHaveAttribute('aria-label', logo.label);

		// THEN trigger onClick
		userEvent.click(element);
		expect(logo.onClick).toHaveBeenCalled();
	});

	it('should render AppSwitcher component', () => {
		// GIVEN
		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
		};
		// WHEN
		render(<HeaderBarComponent brand={brand} />);
		// THEN find App switcher button
		const element = screen.getAllByRole('button')[0];
		expect(element).toBeVisible();
		// THEN check App switcher content
		expect(element).toHaveTextContent(brand.label);
	});

	it('should render custom AppSwitcher component', () => {
		// GIVEN
		const testid = 'custom-app-switcher';
		function AppSwitcher() {
			return <button data-testid={testid}>Custom App switcher</button>;
		}
		// WHEN
		render(<HeaderBarComponent AppSwitcher={AppSwitcher} />);
		// THEN find App switcher button
		const element = screen.getByTestId(testid);
		expect(element).toBeVisible();
		// THEN check App switcher content
		expect(element).toHaveTextContent('Custom App switcher');
	});

	it('should render custom Intercom component', () => {
		// GIVEN
		const testid = 'intercom';
		function Intercom() {
			return <div data-testid={testid}>Intercom chat</div>;
		}
		// WHEN
		render(<HeaderBarComponent Intercom={Intercom} />);
		// THEN find Intercom component
		const element = screen.getByTestId(testid);
		expect(element).toBeVisible();
		// THEN check Intercom content
		expect(element).toHaveTextContent('Intercom chat');
	});

	it('should render search', () => {
		// GIVEN
		const search = {
			id: 'search',
			onToggle: jest.fn(),
			docked: true,
			icon: {
				name: 'talend-search',
				title: 'Search',
				bsStyle: 'link',
				tooltipPlacement: 'bottom',
			},
		};
		// WHEN
		render(<HeaderBarComponent search={search} />);
		// THEN get element with role "search"
		const element = screen.getByRole('search');
		expect(element).toBeVisible();

		// THEN trigger onClick
		userEvent.click(element);
		expect(search.onToggle).toHaveBeenCalled();
	});

	it('should render help', () => {
		// GIVEN
		const help = {
			id: 'help',
			onClick: jest.fn(),
			icon: 'talend-icon',
		};
		// WHEN
		render(<HeaderBarComponent help={help} />);
		// THEN check Help element
		const element = screen.getAllByRole('button')[1];
		expect(element).toHaveAttribute('aria-label', 'Help');
		// THEN trigger onClick
		userEvent.click(element);
		expect(help.onClick).toHaveBeenCalled();
	});

	it('should render user', () => {
		// GIVEN
		const user = {
			id: 'user',
			items: [
				{
					id: 'settings',
					icon: 'talend-cog',
					label: 'Settings',
					onClick: jest.fn(),
				},
			],
			name: 'John Doe',
			firstName: 'John',
			lastName: 'Doe',
			onClick: jest.fn(),
		};
		// WHEN
		render(<HeaderBarComponent user={user} />);
		// THEN check user button
		const userBtn = screen.getAllByRole('button').find(btn => btn.id === 'user');
		expect(userBtn).toHaveTextContent(user.name);
		expect(userBtn).toHaveAttribute('aria-expanded', 'false');
		// THEN trigger user onClick
		userEvent.click(userBtn);
		expect(userBtn).toHaveAttribute('aria-expanded', 'true');
		// THEN check user button
		const settingsLink = screen.getAllByRole('menuitem')[0];
		expect(settingsLink).toHaveTextContent(user.items[0].label);
		// THEN check settings onClick
		userEvent.click(settingsLink);
		expect(user.items[0].onClick).toHaveBeenCalled();
	});

	it('should render products', () => {
		const products = {
			items: [
				{
					icon: 'talend-tdp-colored',
					key: 'tdp',
					id: 'tdp',
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
			onSelect: jest.fn(),
		};
		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
		};
		// WHEN
		render(<HeaderBarComponent brand={brand} products={products} />);
		// THEN check brand button
		const brandBtn = screen.getAllByRole('button').find(btn => btn.id === 'brand');
		expect(brandBtn).toHaveTextContent(brand.label);
		// THEN trigger brand onClick
		userEvent.click(brandBtn);
		expect(brandBtn).toHaveAttribute('aria-expanded', 'true');

		// THEN check user button
		const tdpLink = screen.getAllByRole('menuitem')[0];
		expect(tdpLink).toHaveTextContent(products.items[0].label);
		// THEN check TDP onClick
		userEvent.click(tdpLink);
		expect(products.items[0].onClick).toHaveBeenCalled();
	});

	it('should render genericAction', () => {
		// GIVEN
		const genericAction = {
			id: 'generic-action',
			icon: 'talend-info-circle',
			label: 'Talend Experience',
			onClick: jest.fn(),
		};
		// WHEN
		render(<HeaderBarComponent genericAction={genericAction} />);
		// THEN check generic action element
		const element = screen.getAllByRole('button')[1];
		expect(element).toHaveAttribute('aria-label', genericAction.label);
		// THEN trigger onClick
		userEvent.click(element);
		expect(genericAction.onClick).toHaveBeenCalled();
	});
});
