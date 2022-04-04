import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FilterBar from './FilterBar.component';

describe('Filter', () => {
	const noOp = jest.fn();

	it('should render Toggle filter button', () => {
		// when
		render(<FilterBar onFilter={noOp} onToggle={noOp} docked />);

		// then
		expect(screen.getByLabelText('Toggle filter')).toBeInTheDocument();
		expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
	});

	it('should render input on undocked filter', () => {
		// when
		render(
			<FilterBar
				onFilter={noOp}
				onToggle={noOp}
				placeholder="custom search text"
				value="search string"
				docked={false}
			/>,
		);

		// then
		expect(screen.queryByLabelText('Toggle filter')).not.toBeInTheDocument();
		const input = screen.getByRole('searchbox');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('placeholder', 'custom search text');
		expect(input).toHaveValue('search string');
	});

	it('should render input on not dockable filter', () => {
		// when
		render(<FilterBar onFilter={noOp} onToggle={noOp} dockable={false} />);

		// then
		expect(screen.queryByLabelText('Toggle filter')).not.toBeInTheDocument();
		const input = screen.getByRole('searchbox');
		expect(input).toBeInTheDocument();
	});

	it('should render id if provided', () => {
		// when
		render(<FilterBar id="test" onFilter={noOp} onToggle={noOp} docked={false} />);

		// then
		expect(screen.getByRole('searchbox')).toHaveAttribute('id', 'test-input');
	});

	it('should render highlighted filter', () => {
		// when
		render(<FilterBar highlight onFilter={noOp} onToggle={noOp} docked={false} />);

		// then
		expect(screen.getByRole('search')).toHaveClass('theme-highlight');
	});

	it('should render disabled', () => {
		// when
		render(<FilterBar highlight onFilter={noOp} onToggle={noOp} docked={false} disabled />);

		// then
		expect(screen.getByRole('searchbox')).toBeDisabled();
	});

	it('should call onToggle on search icon click', () => {
		// when
		const onToggle = jest.fn();
		render(<FilterBar onFilter={noOp} onToggle={onToggle} docked />);

		expect(onToggle).not.toBeCalled();

		// then
		userEvent.click(screen.queryByRole('search'));

		// then
		expect(onToggle).toBeCalled();
	});

	it('should take props value change', () => {
		// given
		const { rerender } = render(
			<FilterBar onFilter={noOp} onToggle={noOp} value="old search" docked={false} />,
		);
		expect(screen.getByRole('searchbox')).toHaveValue('old search');

		// when
		rerender(<FilterBar onFilter={noOp} onToggle={noOp} value="new search" docked={false} />);

		// then
		expect(screen.getByRole('searchbox')).toHaveValue('new search');
	});

	it('should accept data-test attribute', () => {
		// when
		render(
			<FilterBar
				onFilter={noOp}
				onToggle={noOp}
				docked={false}
				value="whatever"
				data-test="testid"
			/>,
		);

		// then
		expect(screen.getByRole('searchbox')).toHaveAttribute('data-test', 'testid');
		expect(screen.getByRole('button')).toHaveAttribute('data-test', 'testid-reset');
	});

	it('should accept data-feature attribute', () => {
		// when
		render(
			<FilterBar
				onFilter={noOp}
				onToggle={noOp}
				docked={false}
				value="whatever"
				data-feature="featureid"
			/>,
		);

		// then
		expect(screen.getByRole('searchbox')).toHaveAttribute('data-feature', 'featureid');
		expect(screen.getByRole('button')).toHaveAttribute('data-feature', 'featureid-reset');
	});

	it('should autofocus on input by default', () => {
		// when
		render(<FilterBar onFilter={noOp} onToggle={noOp} docked={false} />);

		// then
		expect(screen.getByRole('searchbox')).toHaveFocus();
	});

	it('should call onFocus callback', () => {
		// given
		const onFocus = jest.fn();
		render(
			<FilterBar
				onFilter={noOp}
				onToggle={noOp}
				onFocus={onFocus}
				docked={false}
				autoFocus={false}
			/>,
		);
		expect(onFocus).not.toBeCalled();

		// when
		userEvent.click(screen.getByRole('searchbox'));

		// then
		expect(onFocus).toBeCalled();
	});

	it('should call onBlur callback', () => {
		// given
		const onBlur = jest.fn();
		render(<FilterBar onFilter={noOp} onToggle={noOp} onBlur={onBlur} docked={false} />);
		expect(onBlur).not.toBeCalled();

		// when
		fireEvent.blur(screen.getByRole('searchbox'));

		// then
		expect(onBlur).toBeCalled();
	});

	it('should call onFilter callback', () => {
		// given
		const onFilter = jest.fn();
		render(<FilterBar onToggle={noOp} onFilter={onFilter} docked={false} value="" />);
		expect(onFilter).not.toBeCalled();

		// when
		userEvent.type(screen.getByRole('searchbox'), 'coucou');

		// then
		expect(onFilter).toBeCalledWith(expect.anything(), 'coucou');
	});

	it('should call onFilter callback with debounce time', done => {
		// given
		const onFilter = jest.fn();
		render(<FilterBar onToggle={noOp} onFilter={onFilter} docked={false} debounceTimeout={300} />);
		expect(onFilter).not.toBeCalled();

		// when
		userEvent.type(screen.getByRole('searchbox'), 'coucou');

		// then
		expect(onFilter).not.toBeCalled();
		setTimeout(() => {
			expect(onFilter).toBeCalledWith(expect.anything(), 'coucou');
			done();
		}, 500);
	});

	it('should not call onFilter with with short text', done => {
		const onFilter = jest.fn();
		render(
			<FilterBar
				onToggle={noOp}
				onFilter={onFilter}
				docked={false}
				debounceMinLength={3}
				debounceTimeout={300}
			/>,
		);
		expect(onFilter).not.toBeCalled();

		// when
		userEvent.type(screen.getByRole('searchbox'), 'c');
		expect(onFilter).not.toBeCalled();

		// then
		setTimeout(() => {
			expect(onFilter).not.toBeCalled();
			done();
		}, 500);
	});

	it('should call onFilter with long enough text', done => {
		const onFilter = jest.fn();
		const debounceTimeout = 300;
		render(
			<FilterBar
				onToggle={noOp}
				onFilter={onFilter}
				docked={false}
				debounceMinLength={3}
				debounceTimeout={debounceTimeout}
			/>,
		);
		expect(onFilter).not.toBeCalled();

		// when
		userEvent.type(screen.getByRole('searchbox'), 'couc');
		expect(onFilter).not.toBeCalled();

		// then
		setTimeout(() => {
			expect(onFilter).toBeCalledWith(expect.anything(), 'couc');
			done();
		}, debounceTimeout);
	});

	it('should clear filter on clear button click', () => {
		// given
		const onFilter = jest.fn();
		render(<FilterBar onToggle={noOp} onFilter={onFilter} docked={false} value="whatever" />);
		expect(onFilter).not.toBeCalled();
		expect(screen.getByRole('searchbox')).toHaveValue('whatever');

		// when
		userEvent.click(screen.getByRole('button'));

		// then
		expect(onFilter).toBeCalledWith(expect.anything(), '');
		expect(screen.getByRole('searchbox')).toHaveValue('');
	});

	it('should clear filter on ESC keydown', () => {
		// given
		const onFilter = jest.fn();
		render(<FilterBar onToggle={noOp} onFilter={onFilter} docked={false} value="whatever" />);
		expect(onFilter).not.toBeCalled();

		// when
		userEvent.type(screen.getByRole('searchbox'), '{esc}');

		// then
		expect(onFilter).toBeCalledWith(expect.anything(), '');
		expect(screen.getByRole('searchbox')).toHaveValue('');
	});

	it('should blur on ENTER keydown', () => {
		// given
		const onBlur = jest.fn();
		render(
			<FilterBar onToggle={noOp} onFilter={noOp} onBlur={onBlur} docked={false} value="whatever" />,
		);
		expect(onBlur).not.toBeCalled();

		// when
		userEvent.type(screen.getByRole('searchbox'), '{enter}');

		// then
		expect(onBlur).toBeCalled();
	});
});
