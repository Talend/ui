import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Component from './ColumnChooser.component';

jest.unmock('@talend/design-system');

const columns = [
	{ key: 'id', label: 'Id', order: 1 },
	{ key: 'name', label: 'Name', order: 2 },
	{ key: 'author', label: 'Author', order: 3 },
	{ key: 'created', label: 'Created', order: 6 },
	{
		key: 'modified',
		label: 'Very long name long name long name long name long name',
		order: 4,
		header: 'icon',
		data: { iconName: 'talend-scheduler' },
	},
	{ key: 'icon', label: 'Icon', hidden: true, order: 5 },
];

describe('ColumnChooser', () => {
	it('should render with default props', () => {
		// Given
		const props = {
			id: 'my-id',
			columnsFromList: columns,
			onSubmit: jest.fn(),
		};
		// When
		render(<Component {...props} />);

		// Then it should the display the number of selected items
		expect(
			screen.getByText(
				`${columns.filter(column => !column.hidden).length}/${columns.length} selected`,
			),
		).toBeVisible();

		// Then a searchbox should be there
		expect(
			screen.getByRole('searchbox', {
				name: /find a column/i,
			}),
		).toBeVisible();

		// Then select all should have indeterminate state
		const selectAll = screen.getByLabelText(/select all/i);
		expect(selectAll).toBeChecked();
		expect(selectAll).toHaveAttribute('aria-checked', 'mixed'); // eslint-disable-line jest-dom/prefer-checked

		// Then items are listed
		expect(
			screen.getByRole('checkbox', {
				name: 'Id',
			}),
		).toBeChecked();
		expect(
			screen.getByRole('checkbox', {
				name: 'Name',
			}),
		).toBeChecked();
		expect(
			screen.getByRole('checkbox', {
				name: 'Author',
			}),
		).toBeChecked();
		expect(
			screen.getByRole('checkbox', {
				name: 'Created',
			}),
		).toBeChecked();
		expect(
			screen.getByRole('checkbox', {
				name: 'Very long name long name long name long name long name',
			}),
		).toBeChecked();
		expect(
			screen.getByRole('checkbox', {
				name: 'Icon',
			}),
		).not.toBeChecked();

		// Then there should be an apply button
		expect(
			screen.getByRole('button', {
				name: /apply/i,
			}),
		).toBeVisible();
	});
	it('should render with children', () => {
		// Given
		const props = {
			id: 'my-id',
			columnsFromList: columns,
			onSubmit: jest.fn(),
		};
		const Children = <div data-testid="my-child">Hello World</div>;
		// When
		render(<Component {...props}>{Children}</Component>);
		// Then
		expect(screen.getByTestId('my-child')).toBeVisible();
	});
	it('should trigger the onSubmit props', () => {
		// Given
		const onSubmit = jest.fn();
		const props = {
			id: 'my-id',
			columnsFromList: columns,
			onSubmit,
		};
		// When
		render(<Component {...props} />);
		userEvent.click(screen.getByLabelText('Apply'));

		// Then
		expect(onSubmit).toHaveBeenCalled();
		expect(onSubmit.mock.calls[0][1]).toEqual([
			{ hidden: false, key: 'id', label: 'Id', order: 1 },
			{ hidden: false, key: 'name', label: 'Name', order: 2 },
			{ hidden: false, key: 'author', label: 'Author', order: 3 },
			{
				hidden: false,
				key: 'modified',
				label: 'Very long name long name long name long name long name',
				order: 4,
			},
			{ hidden: true, key: 'icon', label: 'Icon', order: 5 },
			{ hidden: false, key: 'created', label: 'Created', order: 6 },
		]);
	});
	it('should filter the columns by name if an initial filter value is provided', () => {
		// Given
		const props = {
			id: 'my-id',
			initialFilterValue: 'Name',
			columnsFromList: columns,
			onSubmit: jest.fn(),
		};
		// When
		render(<Component {...props} />);

		// Then
		expect(screen.queryByText('Author')).not.toBeInTheDocument();
		expect(screen.getByText('Name')).toBeInTheDocument();
	});
	it('should locked the first two columns', () => {
		// Given
		const props = {
			id: 'my-id',
			columnsFromList: columns,
			onSubmit: jest.fn(),
			nbLockedLeftItems: 2,
		};
		// When
		render(<Component {...props} />);
		// Then
		expect(document.querySelectorAll('use[xlink:href="#locker-closed:M"]')).toHaveLength(2);
	});
});
