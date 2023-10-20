import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Dropdown } from './';
import { ButtonTertiary } from '../Button';

jest.mock('@talend/utils', () => {
	let i = 0;
	return {
		// we need stable but different uuid (is fixed to 42 by current mock)
		randomUUID: () => `mocked-uuid-${i++}`,
	};
});

describe('Dropdown', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Dropdown
					aria-label="Custom menu"
					items={[
						{
							label: 'External link',
							href: 'https://community.talend.com/s/?language=en_US',
							target: '_blank',
							type: 'link',
						},
						{
							type: 'divider',
						},
						{
							label: 'Link',
							href: '/download',
							type: 'link',
						},
						{
							type: 'divider',
						},
						{
							label: 'Button',
							onClick: jest.fn(),
							type: 'button',
						},
					]}
				>
					<ButtonTertiary isDropdown onClick={() => {}}>
						Dropdown
					</ButtonTertiary>
				</Dropdown>
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
