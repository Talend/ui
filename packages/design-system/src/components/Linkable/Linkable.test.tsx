/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Linkable } from './';

describe('Linkable', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Linkable href="#" data-testid="my.Linkable">
					Linkable example
				</Linkable>
				<Linkable href="#" icon="information-filled">
					Linkable example
				</Linkable>
				<Linkable href="https://www.talend.com">Linkable example</Linkable>
			</main>,
		);
		// eslint-disable-next-line testing-library/no-container
		container.querySelector('button')?.click();
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
