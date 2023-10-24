import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { EmptyState } from './';

describe('EmptyState', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<div>
				<nav>
					<EmptyState variant="S" title="small" />
				</nav>
				<aside>
					<EmptyState
						variant="M"
						title="Side menu is not ready yet"
						description="Something went wrong"
					/>
				</aside>
				<main>
					<EmptyState
						variant="L"
						title="No preparations yet"
						description="Add a preparation to clean, format, and transform data prior to processing."
						action={{
							children: 'Reload',
							onClick: jest.fn(),
							icon: 'plus',
							actionType: 'button',
						}}
						link={{ href: 'https://talend.com' }}
					/>
				</main>
			</div>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
