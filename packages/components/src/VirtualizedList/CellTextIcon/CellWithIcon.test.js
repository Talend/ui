import { render, screen } from '@testing-library/react';
import CellWithIcon from './CellWithIcon.component';
jest.unmock('@talend/design-system');

describe('CellWithIcon', () => {
	it('should render', () => {
		// when
		const columnData = {
			getIcon: () => ({
				label: 'test',
				icon: 'talend-star',
				onClick: jest.fn(),
			}),
		};

		const { container } = render(<CellWithIcon cellData="Test label" columnData={columnData} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByText('Test label')).toBeVisible();
		expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'test');
	});

	it('should render without icon', () => {
		// when
		const columnData = {
			getIcon: () => undefined,
		};

		render(<CellWithIcon cellData="Test label 2" columnData={columnData} />);

		// then
		expect(screen.getByText('Test label 2')).toBeVisible();
		expect(screen.queryByRole('link')).not.toBeInTheDocument();
	});
});
