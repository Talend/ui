import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Card } from './';

describe('Card', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Card header="header">
					<p>Content</p>
				</Card>
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
