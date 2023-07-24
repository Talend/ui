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
		const { container } = render(<Component {...props} />);
		// Then
		expect(container).toMatchSnapshot();
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
		expect(document.querySelectorAll('svg[name="talend-locked"]')).toHaveLength(2);
	});
});
