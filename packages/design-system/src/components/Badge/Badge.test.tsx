import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Badge, BadgeDropdown } from './';

jest.mock('@talend/utils', () => {
	let i = 0;
	return {
		// we need stable but different uuid (is fixed to 42 by current mock)
		randomUUID: () => `mocked-uuid-${i++}`,
	};
});

describe('Badge', () => {
	it('should render a11y html', async () => {
		const selectedValue = '3';
		const setSelectedValue = jest.fn();
		const { container } = render(
			<main>
				<div data-testid="Badge">
					<Badge
						label="Awesome"
						selectedId={selectedValue}
						value={[
							{ id: '1', label: 'Feature' },
							{ id: '2', label: 'Item' },
							{ id: '3', label: 'Component' },
						]}
						onChange={setSelectedValue}
						variant="dropdown"
					/>
				</div>
				<div data-testid="BadgeDropdown">
					<BadgeDropdown
						label="Awesome"
						selectedId={selectedValue}
						value={[
							{ id: '1', label: 'Feature' },
							{ id: '2', label: 'Item' },
							{ id: '3', label: 'Component' },
						]}
						onChange={setSelectedValue}
					/>
				</div>
				TODO: add popover and tag
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
