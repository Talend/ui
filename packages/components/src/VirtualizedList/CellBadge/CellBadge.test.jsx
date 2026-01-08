import { screen, render } from '@testing-library/react';
import CellBadge from './CellBadge.component';

describe('CellBadge', () => {
	it('should render', () => {
		// when
		const { container } = render(
			<CellBadge
				cellData="streaming"
				rowIndex={25}
				columnData={{
					selected: true,
				}}
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByText('streaming')).toBeVisible();
	});
});
