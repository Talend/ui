import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Accordion, CollapsiblePanel } from './';

jest.mock('@talend/utils', () => {
	let i = 0;
	return {
		// we need stable but different uuid (is fixed to 42 by current mock)
		randomUUID: () => `mocked-uuid-${i++}`,
	};
});

describe('Accordion', () => {
	it('should render a11y html', async () => {
		// note we need to add the aria-label to be accessible
		// TODO: make it required
		const { container } = render(
			<main>
				<Accordion>
					<CollapsiblePanel status="successful">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis nisl convallis.
						</p>
					</CollapsiblePanel>
					<CollapsiblePanel status="failed">
						<p>
							In hac habitasse platea dictumst. Etiam sed orci ullamcorper, venenatis tellus ut,
							cursus nulla.
						</p>
					</CollapsiblePanel>
					<CollapsiblePanel status="inProgress">
						<p>Cras orci neque, placerat non rutrum eleifend, convallis at lorem.</p>
					</CollapsiblePanel>
					<CollapsiblePanel status="warning">
						<p>
							Morbi consectetur vehicula dignissim. Phasellus ullamcorper risus in erat accumsan, eu
							ullamcorper ante dictum.
						</p>
					</CollapsiblePanel>
					<CollapsiblePanel status="canceled">
						<p>Duis orci neque, vehicula eget pulvinar quis, pellentesque non odio.</p>
					</CollapsiblePanel>
				</Accordion>
				,
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
