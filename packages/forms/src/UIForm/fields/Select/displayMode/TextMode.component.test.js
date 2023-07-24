import { screen, render } from '@testing-library/react';
import TextMode from './TextMode.component';

describe('Text field text display mode', () => {
	const props = {
		id: 'myForm',
		schema: {
			title: 'My input title',
			type: 'select',
		},
		value: 'toto',
		renderItem: jest.fn(),
	};

	it('should render input', () => {
		// when
		const { container } = render(<TextMode {...props} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render array input', () => {
		// when
		render(<TextMode {...props} value={['toto', 'foo']} />);

		// then
		expect(screen.getAllByRole('listitem')).toHaveLength(2);
	});
});
