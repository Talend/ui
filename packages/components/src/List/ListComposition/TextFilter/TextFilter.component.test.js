/* eslint-disable react/prop-types */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import getDefaultT from '../../../translate';
import { ListContext } from '../context';
import TextFilter from './TextFilter.component';

jest.unmock('@talend/design-system');

describe('TextFilter', () => {
	let defaultContext;

	beforeEach(() => {
		defaultContext = {
			textFilter: '',
			setTextFilter: jest.fn(),
			setFilteredColumns: jest.fn(),
			t: getDefaultT(),
		};
	});

	it('should render text filter component', () => {
		// when
		const { container } = render(
			<ListContext.Provider value={defaultContext}>
				<TextFilter id="myTextFilter" />
			</ListContext.Provider>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render text filter component with defined docked state', () => {
		// when
		render(
			<ListContext.Provider value={defaultContext}>
				<TextFilter id="myTextFilter" docked />
			</ListContext.Provider>,
		);

		// then
		expect(screen.getByRole('search').tagName).toBe('BUTTON');
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
	});

	it('should handle text filter changes (uncontrolled mode)', async () => {
		const user = userEvent.setup();

		// given
		const context = {
			...defaultContext,
			textFilter: '',
			setTextFilter: jest.fn(),
		};

		// when
		render(
			<ListContext.Provider value={context}>
				<TextFilter id="myTextFilter" initialDocked debounceTimeout={0} />
			</ListContext.Provider>,
		);
		await user.click(screen.getByRole('search'));
		await user.type(screen.getByRole('searchbox'), 'my-filter-value');

		// then
		expect(context.setTextFilter).toHaveBeenCalledWith('my-filter-value');
	});

	it('should deal with columns on which apply filter', () => {
		// when
		render(
			<ListContext.Provider value={defaultContext}>
				<TextFilter id="myTextFilter" applyOn={['foo']} />
			</ListContext.Provider>,
		);

		// then
		expect(defaultContext.setFilteredColumns).toHaveBeenCalledWith(['foo']);
	});

	it('should call the toggle callback when they are provided (controlled mode)', async () => {
		const user = userEvent.setup();

		// given
		const onToggle = jest.fn();

		// when
		render(
			<ListContext.Provider value={defaultContext}>
				<TextFilter id="myTextFilter" initialDocked onToggle={onToggle} />
			</ListContext.Provider>,
		);
		await user.click(screen.getByRole('search'));

		// then
		expect(onToggle).toHaveBeenCalled();
	});

	it('should call the callback on change (controlled mode)', async () => {
		const user = userEvent.setup();

		// given
		const onChange = jest.fn();
		render(
			<ListContext.Provider value={defaultContext}>
				<TextFilter
					id="myTextFilter"
					initialDocked={false}
					onChange={onChange}
					debounceTimeout={0}
					value="lol"
				/>
			</ListContext.Provider>,
		);

		// when
		await user.click(screen.getByRole('search'));
		await user.clear(screen.getByRole('searchbox'));
		await user.type(screen.getByRole('searchbox'), 'my-filter-value');

		// then
		expect(onChange).toHaveBeenCalledWith(expect.anything(), 'my-filter-value');
	});

	it('should not be docked when text filter is not empty', async () => {
		const user = userEvent.setup();

		// given
		const context = {
			...defaultContext,
			textFilter: 'my-filter-value',
			setTextFilter: jest.fn(),
		};

		// when
		render(
			<ListContext.Provider value={context}>
				<TextFilter id="myTextFilter" initialDocked />
			</ListContext.Provider>,
		);

		await user.click(screen.getByRole('search'));

		// then
		expect(screen.queryByRole('search').tagName).toBe('FORM'); // this not anymore a button
		expect(screen.getByRole('searchbox')).toBeInTheDocument();

		expect(screen.getByRole('searchbox')).toHaveValue('my-filter-value');

		// when
		act(() => screen.getByRole('searchbox').blur());

		// then
		expect(screen.queryByRole('search').tagName).toBe('FORM'); // this not anymore a button
		expect(screen.getByRole('searchbox')).toBeInTheDocument();
	});

	it('should be docked when text filter is empty', async () => {
		const user = userEvent.setup();

		// given
		const context = {
			...defaultContext,
			textFilter: '',
			setTextFilter: jest.fn(),
		};

		// when
		render(
			<ListContext.Provider value={context}>
				<TextFilter id="myTextFilter" initialDocked />
			</ListContext.Provider>,
		);
		await user.click(screen.getByRole('search'));

		// then
		expect(screen.getByRole('search').tagName).toBe('FORM');
		expect(screen.getByRole('searchbox')).toBeInTheDocument();

		// when
		act(() => screen.getByRole('searchbox').blur());

		// then
		expect(screen.queryByRole('search').tagName).toBe('BUTTON'); // this not anymore a button
		expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
	});
});
