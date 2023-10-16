import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { ButtonIcon } from './';

describe('ButtonIcon', () => {
	it('should render accessible button', async () => {
		// note we need to add the aria-label to be accessible
		// TODO: make it required
		const { container } = render(
			<ButtonIcon aria-label="should be required" icon="talend-arrow-left" onClick={() => {}}>
				children is considered as description
			</ButtonIcon>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
		expect(container.firstChild).toHaveAttribute('aria-describedby', 'id-42');
	});
});
