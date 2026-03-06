import { render } from '@testing-library/react';

import Tag from './Tag.component';

describe('Tag', () => {
	const props = {
		children: 'The lazy quick brown fox jumps over the lazy dog',
	};

	it('should render', () => {
		const { container } = render(<Tag {...props} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
