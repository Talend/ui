/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';

import Button from './Button.component';

jest.unmock('@talend/design-system');

describe('Button field', () => {
	it('should render button wrapped with field template', () => {
		// given
		const schema = {
			description: 'Click here to trigger a trigger',
			title: 'Boom !',
			triggers: ['after'],
			widget: 'button',
		};

		// when
		const { container } = render(
			<Button
				id="myForm"
				isValid
				errorMessage="This is wrong"
				onTrigger={jest.fn()}
				schema={schema}
			/>,
		);

		// then
		expect(screen.getByRole('button')).toHaveTextContent('Boom !');
		expect(screen.getByText('Click here to trigger a trigger')).toBeVisible();
		expect(container.firstChild).toMatchSnapshot();
	});
});
