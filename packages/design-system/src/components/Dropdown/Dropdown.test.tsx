import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ButtonTertiary } from '../Button';
import { Dropdown } from './';

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
			<BrowserRouter>
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
							{
								label: 'Link as',
								type: 'link',
								'data-testid': 'link-as',
								'data-test': 'link-as',
								as: <RouterLink to="/route" />,
							},
						]}
					>
						<ButtonTertiary isDropdown onClick={() => {}}>
							Dropdown
						</ButtonTertiary>
					</Dropdown>
				</main>
			</BrowserRouter>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
