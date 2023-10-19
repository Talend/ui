/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { LinkAsButton } from './';

describe('LinkAsButton', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<LinkAsButton data-testid="my.link">Link example</LinkAsButton>
				<LinkAsButton icon="information-filled">Link example</LinkAsButton>
				<LinkAsButton openInNewTab>Link example</LinkAsButton>
			</main>,
		);
		// eslint-disable-next-line testing-library/no-container
		container.querySelector('button')?.click();
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
