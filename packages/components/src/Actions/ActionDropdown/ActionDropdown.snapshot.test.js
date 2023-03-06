import React from 'react';
import Immutable from 'immutable';
import { render, screen, within } from '@testing-library/react';
import ActionDropdown from './ActionDropdown.component';
jest.unmock('@talend/design-system');

const items = [
	{
		icon: 'talend-icon',
		label: 'document 1',
		onClick: jest.fn(),
	},
	{
		label: 'document 2',
		onClick: jest.fn(),
	},
];
const immutableItems = Immutable.fromJS(items);

describe('ActionDropdown', () => {
	it('should render a button dropdown with its menu', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items,
		};

		// when
		render(<ActionDropdown {...props} />);

		// then
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByRole('menu')).toBeInTheDocument();
	});

	it('should render the same as when plain object or immutable list', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items,
		};
		const immutableProps = {
			...props,
			items: immutableItems,
		};

		// when
		render(<ActionDropdown {...immutableProps} />);

		// then
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByRole('menu')).toBeInTheDocument();
	});

	it('should render a button with icon and label', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			icon: 'fa fa-file-excel-o',
			items,
		};

		// when
		render(<ActionDropdown {...props} />);

		// then
		expect(screen.getByRole('button')).toBeInTheDocument();
		const icon = screen.getByText('related items').previousSibling;
		expect(icon).toHaveAttribute('name', 'fa fa-file-excel-o');
		expect(icon.nodeName).toBe('svg');
	});

	it('should render icon only with hideLabel props', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			icon: 'fa fa-file-excel-o',
			items,
			tooltipPlacement: 'right',
			hideLabel: true,
		};

		// when
		render(<ActionDropdown {...props} />);

		// then
		expect(screen.queryByText('related items')).not.toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
		const icon = screen.getByRole('button').childNodes[0];
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveAttribute('name', 'fa fa-file-excel-o');
		expect(icon.nodeName).toBe('svg');
	});

	it('should render an ellipsis dropdown', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			icon: 'fa fa-file-excel-o',
			items,
			tooltipPlacement: 'right',
			ellipsis: true,
		};

		// when
		render(<ActionDropdown {...props} />);

		// then
		expect(screen.getByRole('button')).toHaveClass('theme-ellipsis');
	});

	it('should render a button with "link" theme', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items,
			link: true,
		};

		// when
		render(<ActionDropdown {...props} />);

		// then
		expect(screen.getByRole('button')).toHaveClass('btn-link');
	});

	it('should render "no options" item when items array is empty', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items: [],
		};

		// when
		render(<ActionDropdown {...props} />);

		// then
		expect(screen.getByText('No options')).toBeInTheDocument();
	});

	it('should render loader item', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			loading: true,
			items: [],
		};

		// when
		render(<ActionDropdown {...props} />);

		// then
		expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
	});

	it('should render loader item below existing items', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			loading: true,
			items,
		};

		// when
		render(<ActionDropdown {...props} />);
		const item = screen.getByText('document 2').parentElement;
		const loading = item.nextSibling;
		// then
		expect(within(loading).getByLabelText('Loading...')).toBeInTheDocument();
	});

	it('should render icon-only items with item hideLabel props', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items: items.map(item => ({ ...item, hideLabel: true })),
		};

		// when
		render(<ActionDropdown {...props} />);
		const item = screen.getAllByRole('menuitem')[0].firstChild;

		// then
		expect(item).toBeInTheDocument();
		expect(item).toHaveClass('tc-icon');
	});
});
