import { render } from '@testing-library/react';
import LengthBadge from './LengthBadge.component';

describe('LengthBadge', () => {
	it('should render', () => {
		const { container } = render(<LengthBadge lengthValue={10} className="myCLass" />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
