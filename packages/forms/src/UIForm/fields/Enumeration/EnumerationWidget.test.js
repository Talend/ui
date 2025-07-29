import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EnumerationWidget from './EnumerationWidget';

jest.unmock('@talend/design-system');

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

	it('should be in add mode', async () => {
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
		await userEvent.click(screen.queryByRole('link', { name: 'Add item' }));

		// then

		expect(screen.getByRole('textbox', { name: 'Enter new entry name' })).toBeInTheDocument();
	});

	it('should be in search mode', async () => {
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
		await userEvent.click(screen.queryByRole('link', { name: 'Search for specific values' }));

		// then

		expect(screen.getByRole('textbox', { name: 'Enter search term' })).toBeInTheDocument();
	});

	it('should be in edit mode', async () => {
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
		await userEvent.hover(screen.getAllByRole('row')[1]);
		await userEvent.click(screen.getByRole('link', { name: 'Edit' }));

		// then
		expect(screen.getByLabelText('Enter the new value')).toBeInTheDocument();
	});

	it('should call rename trigger on edit', async () => {
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
		await userEvent.hover(screen.getAllByRole('row')[0]);
		await userEvent.click(screen.getByRole('link', { name: 'Edit' }));
		await userEvent.clear(screen.getByLabelText('Enter the new value'));
		await userEvent.type(screen.getByLabelText('Enter the new value'), 'foo');
		await userEvent.click(screen.getByRole('link', { name: 'Validate' }));

		// then
		expect(onTrigger).toHaveBeenCalledWith(expect.anything(), {
			schema: {},
			trigger: {
				action: 'ENUMERATION_RENAME_ACTION',
				id: '112',
				index: 0,
				value: ['foo'],
			},
		});
	});

	it('should call search trigger', async () => {
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
		fireEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));
		fireEvent.change(screen.getByRole('textbox', { name: 'Enter search term' }), {
			target: { value: 'foo' },
		});
		jest.runAllTimers();
		jest.useRealTimers();

		// then
		expect(onTrigger).toHaveBeenCalledWith(expect.anything(), {
			schema: {},
			trigger: {
				action: 'ENUMERATION_SEARCH_ACTION',
				value: 'foo',
			},
		});
	});

	it('should call add trigger', async () => {
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
		await userEvent.click(screen.queryByRole('link', { name: 'Add item' }));
		await userEvent.type(screen.queryByRole('textbox', { name: 'Enter new entry name' }), 'foo');
		await userEvent.click(screen.queryByRole('link', { name: 'Validate' }));

		// then
		expect(onTrigger).toHaveBeenCalledWith(expect.anything(), {
			schema: {},
			trigger: {
				action: 'ENUMERATION_ADD_ACTION',
				value: ['foo'],
			},
		});
	});

	it('should call add trigger with multiple values', async () => {
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
		await userEvent.click(screen.queryByRole('link', { name: 'Add item' }));
		await userEvent.type(
			screen.queryByRole('textbox', { name: 'Enter new entry name' }),
			'foo, tata',
		);
		await userEvent.click(screen.queryByRole('link', { name: 'Validate' }));

		// then
		expect(onTrigger).toHaveBeenCalledWith(expect.anything(), {
			schema: {},
			trigger: {
				action: 'ENUMERATION_ADD_ACTION',
				value: ['foo', 'tata'],
			},
		});
	});

	it('should call add trigger with disableSplit', async () => {
		// given
		const onTrigger = jest.fn(() => Promise.resolve([]));
		render(
			<EnumerationWidget
				value={[{ id: '112', values: ['titi'] }]}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={onTrigger}
				schema={{ disableSplit: true }}
				properties={{ connectedMode: true }}
			/>,
		);

		// when
		await userEvent.click(screen.queryByRole('link', { name: 'Add item' }));
		await userEvent.type(
			screen.queryByRole('textbox', { name: 'Enter new entry name' }),
			'foo, tata',
		);
		await userEvent.click(screen.queryByRole('link', { name: 'Validate' }));

		// then
		expect(onTrigger).toHaveBeenCalledWith(expect.anything(), {
			schema: {
				disableSplit: true,
			},
			trigger: {
				action: 'ENUMERATION_ADD_ACTION',
				value: ['foo, tata'],
			},
		});
	});

	it('should call delete trigger', async () => {
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
		await userEvent.click(screen.getByRole('link', { name: 'Remove value' }));

		// then
		expect(onTrigger).toHaveBeenCalledWith(expect.anything(), {
			schema: {},
			trigger: {
				action: 'ENUMERATION_REMOVE_ACTION',
				ids: ['11212242'],
			},
		});
	});

	it('should delete an item', async () => {
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
		await userEvent.hover(screen.getByRole('gridcell', { name: /titi,tata/i }));
		await userEvent.click(screen.getByRole('link', { name: 'Remove value' }));

		// then
		expect(onChange).toHaveBeenCalledWith(expect.anything(), { schema: {}, value: [] });
	});

	it('should select an item', async () => {
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
		await userEvent.click(screen.getByText('titi,tata'));

		// then
		expect(screen.getByText('1 selected value')).toBeInTheDocument();
	});

	it('should select multiple items', async () => {
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
		fireEvent.click(screen.getByRole('gridcell', { name: 'Select item "titi,tata"' }));
		fireEvent.click(screen.getByRole('gridcell', { name: 'Select item "titi2,tata2"' }), {
			ctrlKey: true,
		});

		// then
		expect(screen.getByText('2 selected values')).toBeInTheDocument();
	});

	it('should delete all', async () => {
		// given
		jest.useFakeTimers();
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
		fireEvent.click(screen.getByRole('gridcell', { name: 'Select item "titi,tata"' }));
		fireEvent.click(screen.getByRole('gridcell', { name: 'Select item "titi2,tata2"' }), {
			ctrlKey: true,
		});
		fireEvent.click(screen.getByRole('link', { name: 'Remove selected values' }));
		jest.runAllTimers();
		jest.useRealTimers();

		// then
		expect(onChange).toHaveBeenCalledWith(expect.anything(), { schema: {}, value: [] });
	});

	it('should pass the newest value to onFinish', async () => {
		const onFinish = jest.fn();
		render(
			<EnumerationWidget
				value={[{ values: ['yoo'] }]}
				onChange={jest.fn()}
				onFinish={onFinish}
				onTrigger={jest.fn()}
				schema={{}}
			/>,
		);

		// when
		await userEvent.click(screen.queryByRole('link', { name: 'Add item' }));
		await userEvent.type(screen.queryByRole('textbox', { name: 'Enter new entry name' }), 'foo');
		await userEvent.click(screen.queryByRole('link', { name: 'Validate' }));
		// then
		expect(onFinish).toHaveBeenCalledWith(expect.anything(), {
			schema: {},
			value: [
				{
					values: ['yoo'],
					displayMode: 'DISPLAY_MODE_DEFAULT',
				},
				{
					values: ['foo'],
				},
			],
		});
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
