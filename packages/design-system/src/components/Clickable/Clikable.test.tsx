import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Clickable } from './';

describe('Clickable', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Clickable type="button" onClick={jest.fn}>
					<p>Content</p>
				</Clickable>
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
