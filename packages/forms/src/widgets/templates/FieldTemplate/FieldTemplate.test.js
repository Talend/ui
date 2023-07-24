import { screen, render } from '@testing-library/react';
import FieldTemplate from './FieldTemplate.component';

jest.unmock('@talend/design-system');

describe('FieldTemplate', () => {
	const props = {
		descriptionId: 'test-description',
		errorId: 'test-error',
		label: 'Test',
		description: 'This is the description',
		error: 'This is the error',
	};
	it('should render the common widget markup', () => {
		// given
		// when
		const { container } = render(
			<FieldTemplate {...props}>
				<input name="test" />
			</FieldTemplate>,
		);
		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should display the error message', () => {
		// given
		// when
		render(
			<FieldTemplate {...props}>
				<input name="test" />
			</FieldTemplate>,
		);
		// then

		expect(screen.getByText('This is the description')).toBeVisible();
		expect(screen.getByText('This is the error')).toBeVisible();
	});
});
