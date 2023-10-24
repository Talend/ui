import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Switch } from './';

jest.mock('@talend/utils', () => {
	let i = 0;
	return {
		// we need stable but different uuid (is fixed to 42 by current mock)
		randomUUID: () => `mocked-uuid-${i++}`,
	};
});

describe('Switch', () => {
	it('should render accessible html', async () => {
		// note we need to add the aria-label to be accessible
		// TODO: make it required
		const { container } = render(
			<main>
				<Switch
					values={['value a', 'value b', 'value c', 'value d', 'value e', 'value f']}
					defaultValue="value f"
				/>
				,
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
