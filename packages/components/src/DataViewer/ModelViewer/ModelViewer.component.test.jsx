import { render } from '@testing-library/react';
import Component from './ModelViewer.component';

describe('ModelViewer', () => {
	it('should render the ModelViewer', () => {
		const { container } = render(<Component value={[]} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
