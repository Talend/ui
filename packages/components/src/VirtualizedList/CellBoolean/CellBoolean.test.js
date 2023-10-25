import { screen, render } from '@testing-library/react';
import CellBoolean, { DISPLAY_MODE } from './CellBoolean.component';
jest.unmock('@talend/design-system');

describe('CellBoolean', () => {
	it('should render an empty cell', () => {
		const { container } = render(<CellBoolean />);
		expect(container).toBeEmptyDOMElement();
	});

	it('should render an check icon for a truthy value in icon mode', () => {
		render(<CellBoolean cellData columnData={{ displayMode: DISPLAY_MODE.ICON }} />);
		expect(screen.getByTitle('Required')).toBeVisible();
		expect(document.querySelector('svg')).toHaveAttribute('name', 'talend-check-circle');
	});

	it('should render an empty cell for a falsy value in icon mode', () => {
		const { container } = render(<CellBoolean columnData={{ displayMode: DISPLAY_MODE.ICON }} />);
		expect(container).toBeEmptyDOMElement();
	});

	it('should render a truthy value', () => {
		render(<CellBoolean cellData />);
		expect(screen.getByText('Yes')).toBeVisible();
	});

	it('should render a falsy value', () => {
		render(<CellBoolean cellData={false} />);
		expect(screen.getByText('No')).toBeVisible();
	});
});
