import { render, screen } from '@testing-library/react';

import TextMode from './TextMode.component';

jest.unmock('@talend/design-system');

describe('Text field text display mode', () => {
	const schema = {
		title: 'My input title',
	};

	it('should render a comparator field in text mode', () => {
		const value = {
			operator: '>=',
			value: '666',
		};
		const { container } = render(<TextMode id="myForm" schema={schema} value={value} />);
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByText('My input title')).toBeInTheDocument();
		expect(screen.getByText('>= 666')).toBeInTheDocument();
	});
});
