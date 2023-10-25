import { render, screen } from '@testing-library/react';
import CellLabel from './CellLabel.component';
jest.unmock('@talend/design-system');

describe('CellLabel', () => {
	it('should default render an object', () => {
		// given
		const label = { label: 'my label', style: 'info' };
		// when
		const { container } = render(<CellLabel cellData={label} rowIndex={25} />);
		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should default render a string', () => {
		// given
		const label = 'my label';
		// when
		render(<CellLabel cellData={label} rowIndex={25} />);
		// then
		expect(screen.getByText('my label')).toBeVisible();
	});
});
