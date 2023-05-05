import { render } from '@testing-library/react';
import TileHeader from './TileHeader.component';

describe('Tile Header', () => {
	it('should render header with action on the right', () => {
		// given
		// when
		const { container } = render(
			<TileHeader>
				<span>Test</span>
			</TileHeader>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
});
