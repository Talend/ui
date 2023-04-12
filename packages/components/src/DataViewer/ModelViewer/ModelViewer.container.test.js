import { render } from '@testing-library/react';
import Container from './ModelViewer.container';

describe('I18n', () => {
	it('should render', () => {
		const { container } = render(<Container value={[]} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
