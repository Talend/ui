import { render } from '@testing-library/react';

import TileFooter from './TileFooter.component';

describe('Tile Footer', () => {
	it('should render footer with action on the right', () => {
		// given
		// when
		const { container } = render(
			<TileFooter>
				<span>Test</span>
			</TileFooter>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
});
