import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Tabs, TabPanel, Tab, TabsProvider } from './';

describe('ButtonIcon', () => {
	it('should render accessible button', async () => {
		// note we need to add the aria-label to be accessible
		// TODO: make it required
		const { container } = render(
			<TabsProvider defaultActiveKey="profile">
				<Tabs>
					<Tab aria-controls="home" title="Home" />
					<Tab aria-controls="profile" title="Profile" />
					<Tab aria-controls="contact" title="Contact" disabled />
				</Tabs>
				<TabPanel id="home">Tab content for Home</TabPanel>
				<TabPanel id="profile">Tab content for Profile</TabPanel>
				<TabPanel id="contact">Tab content for Contact</TabPanel>
			</TabsProvider>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
