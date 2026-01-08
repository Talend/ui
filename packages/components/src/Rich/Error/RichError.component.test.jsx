import { render } from '@testing-library/react';
import RichError from './RichError.component';

describe('RichLayout', () => {
	it('should render RichLayout with header, content and footer', () => {
		const { container } = render(<RichError title="Pipelines" error="One error..." />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
