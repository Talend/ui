/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Link } from './';

describe('Link', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Link href="#" data-testid="my.link">
					Link example
				</Link>
				<Link href="#" icon="information-filled">
					Link example
				</Link>
				<Link href="https://www.talend.com">Link example</Link>
			</main>,
		);
		// eslint-disable-next-line testing-library/no-container
		container.querySelector('button')?.click();
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
