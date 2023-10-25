import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';

import CellTitleInput from './CellTitleInput.component';

describe('CellTitleInput', () => {
	it('should render the input', () => {
		// given
		const rowData = { id: 1 };

		// when
		const { container } = render(
			<CellTitleInput
				id="my-cell"
				cellData="my value"
				onEditCancel={jest.fn()}
				onEditSubmit={jest.fn()}
				rowData={rowData}
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByRole('textbox')).toHaveValue('my value');
	});

	it('should call submit callback on blur', () => {
		// given
		const rowData = { id: 1 };
		const onEditCancel = jest.fn();
		const onEditSubmit = jest.fn();

		render(
			<CellTitleInput
				id="my-cell-input"
				cellData="my value"
				onEditCancel={onEditCancel}
				onEditSubmit={onEditSubmit}
				rowData={rowData}
			/>,
		);

		// when
		userEvent.click(screen.getByRole('textbox'));
		screen.getByRole('textbox').blur();

		// then
		expect(onEditSubmit).toBeCalledWith(expect.anything(), {
			value: 'my value',
			model: rowData,
		});
	});

	it('should call submit callback on form submit', () => {
		// given
		const rowData = { id: 1 };
		const onEditCancel = jest.fn();
		const onEditSubmit = jest.fn();

		render(
			<CellTitleInput
				id="my-cell-input"
				cellData="my value"
				onEditCancel={onEditCancel}
				onEditSubmit={onEditSubmit}
				rowData={rowData}
			/>,
		);

		// when
		const form = screen.getByRole('textbox').closest('form');
		form.submit();

		// then
		expect(onEditSubmit).toBeCalledWith(expect.anything(), {
			value: 'my value',
			model: rowData,
		});
	});

	it('should call cancel callback on ESC keyup', () => {
		// given
		const rowData = { id: 1 };
		const onEditCancel = jest.fn();
		const onEditSubmit = jest.fn();

		render(
			<CellTitleInput
				id="my-cell-input"
				cellData="my value"
				onEditCancel={onEditCancel}
				onEditSubmit={onEditSubmit}
				rowData={rowData}
			/>,
		);

		// when
		userEvent.click(screen.getByRole('textbox'));
		userEvent.keyboard('{esc}');

		// then
		expect(onEditCancel).toBeCalledWith(expect.anything(), rowData);
	});
});
