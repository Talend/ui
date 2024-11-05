import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import getDefaultT from '../../../translate';
import { BadgeCheckboxesForm } from './BadgeCheckboxesForm.component';

const checkboxValues = [
	{
		id: 'checkbox-one',
		label: 'Checkbox One',
	},
	{
		id: 'checkbox-two',
		label: 'Checkbox Two',
	},
	{
		id: 'checkbox-three',
		label: 'Checkbox Three',
	},
];

const t = getDefaultT();

describe('BadgeCheckboxesForm', () => {
	it('should render three checkboxes', () => {
		// Given
		const props = {
			checkboxValues,
			id: 'myId',
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			value: [],
			feature: 'Connection type',
			t,
		};
		// When
		render(<BadgeCheckboxesForm {...props} />);
		// Then
		expect(
			screen.getByTestId('badge-checkbox-form-checkbox-checkbox-one').nextSibling,
		).toHaveTextContent('Checkbox One');
		expect(
			screen.getByTestId('badge-checkbox-form-checkbox-checkbox-two').nextSibling,
		).toHaveTextContent('Checkbox Two');
		expect(
			screen.getByTestId('badge-checkbox-form-checkbox-checkbox-three').nextSibling,
		).toHaveTextContent('Checkbox Three');
		expect(screen.getAllByRole('checkbox')).toHaveLength(3);
	});
	it('should show skeletons if items are loading', () => {
		// Given
		const props = {
			checkboxValues,
			id: 'myId',
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			value: [],
			feature: 'Connection type',
			t,
			isLoading: true,
		};
		// When
		render(<BadgeCheckboxesForm {...props} />);
		// Then
		expect(screen.getByTestId('badge-checkbox-form-skeleton-item')).toBeVisible();
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('should trigger on change callback when checkbox generated from checkbox values are clicked', async () => {
		// Given
		const onChange = jest.fn();
		const props = {
			checkboxValues,
			id: 'myId',
			onChange,
			onSubmit: jest.fn(),
			value: [],
			feature: 'Connection type',
			t,
		};
		// When
		render(<BadgeCheckboxesForm {...props} />);
		expect(screen.getByTestId('badge-checkbox-form-checkbox-checkbox-one')).not.toBeChecked();
		await userEvent.click(screen.getByTestId('badge-checkbox-form-checkbox-checkbox-one'));
		// Then
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toEqual([
			{ checked: true, id: 'checkbox-one', label: 'Checkbox One' },
		]);
	});
	it('should trigger on change callback when all checkbox is checked', async () => {
		// Given
		const onChange = jest.fn();
		const props = {
			checkboxValues,
			id: 'myId',
			onChange,
			onSubmit: jest.fn(),
			value: [],
			feature: 'Connection type',
			allSelector: true,
			t,
		};
		// When
		render(<BadgeCheckboxesForm {...props} />);
		expect(screen.getByTestId('badge-checkbox-form-checkbox-checkbox-one')).not.toBeChecked();
		expect(screen.getByTestId('badge-checkbox-form-checkbox-checkbox-two')).not.toBeChecked();
		expect(screen.getByTestId('badge-checkbox-form-checkbox-checkbox-three')).not.toBeChecked();
		await userEvent.click(screen.getByTestId('badge-checkbox-form-checkbox-selectAll'));
		// Then
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toEqual([
			{ checked: true, id: 'checkbox-one', label: 'Checkbox One' },
			{ checked: true, id: 'checkbox-two', label: 'Checkbox Two' },
			{ checked: true, id: 'checkbox-three', label: 'Checkbox Three' },
		]);
	});
	it('should display checkbox one checked', () => {
		// Given
		const props = {
			checkboxValues,
			id: 'myId',
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			value: [
				{
					checked: true,
					id: 'checkbox-one',
					label: 'Checkbox One',
				},
			],
			feature: 'Connection type',
			t,
		};
		// When
		render(<BadgeCheckboxesForm {...props} />);
		// Then
		expect(screen.getByTestId('badge-checkbox-form-checkbox-checkbox-one')).toBeChecked();
	});
	it('should display all checkbox checked', () => {
		// Given
		const props = {
			checkboxValues,
			id: 'myId',
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			value: [
				{
					checked: true,
					id: 'checkbox-one',
					label: 'Checkbox One',
				},
				{
					checked: true,
					id: 'checkbox-two',
					label: 'Checkbox Two',
				},
				{
					checked: true,
					id: 'checkbox-three',
					label: 'Checkbox Three',
				},
			],
			allSelector: true,
			feature: 'Connection type',
			t,
		};
		// When
		render(<BadgeCheckboxesForm {...props} />);
		// Then
		expect(screen.getByTestId('badge-checkbox-form-checkbox-selectAll')).toBeChecked();
	});
	it('should filter the displayed checkbox using the filter bar', async () => {
		// Given
		const props = {
			checkboxValues,
			id: 'myId',
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			feature: 'Connection type',
			value: [],
			t,
		};
		// When
		render(<BadgeCheckboxesForm {...props} />);

		expect(screen.getByTestId('badge-checkbox-form-checkbox-checkbox-one')).toBeVisible();
		expect(screen.getByTestId('badge-checkbox-form-checkbox-checkbox-two')).toBeVisible();
		expect(screen.getByTestId('badge-checkbox-form-checkbox-checkbox-three')).toBeVisible();

		await userEvent.type(screen.getByRole('searchbox'), 'One');

		// Then
		expect(screen.getByTestId('badge-checkbox-form-checkbox-checkbox-one')).toBeVisible();
		expect(
			screen.queryByTestId('badge-checkbox-form-checkbox-checkbox-two'),
		).not.toBeInTheDocument();
		expect(
			screen.queryByTestId('badge-checkbox-form-checkbox-checkbox-three'),
		).not.toBeInTheDocument();
	});

	it('should call the submit callback', async () => {
		const onSubmit = jest.fn();
		// Give
		const props = {
			checkboxValues,
			id: 'myId',
			onChange: jest.fn(),
			onSubmit,
			value: [],
			feature: 'Connection type',
			t,
		};
		// When
		render(<BadgeCheckboxesForm {...props} />);
		await userEvent.click(
			screen.getByRole('button', {
				name: /apply/i,
			}),
		);
		// Then
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});
});
