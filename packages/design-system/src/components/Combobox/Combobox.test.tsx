import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Combobox } from './';

jest.mock('@talend/utils', () => {
	let i = 0;
	return {
		// we need stable but different uuid (is fixed to 42 by current mock)
		randomUUID: () => `mocked-uuid-${i++}`,
	};
});

const fruits = ['Acerola', 'Apple', 'Apricots', 'Avocado'];

describe('Combobox', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Combobox values={fruits} />
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
