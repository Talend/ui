import { render } from '@testing-library/react';
import TileSkeleton from './SkeletonTile.component';

describe('skeleton tile', () => {
	it('should compute skeleton tile', () => {
		// given
		// when
		const { container } = render(<TileSkeleton />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
});
