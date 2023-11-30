import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CellCheckbox from './CellCheckbox.component';

const columnData = {
	id: 'my-checkbox',
	label: 'My Test Check',
	onChange: jest.fn(),
};

describe('CellActions', () => {
	it('should render checked checkbox', () => {
		// when
		const { container } = render(<CellCheckbox cellData columnData={columnData} rowIndex={25} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByRole('checkbox')).toBeChecked();
	});

	it('should render unchecked checkbox', () => {
		// when
		render(<CellCheckbox cellData={false} columnData={columnData} rowIndex={25} />);

		// then
		expect(screen.getByRole('checkbox')).not.toBeChecked();
	});

	it('should render disabled checkbox', () => {
		// when
		render(
			<CellCheckbox
				cellData={false}
				columnData={{ ...columnData, getRowState: () => ({ disabled: true }) }}
				rowIndex={25}
			/>,
		);

		// then
		expect(screen.getByRole('checkbox')).toBeDisabled();
	});

	it('should render radio button', () => {
		// when
		render(
			<CellCheckbox
				cellData={false}
				columnData={{ ...columnData, selectionMode: 'SINGLE' }}
				rowIndex={25}
			/>,
		);

		// then
		expect(screen.getByRole('radio')).toBeVisible();
		expect(screen.getByRole('radio')).not.toBeChecked();
	});

	it('should trigger callback on checkbox toggle', async () => {
		const user = userEvent.setup();

		// given
		const rowData = { id: 1 };

		// when
		render(<CellCheckbox cellData columnData={columnData} rowData={rowData} rowIndex={25} />);
		await user.click(screen.getByRole('checkbox'));

		// then
		expect(columnData.onChange).toHaveBeenCalledWith(
			expect.anything({ type: 'click', target: 'lol' }),
			rowData,
		);
	});
});
