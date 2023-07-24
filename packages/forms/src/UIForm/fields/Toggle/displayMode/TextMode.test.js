import { render } from '@testing-library/react';

import Toggle from './TextMode.component';

describe('Toggle field in text mode', () => {
	const schema = { title: 'My Toggle' };

	it('should render the Toggle', () => {
		// when
		const props = {
			id: 'myForm',
			schema,
			value: true,
			onChange: jest.fn(),
		};
		const { container } = render(<Toggle {...props} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
});
