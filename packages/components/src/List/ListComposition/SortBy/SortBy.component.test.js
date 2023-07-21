/* eslint-disable react/prop-types */
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import getDefaultT from '../../../translate';
import { ListContext } from '../context';

import SortBy from './SortBy.component';

jest.unmock('@talend/design-system');

describe('SortBy', () => {
	const defaultProps = {
		options: [
			{ key: 'firstName', label: 'First Name' },
			{ key: 'lastName', label: 'Last Name' },
		],
	};

	const defaultContext = {
		sortParams: {},
		setSortParams: jest.fn(),
		t: getDefaultT(),
	};
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('should render sort by component', () => {
		// when
		const { container } = render(
			<ListContext.Provider value={defaultContext}>
				<SortBy id="mySortBy" {...defaultProps} />
			</ListContext.Provider>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render sort by component with sorting parameter from context', () => {
		// given
		const contextValue = { ...defaultContext, sortParams: { sortBy: 'firstName' } };

		// when
		render(
			<ListContext.Provider value={contextValue}>
				<SortBy id="mySortBy" {...defaultProps} />
			</ListContext.Provider>,
		);

		// then
		expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('First Name');
	});

	it('should render sort by component with sorting parameter from props', () => {
		// given
		const props = {
			...defaultProps,
			onChange: jest.fn(),
			value: { sortBy: 'lastName', isDescending: true },
		};

		// when
		render(
			<ListContext.Provider value={defaultContext}>
				<SortBy id="mySortBy" {...props} />
			</ListContext.Provider>,
		);

		// then
		expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('Last Name');
	});

	it('should handle sort field and direction changes (uncontrolled mode)', async () => {
		// given
		const context = {
			...defaultContext,
			sortParams: { sortBy: 'lastName', isDescending: false },
			setSortParams: jest.fn(),
		};

		const initialSortParams = { sortBy: 'lastName', isDescending: false };
		render(
			<ListContext.Provider initialSortParams={initialSortParams} value={context}>
				<SortBy id="mySortBy" {...defaultProps} />
			</ListContext.Provider>,
		);

		// when
		// await userEvent.click(screen.getAllByRole('listitem')[1]);
		await userEvent.click(screen.getAllByRole('menuitem')[0]);
		expect(screen.getAllByRole('menuitem')[0]).toHaveTextContent('First Name');

		// then
		expect(context.setSortParams.mock.calls[0][0]).toMatchObject({
			sortBy: 'firstName',
			isDescending: false,
		});

		// await userEvent.click(screen.getAllByRole('listitem')[1]);
		await userEvent.click(screen.getAllByRole('menuitem')[1]);
		expect(screen.getAllByRole('menuitem')[1]).toHaveTextContent('Last Name');
		// then
		expect(context.setSortParams.mock.calls[1][0]).toMatchObject({
			sortBy: 'lastName',
			isDescending: false,
		});
	});

	it('should call the change callbacks when they are provided (controlled mode)', async () => {
		// given
		const props = {
			...defaultProps,
			id: 'mySortBy',
			onChange: jest.fn(),
			value: { sortBy: 'lastName', isDescending: true },
		};

		render(
			<ListContext.Provider value={defaultContext}>
				<SortBy {...props} />
			</ListContext.Provider>,
		);

		// when
		await userEvent.click(screen.getByText('First Name'));

		// then
		expect(props.onChange).toHaveBeenCalledWith(expect.anything(), {
			sortBy: 'firstName',
			isDescending: true,
		});

		await userEvent.click(screen.getAllByRole('menuitem')[1]);

		// then
		expect(props.onChange).toHaveBeenCalledWith(expect.anything(), {
			sortBy: 'lastName',
			isDescending: true,
		});
	});
});
