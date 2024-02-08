import { render, screen } from '@testing-library/react';

import CheckBox from './TextMode.component';

jest.unmock('@talend/design-system');

describe('CheckBox field in text mode', () => {
	const schema = { title: 'My checkbox title' };

	it('should render checked value', () => {
		// when
		const { container } = render(<CheckBox id="myForm" schema={schema} value />);

		// then
		expect(screen.getByText('My checkbox title')).toBeInTheDocument();
		expect(screen.getByTestId('widget-checkbox-icon-check')).toBeInTheDocument();
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render unchecked value', () => {
		// when
		render(<CheckBox id="myForm" schema={schema} value={false} />);

		// then
		expect(screen.getByText('My checkbox title')).toBeInTheDocument();
		expect(screen.getByTestId('widget-checkbox-icon-cross')).toBeInTheDocument();
	});
});
