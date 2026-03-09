import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Clickable } from './';

describe('Clickable', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Clickable type="button" onClick={vi.fn}>
					<p>Content</p>
				</Clickable>
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
