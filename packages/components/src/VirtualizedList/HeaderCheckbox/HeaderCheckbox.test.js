import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderCheckbox from './HeaderCheckbox.component';

const items = [
	{ id: 1, label: 'item 1' },
	{ id: 2, label: 'item 2' },
];

const columnData = {
	id: 'myList',
	label: 'Select item',
	onToggleAll: jest.fn(),
	isSelected: jest.fn(),
	collection: items,
};

describe('Header "Select All" checkbox', () => {
	it('should render', () => {
		// when
		const { container } = render(<HeaderCheckbox columnData={columnData} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByText('Select all')).toBeVisible();
	});
	it('should trigger onToggleAll callback on checkbox toggle', async () => {
		const user = userEvent.setup();

		// when
		render(<HeaderCheckbox columnData={columnData} />);

		await user.click(screen.getByRole('checkbox'));

		// then
		expect(columnData.onToggleAll).toHaveBeenCalled();
	});

	it('should render unchecked & disabled checkbox on header when there is no items', () => {
		// when
		render(<HeaderCheckbox columnData={{ ...columnData, collection: [] }} />);

		// then
		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).not.toBeChecked();
		expect(checkbox).toBeDisabled();
	});

	it('should render disabled checkbox when isToggleAllDisabled() is true', () => {
		// when
		render(<HeaderCheckbox columnData={{ ...columnData, isToggleAllDisabled: () => true }} />);

		// then
		expect(screen.getByRole('checkbox')).toBeDisabled();
	});

	it('should render a checked checkbox on header', () => {
		// when
		render(<HeaderCheckbox columnData={{ ...columnData, isSelected: () => true }} />);

		// then
		expect(screen.getByRole('checkbox')).toBeChecked();
	});

	it('should render a partial checkbox on header', () => {
		// when
		render(<HeaderCheckbox columnData={{ ...columnData, isSelected: ({ id }) => id === 1 }} />);

		// then
		expect(screen.getByRole('checkbox')).toHaveAttribute('data-checked', '1');
	});
});
