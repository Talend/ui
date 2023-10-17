import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { FloatingDrawer } from './';

describe('FloatingDrawer', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<FloatingDrawer.Container>
					<h1>test</h1>
					<FloatingDrawer aria-label="label is required" visible>
						<p>content of the drawer</p>
					</FloatingDrawer>
				</FloatingDrawer.Container>
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
