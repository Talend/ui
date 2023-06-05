import { screen, render } from '@testing-library/react';

import TextModeFieldTemplate from './TextMode.component';

describe('FieldTemplate in text display mode', () => {
	it('should render dt/dd', () => {
		// when
		const { container } = render(
			<TextModeFieldTemplate id="myAwesomeField" label="My awesome label">
				My value as chrildren
			</TextModeFieldTemplate>,
		);

		// then
		expect(screen.getByRole('term')).toHaveTextContent('My awesome label');
		expect(screen.getByRole('definition')).toHaveTextContent('My value as chrildren');
		expect(container.firstChild).toMatchSnapshot();
	});
});
