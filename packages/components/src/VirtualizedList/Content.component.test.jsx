import { render, screen } from '@testing-library/react';
import { defaultColumnConfiguration } from './Content.component';

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

	it('should not crash on object-valued cell data', () => {
		// given
		const cellData = [{ label: 'Open', href: 'javascript:alert(1)' }];
		// when
		const { container } = render(<CellContent cellData={cellData} columnData={{}} />);
		// then
		expect(container.querySelector('.tc-virtualizedlist-default-cell')).toBeEmptyDOMElement();
		expect(screen.queryByText('Open')).not.toBeInTheDocument();
		expect(container.querySelector('a')).toBeNull();
	});

	it('should not crash on a plain object as cell data', () => {
		// given
		const cellData = { label: 'Open' };
		// when
		render(<CellContent cellData={cellData} columnData={{}} />);
		// then
		expect(screen.getByText('', { selector: '.tc-virtualizedlist-default-cell' })).toBeVisible();
	});

	it('should keep rendering arrays of primitives', () => {
		// when
		render(<CellContent cellData={['a', 'b']} columnData={{}} />);
		// then
		expect(screen.getByText('ab')).toBeVisible();
	});
});
