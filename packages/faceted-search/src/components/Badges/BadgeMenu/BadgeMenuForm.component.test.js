import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BadgeMenuForm } from './BadgeMenuForm.component';
import getDefaultT from '../../../translate';

const menuItems = [
	{
		id: 'item-one',
		label: 'Item One',
	},
	{
		id: 'item-two',
		label: 'Item Two',
	},
	{
		id: 'item-three',
		label: 'Item Three',
	},
];

const t = getDefaultT();

describe('BadgeMenuForm', () => {
	it('should render three menuitems', () => {
		// Given
		const props = {
			id: 'myId',
			values: menuItems,
			value: {},
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			t,
		};
		// When
		render(<BadgeMenuForm {...props} />);
		// Then
		expect(screen.getByTestId('badge-menu-form-item-item-one')).toHaveTextContent('Item One');
		expect(screen.getByTestId('badge-menu-form-item-item-two')).toHaveTextContent('Item Two');
		expect(screen.getByTestId('badge-menu-form-item-item-three')).toHaveTextContent('Item Three');
		expect(screen.getAllByRole('menuitem')).toHaveLength(3);
	});
	it('should trigger on change callback when menuitem selected', () => {
		// Given
		const onChange = jest.fn();
		const props = {
			id: 'myId',
			values: menuItems,
			value: {},
			onChange,
			onSubmit: jest.fn(),
			t,
		};
		// When
		render(<BadgeMenuForm {...props} />);
		userEvent.click(screen.getByTestId('badge-menu-form-item-item-one'));
		// Then
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toEqual({
			checked: false,
			id: 'item-one',
			label: 'Item One',
		});
	});
	it('should display menuitem checked', () => {
		// Given
		const props = {
			id: 'myId',
			values: menuItems,
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			value: {
				id: 'item-one',
				label: 'Item One',
			},
			t,
		};
		// When
		render(<BadgeMenuForm {...props} />);
		// Then
		expect(screen.getByTestId('badge-menu-form-item-item-one').querySelector('svg')).toBeVisible();
	});
	it('should filter the displayed checkbox using the filter bar', () => {
		// Given
		const props = {
			id: 'myId',
			value: {},
			values: menuItems,
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			t,
		};
		// When
		render(<BadgeMenuForm {...props} />);

		expect(screen.getByTestId('badge-menu-form-item-item-one')).toBeVisible();
		expect(screen.getByTestId('badge-menu-form-item-item-two')).toBeVisible();
		expect(screen.getByTestId('badge-menu-form-item-item-three')).toBeVisible();

		userEvent.type(
			screen.getByRole('searchbox', {
				name: /find a column/i,
			}),
			'One',
		);

		// Then
		expect(screen.getByTestId('badge-menu-form-item-item-one')).toBeVisible();
		expect(screen.queryByTestId('badge-menu-form-item-item-two')).not.toBeInTheDocument();
		expect(screen.queryByTestId('badge-menu-form-item-item-three')).not.toBeInTheDocument();
	});

	it('should call the submit callback', () => {
		const onSubmit = jest.fn();
		// Give
		const props = {
			id: 'myId',
			value: {},
			values: menuItems,
			onChange: jest.fn(),
			onSubmit,
			t,
		};
		// When
		render(<BadgeMenuForm {...props} />);
		userEvent.click(
			screen.getByRole('button', {
				name: /apply/i,
			}),
		);
		// Then
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});
});
