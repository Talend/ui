import { render } from '@testing-library/react';
import Container from './ModelViewer.container';
import hierarchicSample from '../sample.raw.json';

describe('I18n', () => {
	it('should render', () => {
		const isUnion = item => Array.isArray(item.type);
		const { container } = render(<Container isUnion={isUnion} sample={hierarchicSample} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
