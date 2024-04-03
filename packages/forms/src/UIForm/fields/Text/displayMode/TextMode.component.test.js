import { render, screen } from '@testing-library/react';

import TextMode from './TextMode.component';

describe('Text field text display mode', () => {
	const schema = {
		title: 'My input title',
		type: 'text',
	};

	it('should render input', () => {
		// when
		const { container } = render(<TextMode id="myForm" schema={schema} value="toto" />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render password input', () => {
		// when
		render(<TextMode id="myForm" schema={{ ...schema, type: 'password' }} value="toto" />);

		// then
		expect(screen.getByText('**********')).toBeInTheDocument();
		expect(screen.getByText('My input title')).toBeInTheDocument();
	});
});
