import { render } from '@testing-library/react';

import ResourcePicker from './ResourcePicker.component';

describe('ResourcePicker component', () => {
	it('should render ResourceList', () => {
		const { container } = render(<ResourcePicker />);

		expect(container.firstChild).toMatchSnapshot();
	});
});
