import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListViewWidget from './ListViewWidget';

/* eslint-disable */
jest.mock('react-virtualized/dist/commonjs/AutoSizer/AutoSizer', () => props => (
	<div id="autoSizer">{props.children({ height: 30, width: 30 })}</div>
));
jest.useFakeTimers();
/* eslint-enable */

const EMPTY_LIST_MESSAGE = 'This list is empty.';
const NO_RESULT_MESSAGE = 'No result found.';

function getValueLabelPair(item) {
	if (typeof item === 'object') {
		return item;
	}

	return {
		label: item,
		value: item,
	};
}

function generateProps(values, selected) {
	return {
		id: 'my-widget',
		options: {
			enumOptions: values.map(getValueLabelPair),
		},
		multiple: true,
		value: selected || [],
		disabled: false,
		readonly: false,
		autofocus: false,
	};
}

describe('ListViewWidget', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('should detect props change to update items', () => {
		// given
		const values = ['A', 'B', 'C', 'D'];
		const nextValues = ['A', 'F', 'G', 'H'];
		const onChange = jest.fn();
		const { rerender } = render(
			<ListViewWidget {...generateProps(values, values.slice(0, 2))} onChange={onChange} />,
		);
		expect(screen.getByRole('checkbox', { name: 'Deselect A' })).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'Deselect B' })).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'Select C' })).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'Select D' })).toBeInTheDocument();

		// when
		rerender(
			<ListViewWidget {...generateProps(nextValues, nextValues.slice(0, 2))} onChange={onChange} />,
		);

		// then
		expect(screen.getByRole('checkbox', { name: 'Select A' })).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'Select F' })).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'Select G' })).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'Select H' })).toBeInTheDocument();
	});

	describe('toggleAll', () => {
		it('should check every items', () => {
			// given
			const values = ['A', 'B', 'C', 'D'];
			const onChangeHandler = jest.fn();
			render(
				<ListViewWidget
					onChange={onChangeHandler}
					{...generateProps(values, values.slice(0, 2))}
				/>,
			);

			// when
			userEvent.click(screen.getByRole('checkbox', { name: 'Select all' }));

			// then
			expect(onChangeHandler).toBeCalledWith(values);
		});

		it('should uncheck every items', () => {
			// given
			const values = ['A', 'B', 'C', 'D'];
			const onChangeHandler = jest.fn();
			render(<ListViewWidget onChange={onChangeHandler} {...generateProps(values, values)} />);

			// when
			userEvent.click(screen.getByRole('checkbox', { name: 'Deselect all' }));

			// then
			expect(onChangeHandler).toBeCalledWith([]);
		});

		it('should be checked when every items are checked', () => {
			// given
			const values = ['A', 'B', 'C', 'D'];
			render(<ListViewWidget onChange={jest.fn()} {...generateProps(values)} />);
			expect(screen.getByRole('checkbox', { name: 'Select all' })).not.toBeChecked();

			// when
			userEvent.click(screen.getByRole('checkbox', { name: 'Select A' }));
			userEvent.click(screen.getByRole('checkbox', { name: 'Select B' }));
			userEvent.click(screen.getByRole('checkbox', { name: 'Select C' }));
			userEvent.click(screen.getByRole('checkbox', { name: 'Select D' }));

			// then
			expect(screen.getByRole('checkbox', { name: 'Deselect all' })).toBeChecked();
		});

		it('should check only filtered items', () => {
			// given
			const values = ['Azert', 'Bnaze', 'Cvbn', 'Dfgh'];
			const onChangeHandler = jest.fn();
			render(<ListViewWidget onChange={onChangeHandler} {...generateProps(values)} />);

			expect(screen.getByRole('checkbox', { name: 'Select Azert' })).not.toBeChecked();
			expect(screen.getByRole('checkbox', { name: 'Select Bnaze' })).not.toBeChecked();
			expect(screen.getByRole('checkbox', { name: 'Select Cvbn' })).not.toBeChecked();
			expect(screen.getByRole('checkbox', { name: 'Select Dfgh' })).not.toBeChecked();

			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));
			userEvent.type(screen.getByRole('textbox', { name: 'Search' }), 'ze');
			jest.runAllTimers();

			// when
			userEvent.click(screen.getByRole('checkbox', { name: 'Select all' }));

			// then
			expect(screen.getByRole('checkbox', { name: 'Deselect Azert' })).toBeChecked();
			expect(screen.getByRole('checkbox', { name: 'Deselect Bnaze' })).toBeChecked();
			expect(screen.queryByRole('checkbox', { name: 'Select Cvbn' })).not.toBeInTheDocument();
			expect(screen.queryByRole('checkbox', { name: 'Select Dfgh' })).not.toBeInTheDocument();
			expect(onChangeHandler).toBeCalledWith(['Azert', 'Bnaze']);

			// when
			userEvent.click(screen.getByRole('link', { name: 'Abort' }));

			// then
			expect(screen.getByRole('checkbox', { name: 'Deselect Azert' })).toBeChecked();
			expect(screen.getByRole('checkbox', { name: 'Deselect Bnaze' })).toBeChecked();
			expect(screen.getByRole('checkbox', { name: 'Select Cvbn' })).not.toBeChecked();
			expect(screen.getByRole('checkbox', { name: 'Select Dfgh' })).not.toBeChecked();
		});
	});

	describe('search', () => {
		it('input should be hidden by default', () => {
			// when
			render(<ListViewWidget {...generateProps([])} onChange={jest.fn()} />);

			// then
			expect(screen.queryByRole('textbox', { name: 'Search' })).not.toBeInTheDocument();
		});

		it('should input should be toggled when clicking on search icon', () => {
			// given
			render(<ListViewWidget {...generateProps([])} onChange={jest.fn()} />);

			// when
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));

			// then
			expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
		});

		it('should filter displayed items', () => {
			// given
			const values = ['Azert', 'Bnaze', 'Cvbn', 'Dfgh'];
			const onChangeHandler = jest.fn();
			render(<ListViewWidget onChange={onChangeHandler} {...generateProps(values)} />);
			expect(screen.getAllByRole('option').length).toBe(4);

			// when
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));
			userEvent.type(screen.getByRole('textbox', { name: 'Search' }), 'ze');
			jest.runAllTimers();

			// then
			expect(screen.getAllByRole('option').length).toBe(2);
			expect(screen.getByRole('checkbox', { name: 'Select Azert' })).toBeInTheDocument();
			expect(screen.getByRole('checkbox', { name: 'Select Bnaze' })).toBeInTheDocument();
		});

		it('should display a message when no results was found', () => {
			// given
			const values = ['A', 'B', 'C', 'D'];
			const onChangeHandler = jest.fn();
			render(<ListViewWidget onChange={onChangeHandler} {...generateProps(values)} />);
			expect(screen.getAllByRole('option').length).toBe(4);

			// when
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));
			userEvent.type(screen.getByRole('textbox', { name: 'Search' }), 'aaaaaa');
			jest.runAllTimers();

			// then
			expect(screen.queryAllByRole('option').length).toBe(0);
			expect(screen.getByText(NO_RESULT_MESSAGE)).toBeInTheDocument();
		});
	});

	it('should only return checked', () => {
		// given
		const values = ['A', 'B', 'C', 'D'];
		const handler = jest.fn();
		render(<ListViewWidget onChange={handler} {...generateProps(values)} />);

		// when
		userEvent.click(screen.getByRole('checkbox', { name: 'Select B' }));
		userEvent.click(screen.getByRole('checkbox', { name: 'Select C' }));

		// then
		expect(handler).toBeCalledWith(['B', 'C']);
	});

	it('should display empty label if list is empty', () => {
		// given
		const values = [];

		// When
		render(<ListViewWidget {...generateProps(values)} onChange={jest.fn()} />);

		// then
		expect(screen.getByText(EMPTY_LIST_MESSAGE)).toBeInTheDocument();
	});

	describe('enumOptions management', () => {
		it('should display labels if available', () => {
			// given
			const values = [
				{ value: 'key1', label: 'Label 1' },
				{ value: 'key2', label: 'Label 2' },
				{ value: 'key3', label: 'Label 3' },
				{ value: 'key4', label: 'Label 4' },
			];
			render(<ListViewWidget {...generateProps(values)} onChange={jest.fn()} />);

			// then
			expect(screen.getByText('Label 1')).toBeInTheDocument();
			expect(screen.getByText('Label 2')).toBeInTheDocument();
			expect(screen.getByText('Label 3')).toBeInTheDocument();
			expect(screen.getByText('Label 4')).toBeInTheDocument();
		});

		it('should display key if no labels are available', () => {
			// when
			const values = ['key1', 'key2', 'key3', 'key4'];
			render(<ListViewWidget {...generateProps(values)} onChange={jest.fn()} />);

			// then
			expect(screen.getByText('key1')).toBeInTheDocument();
			expect(screen.getByText('key2')).toBeInTheDocument();
			expect(screen.getByText('key3')).toBeInTheDocument();
			expect(screen.getByText('key4')).toBeInTheDocument();
		});

		it('should returns keys even if label are provided', () => {
			// given
			const values = [{ value: 'key1', label: 'Label 1' }];
			const onChange = jest.fn();
			render(<ListViewWidget onChange={onChange} {...generateProps(values)} />);

			// when
			userEvent.click(screen.getByRole('checkbox', { name: 'Select Label 1' }));

			// then
			expect(onChange).toBeCalledWith(['key1']);
		});
	});
});
