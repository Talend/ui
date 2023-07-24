import { render } from '@testing-library/react';
import TileBody from './TileBody.component';

describe("tile's body", () => {
	it('should compute tile body', () => {
		// when
		const { container } = render(<TileBody>my body</TileBody>);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
});
