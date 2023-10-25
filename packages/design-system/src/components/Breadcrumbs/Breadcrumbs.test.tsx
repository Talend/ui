import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Breadcrumbs } from './';

jest.mock('@talend/utils', () => {
	let i = 0;
	return {
		// we need stable but different uuid (is fixed to 42 by current mock)
		randomUUID: () => `mocked-uuid-${i++}`,
	};
});

describe('Breadcrumbs', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Breadcrumbs
					items={[
						{
							label: 'Link example',
							href: '/',
						},
						{
							label: 'Link example',
							href: '/here',
						},
						{
							label: 'Link example',
							href: '/there',
							target: '_blank',
						},
						{
							label: 'Link example',
							href: '/away',
						},
						{
							label:
								'Link example that is much too long and should create an ellipsis if all is well',
							href: '/more',
						},
						{
							label: 'Label',
							href: '/here',
						},
					]}
				/>
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
