import { render, screen } from '@testing-library/react';
import { defaultColumnConfiguration } from './Content.component';
import userEvent from '@testing-library/user-event';
jest.unmock('@talend/design-system');

describe('CellLabel', () => {
	const CellContent = defaultColumnConfiguration.cellRenderer;
	it('should default render a label', () => {
		// given
		const label = 'my label';
		// when
		const { container } = render(<CellContent cellData={label} columnData={{}} />);
		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render a tooltip if available', () => {
		// given
		const label = 'my label';
		// when
		render(
			<CellContent
				cellData={label}
				columnData={{
					tooltipLabel: 0,
				}}
			/>,
		);
		// then
		expect(screen.getByTestId('tc-virtualizedlist-default-cell-tooltip')).toBeVisible();
	});
});
