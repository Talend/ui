import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortOptions, { TYPES, ORDERS } from './SortOptions.component';

describe('SortOptions', () => {
	it('should render SortOptions in default mode', () => {
		const props = {
			onChange: () => {},
		};

		const { container } = render(<SortOptions {...props} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render SortOptions with name in ASC mode', () => {
		const props = {
			onChange: () => {},
			orders: {
				[TYPES.DATE]: ORDERS.DESC,
				[TYPES.NAME]: ORDERS.ASC,
			},
		};

		render(<SortOptions {...props} />);
		expect(screen.getByLabelText('Sort by name (current order: asc)')).toBeVisible();
		expect(screen.getByLabelText('Sort by date (current order: desc)')).toBeVisible();
	});

	it('should render SortOptions with date in ASC mode', () => {
		const props = {
			onChange: () => {},
			orders: {
				[TYPES.DATE]: ORDERS.ASC,
				[TYPES.NAME]: ORDERS.DESC,
			},
		};

		render(<SortOptions {...props} />);
		expect(screen.getByLabelText('Sort by name (current order: desc)')).toBeVisible();
		expect(screen.getByLabelText('Sort by date (current order: asc)')).toBeVisible();
	});

	it('should render SortOptions with only the date type', () => {
		const props = {
			onChange: () => {},
			orders: {
				[TYPES.DATE]: ORDERS.ASC,
				[TYPES.NAME]: ORDERS.DESC,
			},
			types: [TYPES.DATE],
		};

		render(<SortOptions {...props} />);
		expect(screen.queryByLabelText('Sort by name (current order: desc)')).not.toBeInTheDocument();
		expect(screen.getByLabelText('Sort by date (current order: asc)')).toBeVisible();
	});

	it('should render SortOptions with only the name type', () => {
		const props = {
			onChange: () => {},
			orders: {
				[TYPES.DATE]: ORDERS.ASC,
				[TYPES.NAME]: ORDERS.DESC,
			},
			types: [TYPES.NAME],
		};

		render(<SortOptions {...props} />);
		expect(screen.getByLabelText('Sort by name (current order: desc)')).toBeVisible();
		expect(screen.queryByLabelText('Sort by date (current order: asc)')).not.toBeInTheDocument();
	});

	it('should not render SortOptions when no type is specified', () => {
		const props = {
			onChange: () => {},
			orders: {
				[TYPES.DATE]: ORDERS.ASC,
				[TYPES.NAME]: ORDERS.DESC,
			},
			types: [],
		};

		render(<SortOptions {...props} />);
		expect(screen.queryByLabelText('Sort by name (current order: desc)')).not.toBeInTheDocument();
		expect(screen.queryByLabelText('Sort by date (current order: asc)')).not.toBeInTheDocument();
	});

	it('should trigger onChange callback with the new state on click', () => {
		const onChange = jest.fn();
		render(
			<SortOptions
				onChange={onChange}
				nameAsc={false}
				dateAsc
				icon="talend-sort-desc"
				types={[TYPES.NAME, TYPES.DATE]}
				orders={{
					[TYPES.NAME]: ORDERS.ASC,
					[TYPES.DATE]: ORDERS.DESC,
				}}
			/>,
		);

		expect(onChange).not.toHaveBeenCalled();

		userEvent.click(screen.getByLabelText('Sort by name (current order: asc)'));
		expect(onChange).toHaveBeenCalledWith(TYPES.NAME, ORDERS.DESC);

		userEvent.click(screen.getByLabelText('Sort by date (current order: desc)'));
		expect(onChange).toHaveBeenCalledWith(TYPES.DATE, ORDERS.ASC);
	});
});
