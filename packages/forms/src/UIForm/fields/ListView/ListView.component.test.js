import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ListView from './ListView.component';

const NO_RESULT_MESSAGE = 'No result found.';

describe('ListView field', () => {
	let props;
	const schema = {
		description: 'This is the ListView field',
		disabled: false,
		required: true,
		title: 'Countries',
		titleMap: [
			{ name: 'Afghanistan', value: 'country1' },
			{ name: 'Albania', value: 'country2' },
			{ name: 'Algeria', value: 'country3' },
			{ name: 'Andorra', value: 'country4' },
		],
	};
	const alternativeSchema = {
		description: 'This is the ListView field',
		disabled: true,
		isSwitchBox: false,
		required: true,
		title: 'Some countries',
		titleMap: [
			{ name: 'Afghanistan', value: 'country1' },
			{ name: 'Albania', value: 'country2' },
			{ name: 'Algeria', value: 'country3' },
			{ name: 'Andorra', value: 'country4' },
			{ name: 'Angola', value: 'country5' },
			{ name: 'Anguilla', value: 'country6' },
		],
	};
	const noItemsSchema = {
		description: 'This is the ListView field',
		disabled: false,
		isSwitchBox: false,
		required: true,
		title: 'Countries',
		titleMap: [],
	};

	beforeEach(() => {
		props = {
			id: 'my-list-view',
			isSwitchBox: true,
			isValid: true,
			errorMessage: 'This is wrong',
			onChange: jest.fn(),
			onFinish: jest.fn(),
			schema,
			value: ['country2', 'country3'],
		};
	});

	describe('render', () => {
		it('should render ListView items', () => {
			// when
			render(<ListView {...props} />);

			// then
			expect(screen.getByText('Afghanistan')).toBeInTheDocument();
			expect(screen.getByText('Albania')).toBeInTheDocument();
			expect(screen.getByText('Algeria')).toBeInTheDocument();
			expect(screen.getByText('Andorra')).toBeInTheDocument();
		});

		it('should render no items message', () => {
			// when
			render(<ListView {...props} schema={noItemsSchema} />);

			// then
			expect(screen.getByText('This list is empty.')).toBeInTheDocument();
		});
	});

	it('should update items on props.value change', () => {
		// given
		const { rerender } = render(<ListView {...props} />);
		expect(screen.getByRole('checkbox', { name: 'Select Afghanistan' })).not.toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Deselect Albania' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Deselect Algeria' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Select Andorra' })).not.toBeChecked();

		// when
		rerender(<ListView {...props} value={['country3', 'country4']} />);

		// then
		expect(screen.getByRole('checkbox', { name: 'Select Afghanistan' })).not.toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Select Albania' })).not.toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Deselect Algeria' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Deselect Andorra' })).toBeChecked();
	});

	it('should update items on props.schema change', () => {
		// given
		const { rerender } = render(<ListView {...props} />);
		expect(screen.getByRole('checkbox', { name: 'Select Afghanistan' })).not.toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Deselect Albania' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Deselect Algeria' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Select Andorra' })).not.toBeChecked();

		// when
		const allValues = alternativeSchema.titleMap.map(option => option.value);
		rerender(<ListView {...props} schema={alternativeSchema} value={allValues} />);

		// then
		expect(screen.getByRole('checkbox', { name: 'Deselect Afghanistan' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Deselect Albania' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Deselect Algeria' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Deselect Andorra' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Deselect Angola' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Deselect Anguilla' })).toBeChecked();
	});

	describe('search', () => {
		it('input should be hidden by default', () => {
			// when
			render(<ListView {...props} />);

			// then
			expect(screen.queryByRole('textbox', { name: 'Search' })).not.toBeInTheDocument();
		});

		it('should display search input when clicking on search icon', () => {
			// given
			render(<ListView {...props} />);

			// when
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));

			// then
			expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
		});

		it('should filter displayed items', () => {
			// given
			jest.useFakeTimers();
			render(<ListView {...props} />);
			expect(screen.getAllByRole('option').length).toBe(4);

			// when
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));
			userEvent.type(screen.getByRole('textbox', { name: 'Search' }), 'al');
			jest.runAllTimers();

			// then
			expect(screen.getAllByRole('option').length).toBe(2);
			expect(screen.getByRole('checkbox', { name: 'Deselect Albania' })).toBeInTheDocument();
			expect(screen.getByRole('checkbox', { name: 'Deselect Algeria' })).toBeInTheDocument();
		});

		it('should display a message when no results were found', () => {
			// given
			jest.useFakeTimers();
			render(<ListView {...props} />);
			expect(screen.getAllByRole('option').length).toBe(4);

			// when
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));
			userEvent.type(screen.getByRole('textbox', { name: 'Search' }), 'aaaaaa');
			jest.runAllTimers();

			// then
			expect(screen.queryAllByRole('option').length).toBe(0);
			expect(screen.getByText(NO_RESULT_MESSAGE)).toBeInTheDocument();
		});

		it('should switch back to default mode on abort button click', () => {
			// given
			jest.useFakeTimers();
			render(<ListView {...props} />);
			expect(screen.getAllByRole('option').length).toBe(4);

			// when
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));
			userEvent.type(screen.getByRole('textbox', { name: 'Search' }), 'aaaaaa');
			jest.runAllTimers();
			userEvent.click(screen.getByRole('link', { name: 'Abort' }));

			// then
			expect(screen.queryAllByRole('option').length).toBe(4);
		});

		it('should switch back to default mode on ESC keydown', () => {
			// given
			jest.useFakeTimers();
			render(<ListView {...props} />);
			expect(screen.getAllByRole('option').length).toBe(4);

			// when
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));
			userEvent.type(screen.getByRole('textbox', { name: 'Search' }), 'aaaaaa');
			jest.runAllTimers();
			userEvent.type(screen.getByRole('textbox', { name: 'Search' }), '{esc}');

			// then
			expect(screen.queryAllByRole('option').length).toBe(4);
		});
	});

	describe('list change', () => {
		it('should toggle item', () => {
			// given
			render(<ListView {...props} />);
			expect(props.onChange).not.toBeCalled();
			expect(props.onFinish).not.toBeCalled();

			// when
			userEvent.click(screen.getByRole('checkbox', { name: 'Select Afghanistan' }));

			// then
			const payload = {
				schema: props.schema,
				value: ['country1', 'country2', 'country3'],
			};
			expect(props.onChange).toBeCalledWith(expect.anything(), payload);
			expect(props.onFinish).toBeCalledWith(expect.anything(), payload);
		});

		it('should select all item', () => {
			// given
			render(<ListView {...props} />);
			expect(props.onChange).not.toBeCalled();
			expect(props.onFinish).not.toBeCalled();

			// when
			userEvent.click(screen.getByRole('checkbox', { name: 'Select all' }));

			// then
			const payload = {
				schema: props.schema,
				value: ['country1', 'country2', 'country3', 'country4'],
			};
			expect(props.onChange).toBeCalledWith(expect.anything(), payload);
			expect(props.onFinish).toBeCalledWith(expect.anything(), payload);
		});

		it('should deselect all item', () => {
			// given
			const allValues = props.schema.titleMap.map(option => option.value);
			render(<ListView {...props} value={allValues} />);
			expect(props.onChange).not.toBeCalled();
			expect(props.onFinish).not.toBeCalled();

			// when
			userEvent.click(screen.getByRole('checkbox', { name: 'Deselect all' }));

			// then
			const payload = {
				schema: props.schema,
				value: undefined,
			};
			expect(props.onChange).toBeCalledWith(expect.anything(), payload);
			expect(props.onFinish).toBeCalledWith(expect.anything(), payload);
		});

		it('should select all filtered item', () => {
			// given
			render(<ListView {...props} />);
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));
			userEvent.type(screen.getByRole('textbox', { name: 'Search' }), 'g');
			jest.runAllTimers();

			// when
			userEvent.click(screen.getByRole('checkbox', { name: 'Select all' }));

			// then
			const payload = {
				schema: props.schema,
				value: ['country1', 'country2', 'country3'],
			};
			expect(props.onChange).toBeCalledWith(expect.anything(), payload);
			expect(props.onFinish).toBeCalledWith(expect.anything(), payload);
		});

		it('should deselect all filtered item', () => {
			// given
			const allValues = props.schema.titleMap.map(option => option.value);

			render(<ListView {...props} value={allValues} />);
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));
			userEvent.type(screen.getByRole('textbox', { name: 'Search' }), 'ia');
			jest.runAllTimers();

			// when
			userEvent.click(screen.getByRole('checkbox', { name: 'Deselect all' }));

			// then
			const payload = {
				schema: props.schema,
				value: ['country1', 'country4'],
			};
			expect(props.onChange).toBeCalledWith(expect.anything(), payload);
			expect(props.onFinish).toBeCalledWith(expect.anything(), payload);
		});
	});
});
