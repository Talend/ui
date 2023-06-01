import { screen, render } from '@testing-library/react';

import TextArea from './TextMode.component';

describe('TextArea field text display mode', () => {
	const schema = {
		title: 'My input title',
	};

	it('should render textarea', () => {
		// when
		const { container } = render(<TextArea id="myForm" schema={schema} value="toto" />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render provided rows', () => {
		// given
		const schemaWithRows = {
			...schema,
			rows: 10,
		};

		// when
		render(<TextArea id="myForm" schema={schemaWithRows} value="toto" />);

		// then

		expect(screen.getByRole('definition')).toHaveTextContent('toto');
		expect(screen.getByRole('term')).toHaveTextContent('My input title');
		expect(screen.getByText('toto')).toHaveStyle('height: 20rem');
	});
});
