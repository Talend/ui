import { render } from '@testing-library/react';
import { NoRowsComponent } from './NoRows.component';

describe('NoRows', () => {
	it('should show no result', () => {
		const { container } = render(<NoRowsComponent />);

		expect(container.firstChild).toMatchSnapshot();
	});
});
