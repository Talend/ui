import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { ErrorState } from './';

describe('ErrorState', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<ErrorState title="small" description="what happens" />
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
