import { render, screen } from '@testing-library/react';

import TextModeFieldTemplate from './TextMode.component';

jest.unmock('@talend/design-system');
describe('FieldTemplate in text display mode', () => {
	it('should render text', () => {
		// when
		const { container } = render(
			<TextModeFieldTemplate id="myAwesomeField" label="My awesome label">
				My value as children
			</TextModeFieldTemplate>,
		);

		// then
		expect(screen.getByText('My awesome label')).toBeInTheDocument();
		expect(screen.getByText('My value as children')).toBeInTheDocument();
		expect(container.firstChild).toMatchSnapshot();
	});
});
