import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Divider } from './';

describe('Divider', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<div>
					<h1>test</h1>
					<Divider />
					<p>lorem ipsum</p>
				</div>
				<Divider orientation="vertical" />
				<div>
					<h2>Side</h2>
					<p>lorem ipsum content</p>
				</div>
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
