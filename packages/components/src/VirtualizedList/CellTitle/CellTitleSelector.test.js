import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';

import { cellTitleDisplayModes } from '../utils/constants';
import CellTitleSelector from './CellTitleSelector.component';

const { TITLE_MODE_TEXT, TITLE_MODE_INPUT } = cellTitleDisplayModes;

describe('CellTitleSelector', () => {
	it('should render the input', () => {
		// given
		const rowData = { id: 1 };

		// when
		const { container } = render(
			<CellTitleSelector
				id="my-title"
				cellData="my value"
				className="my-title-classname"
				displayMode={TITLE_MODE_INPUT}
				onEditCancel={jest.fn()}
				onEditSubmit={jest.fn()}
				rowData={rowData}
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByRole('textbox')).toHaveValue('my value');
	});

	it('should render the link', () => {
		// given
		const rowData = { id: 1 };

		// when
		render(
			<CellTitleSelector
				id="my-title"
				cellData="my value"
				className="my-title-classname"
				displayMode={TITLE_MODE_TEXT}
				onClick={jest.fn()}
				rowData={rowData}
			/>,
		);

		// then
		expect(screen.getByRole('link')).toBeVisible();
		expect(screen.getByRole('link')).toHaveTextContent('my value');
	});

	it('should trigger callback on link click', async () => {
		const user = userEvent.setup();

		// given
		const rowData = { id: 1 };
		const onClick = jest.fn();
		const clickEvent = { button: 0 };
		render(
			<CellTitleSelector
				id="my-title"
				cellData="my value"
				className="my-title-classname"
				displayMode={TITLE_MODE_TEXT}
				onClick={onClick}
				rowData={rowData}
			/>,
		);

		// when
		await user.click(screen.getByRole('link'));

		// then
		expect(onClick).toHaveBeenCalledWith(expect.anything(clickEvent), rowData);
	});

	it('should render the simple text', () => {
		// when
		render(
			<CellTitleSelector
				id="my-title"
				cellData="my value"
				className="my-title-classname"
				displayMode={TITLE_MODE_TEXT}
			/>,
		);

		// then
		expect(screen.getByText('my value')).toBeVisible();
		expect(screen.queryByRole('link')).not.toBeInTheDocument();
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
	});
});
