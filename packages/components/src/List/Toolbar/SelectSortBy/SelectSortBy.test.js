// rewrite tests using react-testing-library
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectSortBy from './SelectSortBy.component';

const id = 'toolbar-sort';
const field = 'id';
const requiredProps = {
	onChange: jest.fn(),
	options: [
		{ id: 'id', name: 'Id' },
		{ id: 'name', name: 'Name' },
	],
};

jest.unmock('@talend/design-system');

describe('SelectSortBy', () => {
	it('should render', () => {
		// given
		const props = {
			field,
			...requiredProps,
		};

		// when
		const { container } = render(<SelectSortBy {...props} />);

		// then
		expect(container).toMatchSnapshot();
		expect(screen.getByRole('menu')).toBeInTheDocument();
	});

	it('should render with no dropdown if one option', () => {
		// given
		const props = {
			field,
			...requiredProps,
			options: [{ id: 'id', name: 'Id' }],
		};

		// when
		render(<SelectSortBy {...props} />);

		// then
		expect(screen.getByText('Id')).toBeInTheDocument();
		expect(screen.queryByRole('menu')).not.toBeInTheDocument();
	});

	it('should render without field selected', () => {
		// when
		render(<SelectSortBy {...requiredProps} />);

		// then
		// no selected => N.C
		expect(screen.getByText('N.C')).toBeInTheDocument();
		// no change order
		expect(
			screen.queryByLabelText('Change sort order. Current order: Ascending.'),
		).not.toBeInTheDocument();
	});

	it('should render id if provided', () => {
		// given
		const props = {
			id,
			field,
			...requiredProps,
		};

		// when
		render(<SelectSortBy {...props} />);

		// then
		expect(screen.queryByText('N.C')).not.toBeInTheDocument();
		expect(
			screen.getByLabelText('Change sort order. Current order: Ascending.'),
		).toBeInTheDocument();
	});

	it('should call toggle callback on sort-order click', () => {
		// given
		const props = {
			id,
			field,
			...requiredProps,
		};

		// when
		render(<SelectSortBy {...props} />);

		userEvent.click(screen.getByLabelText('Change sort order. Current order: Ascending.'));

		// then
		expect(props.onChange).toHaveBeenCalledWith(expect.anything(), {
			field: 'id',
			isDescending: true,
		});
	});
});
