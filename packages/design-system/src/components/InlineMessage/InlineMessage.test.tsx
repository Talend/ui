/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { InlineMessage } from './';

describe('InlineMessage', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<InlineMessage variant="information" description="The information message value" />
				<InlineMessage variant="destructive" description="The destructive message value" />
				<InlineMessage variant="success" description="The success message value" />
				<InlineMessage variant="warning" description="The warning message value" />
				<InlineMessage variant="beta" description="The beta message value" />
			</main>,
		);
		// eslint-disable-next-line testing-library/no-container
		container.querySelector('button')?.click();
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
