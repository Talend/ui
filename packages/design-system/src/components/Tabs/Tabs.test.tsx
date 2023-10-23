import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Tabs } from './';

jest.mock('@talend/utils', () => {
	let i = 0;
	return {
		// we need stable but different uuid (is fixed to 42 by current mock)
		randomUUID: () => `mocked-uuid-${i++}`,
	};
});

describe('Tabs', () => {
	it('should render accessible html', async () => {
		// note we need to add the aria-label to be accessible
		// TODO: make it required
		const { container } = render(
			<Tabs.Container id="kit" defaultActiveKey="profile">
				<Tabs.List>
					<Tabs.Tab aria-controls="home" title="Home" />
					<Tabs.Tab aria-controls="profile" title="Profile" />
					<Tabs.Tab aria-controls="contact" title="Contact" disabled />
				</Tabs.List>
				<Tabs.Panel id="home">Tab content for Home</Tabs.Panel>
				<Tabs.Panel id="profile">Tab content for Profile</Tabs.Panel>
				<Tabs.Panel id="contact">Tab content for Contact</Tabs.Panel>
			</Tabs.Container>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
	it('should render accessible html with old api', async () => {
		const { container } = render(
			<Tabs
				id="old"
				tabs={[
					{
						tabTitle: 'Tabs 1',
						tabContent: <>Tab 1</>,
					},
					{
						tabTitle: 'Tabs 2',
						tabContent: <>Tab 2</>,
					},
					{
						tabTitle: {
							title: 'Tabs 3',
							icon: 'user',
						},
						tabContent: <>Tab 3</>,
					},
				]}
			/>,
		);
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
