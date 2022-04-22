import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EnumerationWidget from './EnumerationWidget';

jest.mock('ally.js');
describe('EnumerationWidget', () => {
	it('should render items', () => {
		// when
		render(
			<EnumerationWidget
				formData={[{ id: '112', values: ['titi', 'tata'] }]}
				onChange={jest.fn()}
			/>,
		);

		// then
		expect(screen.getByRole('gridcell', { name: /titi,tata/i })).toBeInTheDocument();
	});

	it('should render actions in default mode', () => {
		// when
		render(
			<EnumerationWidget
				formData={[{ id: '112', values: ['titi', 'tata'] }]}
				onChange={jest.fn()}
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
				uiSchema={{
					disabled: true,
				}}
				formData={[
					{ id: '112', values: ['titi', 'tata'] },
					{ id: '113', values: ['titi2', 'tata2'] },
				]}
				onChange={jest.fn()}
			/>,
		);
		expect(screen.getByRole('link', { name: 'Search for specific values' })).toBeInTheDocument();
		expect(screen.queryByRole('link', { name: 'Add item' })).not.toBeInTheDocument();
	});

	it('should be in add mode', () => {
		// given
		render(
			<EnumerationWidget
				formData={[{ id: '112', values: ['titi', 'tata'] }]}
				onChange={jest.fn()}
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
				formData={[{ id: '112', values: ['titi', 'tata'] }]}
				onChange={jest.fn()}
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
				onChange={jest.fn()}
				formData={[{ id: '111', values: ['titi', 'tata'] }]}
			/>,
		);

		// when
		userEvent.hover(screen.getByRole('row'));
		userEvent.click(screen.getByRole('link', { name: 'Edit' }));

		// then
		expect(screen.getByLabelText('Enter the new value')).toBeInTheDocument();
	});

	it('should delete an item', () => {
		// given
		const onChange = jest.fn();
		render(
			<EnumerationWidget
				onChange={onChange}
				formData={[{ id: '111', values: ['titi', 'tata'] }]}
			/>,
		);
		expect(screen.getByRole('gridcell', { name: /titi,tata/i })).toBeInTheDocument();

		// when
		userEvent.hover(screen.getByRole('gridcell', { name: /titi,tata/i }));
		userEvent.click(screen.getByRole('link', { name: 'Remove value' }));

		// then
		expect(screen.queryByRole('gridcell', { name: /titi,tata/i })).not.toBeInTheDocument();
	});

	it('should select an item', () => {
		// given
		render(
			<EnumerationWidget
				formData={[{ id: '112', values: ['titi', 'tata'] }]}
				onChange={jest.fn()}
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
				formData={[
					{ id: '112', values: ['titi', 'tata'] },
					{ id: '113', values: ['titi2', 'tata2'] },
				]}
				onChange={jest.fn()}
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
		render(
			<EnumerationWidget
				formData={[
					{ id: '112', values: ['titi', 'tata'] },
					{ id: '113', values: ['titi2', 'tata2'] },
				]}
				onChange={jest.fn()}
			/>,
		);

		// when
		userEvent.click(screen.getByRole('gridcell', { name: 'Select item "titi,tata"' }));
		userEvent.click(screen.getByRole('gridcell', { name: 'Select item "titi2,tata2"' }), {
			ctrlKey: true,
		});
		userEvent.click(screen.getByRole('link', { name: 'Remove selected values' }));

		// then
		expect(screen.queryByRole('gridcell')).not.toBeInTheDocument();
	});

	it('should delete an item with callHandler', () => {
		const registry = {
			formContext: {
				handleAction: jest.fn(),
			},
		};

		// given
		render(
			<EnumerationWidget
				onChange={jest.fn()}
				registry={registry}
				formData={[{ id: '11212242', values: ['titi', 'tata'] }]}
			/>,
		);

		// when
		userEvent.click(screen.getByRole('link', { name: 'Remove value' }));

		// then
		expect(registry.formContext.handleAction).toBeCalled();
	});

	describe('upload file', () => {
		it('should add a upload icon and set data-feature', () => {
			// when
			render(
				<EnumerationWidget
					schema={{
						allowImport: true,
					}}
					uiSchema={{
						'data-feature': {
							overwriteExisting: 'file.overwrite',
							addFromFile: 'file.add',
							importFile: 'file.import',
						},
					}}
					formData={[]}
				/>,
			);

			// then
			expect(screen.getByRole('button', { name: 'Import values from a file' })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'Import values from a file' })).toHaveAttribute(
				'data-feature',
				'file.import',
			);
			expect(screen.getByRole('menuitem', { name: 'Add values from a file' })).toHaveAttribute(
				'data-feature',
				'file.add',
			);
			expect(screen.getByRole('menuitem', { name: 'Overwrite existing values' })).toHaveAttribute(
				'data-feature',
				'file.overwrite',
			);
		});

		it('should send a event with a method to simulate the click on the input file', () => {
			// given
			const registry = {
				formContext: {
					handleAction: jest.fn(),
				},
			};

			render(
				<EnumerationWidget
					registry={registry}
					schema={{ allowImport: true }}
					uiSchema={{}}
					formData={[]}
				/>,
			);

			// when
			userEvent.click(screen.getByRole('button', { name: 'Import values from a file' }));

			// then
			expect(registry.formContext.handleAction).toBeCalledWith(
				undefined,
				'ENUMERATION_IMPORT_FILE_CLICK',
				{ simulateClickInputFile: jasmine.any(Function) },
				expect.anything(),
				expect.anything(),
			);
		});

		it('should send a event with the choice APPEND', () => {
			// given
			const registry = { formContext: { handleAction: jest.fn() } };

			render(
				<EnumerationWidget
					registry={registry}
					schema={{ allowImport: true }}
					uiSchema={{}}
					formData={[]}
				/>,
			);

			// when
			userEvent.click(screen.getByRole('menuitem', { name: 'Add values from a file' }));

			// then
			expect(registry.formContext.handleAction).toBeCalledWith(
				undefined,
				'ENUMERATION_IMPORT_FILE_APPEND_MODE',
				null,
				expect.anything(),
				expect.anything(),
			);
		});

		it('should send a event with the choice OVERWRITE', () => {
			// given
			const registry = { formContext: { handleAction: jest.fn() } };

			render(
				<EnumerationWidget
					registry={registry}
					schema={{ allowImport: true }}
					uiSchema={{}}
					formData={[]}
				/>,
			);

			// when
			userEvent.click(screen.getByRole('menuitem', { name: 'Overwrite existing values' }));

			// then
			expect(registry.formContext.handleAction).toBeCalledWith(
				undefined,
				'ENUMERATION_IMPORT_FILE_OVERWRITE_MODE',
				null,
				expect.anything(),
				expect.anything(),
			);
		});
	});

	describe('utils method', () => {
		it('should split with using coma separator and trim the sub strings', () => {
			// when
			const resultArray = EnumerationWidget.parseStringValueToArray('toto ,  to , tata ');

			// then
			expect(resultArray).toEqual(['toto', 'to', 'tata']);
		});
	});
});
