import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EnumerationWidget from './EnumerationWidget';

describe('EnumerationWidget', () => {
	it('should render items', () => {
		// when
		render(
			<EnumerationWidget
				value={[{ id: '112', values: ['titi', 'tata'] }]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={{}}
			/>,
		);

		// then
		expect(screen.getByRole('gridcell', { name: /titi,tata/i })).toBeInTheDocument();
	});

	it('should render actions', () => {
		// when
		render(
			<EnumerationWidget
				value={[{ id: '112', values: ['titi', 'tata'] }]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={{}}
			/>,
		);

		// then
		expect(screen.getByRole('link', { name: 'Search for specific values' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Add item' })).toBeInTheDocument();
	});

	it('should be in disabled mode', () => {
		// given
		render(
			<EnumerationWidget
				schema={{ disabled: true }}
				value={[
					{ id: '112', values: ['titi', 'tata'] },
					{ id: '113', values: ['titi2', 'tata2'] },
				]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
			/>,
		);
		expect(screen.getByRole('link', { name: 'Search for specific values' })).toBeInTheDocument();
		expect(screen.queryByRole('link', { name: 'Add item' })).not.toBeInTheDocument();
	});

	it('should be in add mode', () => {
		// given
		render(
			<EnumerationWidget
				value={[{ id: '112', values: ['titi', 'tata'] }]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={{}}
			/>,
		);
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

		// when
		userEvent.click(screen.queryByRole('link', { name: 'Add item' }));

		// then
		expect(screen.getByRole('textbox', { name: 'Enter new entry name' })).toBeInTheDocument();
	});

	it('should be in search mode', () => {
		// given
		render(
			<EnumerationWidget
				value={[{ id: '112', values: ['titi', 'tata'] }]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={{}}
			/>,
		);
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

		// when
		userEvent.click(screen.queryByRole('link', { name: 'Search for specific values' }));

		// then
		expect(screen.getByRole('textbox', { name: 'Enter search term' })).toBeInTheDocument();
	});

	it('should be in edit mode', () => {
		// given
		render(
			<EnumerationWidget
				value={[{ id: '112', values: ['titi', 'tata'] }]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={{}}
			/>,
		);

		// when
		userEvent.hover(screen.getByRole('row'));
		userEvent.click(screen.getByRole('link', { name: 'Edit' }));

		// then
		expect(screen.getByLabelText('Enter the new value')).toBeInTheDocument();
	});

	it('should call rename trigger on edit', () => {
		// given
		const onTrigger = jest.fn(() => Promise.resolve());
		render(
			<EnumerationWidget
				value={[{ id: '112', values: ['titi'] }]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={onTrigger}
				schema={{}}
				properties={{ connectedMode: true }}
			/>,
		);

		// when
		userEvent.hover(screen.getByRole('row'));
		userEvent.click(screen.getByRole('link', { name: 'Edit' }));
		userEvent.clear(screen.getByLabelText('Enter the new value'));
		userEvent.type(screen.getByLabelText('Enter the new value'), 'foo');
		userEvent.click(screen.getByRole('link', { name: 'Validate' }));

		// then
		expect(onTrigger).toBeCalledWith(expect.anything(), {
			schema: {},
			trigger: {
				action: 'ENUMERATION_RENAME_ACTION',
				id: '112',
				index: 0,
				value: ['foo'],
			},
		});
	});

	it('should call search trigger', () => {
		// given
		jest.useFakeTimers();
		const onTrigger = jest.fn(() => Promise.resolve([]));
		render(
			<EnumerationWidget
				value={[{ id: '112', values: ['titi'] }]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={onTrigger}
				schema={{}}
				properties={{ connectedMode: true }}
			/>,
		);

		// when
		userEvent.click(screen.queryByRole('link', { name: 'Search for specific values' }));
		userEvent.type(screen.queryByRole('textbox', { name: 'Enter search term' }), 'foo');
		jest.runAllTimers();

		// then
		expect(onTrigger).toBeCalledWith(expect.anything(), {
			schema: {},
			trigger: {
				action: 'ENUMERATION_SEARCH_ACTION',
				value: 'foo',
			},
		});
	});

	it('should call add trigger', () => {
		// given
		const onTrigger = jest.fn(() => Promise.resolve([]));
		render(
			<EnumerationWidget
				value={[{ id: '112', values: ['titi'] }]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={onTrigger}
				schema={{}}
				properties={{ connectedMode: true }}
			/>,
		);

		// when
		userEvent.click(screen.queryByRole('link', { name: 'Add item' }));
		userEvent.type(screen.queryByRole('textbox', { name: 'Enter new entry name' }), 'foo');
		userEvent.click(screen.queryByRole('link', { name: 'Validate' }));

		// then
		expect(onTrigger).toBeCalledWith(expect.anything(), {
			schema: {},
			trigger: {
				action: 'ENUMERATION_ADD_ACTION',
				value: ['foo'],
			},
		});
	});

	it('should call add trigger with multiple values', () => {
		// given
		const onTrigger = jest.fn(() => Promise.resolve([]));
		render(
			<EnumerationWidget
				value={[{ id: '112', values: ['titi'] }]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={onTrigger}
				schema={{}}
				properties={{ connectedMode: true }}
			/>,
		);

		// when
		userEvent.click(screen.queryByRole('link', { name: 'Add item' }));
		userEvent.type(screen.queryByRole('textbox', { name: 'Enter new entry name' }), 'foo, tata');
		userEvent.click(screen.queryByRole('link', { name: 'Validate' }));

		// then
		expect(onTrigger).toBeCalledWith(expect.anything(), {
			schema: {},
			trigger: {
				action: 'ENUMERATION_ADD_ACTION',
				value: ['foo', 'tata'],
			},
		});
	});

	it('should call add trigger with skip commas', () => {
		// given
		const onTrigger = jest.fn(() => Promise.resolve([]));
		render(
			<EnumerationWidget
				value={[{ id: '112', values: ['titi'] }]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={onTrigger}
				schema={{ skipCommas: true }}
				properties={{ connectedMode: true }}
			/>,
		);

		// when
		userEvent.click(screen.queryByRole('link', { name: 'Add item' }));
		userEvent.type(screen.queryByRole('textbox', { name: 'Enter new entry name' }), 'foo\\, tata');
		userEvent.click(screen.queryByRole('link', { name: 'Validate' }));

		// then
		expect(onTrigger).toBeCalledWith(expect.anything(), {
			schema: {
				skipCommas: true,
			},
			trigger: {
				action: 'ENUMERATION_ADD_ACTION',
				value: ['foo, tata'],
			},
		});
	});

	it('should call delete trigger', () => {
		// given
		const onTrigger = jest.fn(() => Promise.resolve({}));
		render(
			<EnumerationWidget
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={onTrigger}
				value={[{ id: '11212242', values: ['titi', 'tata'] }]}
				schema={{}}
				properties={{ connectedMode: true }}
			/>,
		);

		// when
		userEvent.click(screen.getByRole('link', { name: 'Remove value' }));

		// then
		expect(onTrigger).toBeCalledWith(expect.anything(), {
			schema: {},
			trigger: {
				action: 'ENUMERATION_REMOVE_ACTION',
				ids: ['11212242'],
			},
		});
	});

	it('should delete an item', () => {
		// given
		const onChange = jest.fn();
		render(
			<EnumerationWidget
				value={[{ id: '111', values: ['titi', 'tata'] }]}
				onChange={onChange}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={{}}
			/>,
		);
		expect(screen.getByRole('gridcell', { name: /titi,tata/i })).toBeInTheDocument();

		// when
		userEvent.hover(screen.getByRole('gridcell', { name: /titi,tata/i }));
		userEvent.click(screen.getByRole('link', { name: 'Remove value' }));

		// then
		expect(onChange).toBeCalledWith(expect.anything(), { schema: {}, value: [] });
	});

	it('should select an item', () => {
		// given
		render(
			<EnumerationWidget
				value={[{ id: '112', values: ['titi', 'tata'] }]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={{}}
			/>,
		);

		// when
		userEvent.click(screen.getByText('titi,tata'));

		// then
		expect(screen.getByText('1 selected value')).toBeInTheDocument();
	});

	it('should select multiple items', () => {
		// given
		render(
			<EnumerationWidget
				value={[
					{ id: '112', values: ['titi', 'tata'] },
					{ id: '113', values: ['titi2', 'tata2'] },
				]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={{}}
			/>,
		);

		// when
		userEvent.click(screen.getByRole('gridcell', { name: 'Select item "titi,tata"' }));
		userEvent.click(screen.getByRole('gridcell', { name: 'Select item "titi2,tata2"' }), {
			ctrlKey: true,
		});

		// then
		expect(screen.getByText('2 selected values')).toBeInTheDocument();
	});

	it('should delete all', () => {
		// given
		const onChange = jest.fn();
		render(
			<EnumerationWidget
				value={[
					{ id: '112', values: ['titi', 'tata'] },
					{ id: '113', values: ['titi2', 'tata2'] },
				]}
				onChange={onChange}
				onFinish={jest.fn()}
				onTrigger={jest.fn()}
				schema={{}}
			/>,
		);

		// when
		userEvent.click(screen.getByRole('gridcell', { name: 'Select item "titi,tata"' }));
		userEvent.click(screen.getByRole('gridcell', { name: 'Select item "titi2,tata2"' }), {
			ctrlKey: true,
		});
		userEvent.click(screen.getByRole('link', { name: 'Remove selected values' }));

		// then
		expect(onChange).toBeCalledWith(expect.anything(), { schema: {}, value: [] });
	});

	describe('upload file', () => {
		it('should add a upload icon and set data-feature', () => {
			// when
			render(
				<EnumerationWidget
					schema={{ allowImport: true }}
					onChange={jest.fn()}
					onFinish={jest.fn()}
					onTrigger={jest.fn()}
					value={[]}
				/>,
			);

			// then
			expect(screen.getByRole('button', { name: 'Import values from a file' })).toBeInTheDocument();
		});
	});
});
