import React from 'react';
import Tabs from './variants/Tabs';
import TabsKit from './variants/TabsKit';
import { InlineMessage } from '../../InlineMessage';

export default { component: Tabs };

export const TabStandalone = () => (
	<Tabs
		tabs={[
			{
				tabTitle: {
					title: 'Tab title that hits the size limit should get a tooltip',
					tooltip: 'Tab title that hits the size limit should get a tooltip',
				},
				tabContent: (
					<>
						<p>Here's some tab content</p>
						<InlineMessage
							variant="information"
							withBackground
							description="With an inline message"
						/>
					</>
				),
			},
			{
				tabTitle: {
					icon: 'user',
					title: 'Tab 2',
					'data-feature': 'domain.feature.description',
				},
				tabContent: (
					<>
						<h2>Different content</h2>
						<InlineMessage
							variant="warning"
							withBackground
							description="With a warning inline message"
						/>
					</>
				),
			},
			{
				tabTitle: {
					icon: 'user',
					title: 'Tab 3',
					tag: {
						variant: 'default',
						value: '999+',
					},
					tooltip: "It's a large number",
				},
				tabContent: (
					<>
						<h2>Different content again</h2>
						<InlineMessage
							variant="destructive"
							withBackground
							description="With a danger inline message"
						/>
					</>
				),
			},
		]}
	/>
);

export const TabStandaloneLarge = () => (
	<Tabs
		size="L"
		tabs={[
			{
				tabTitle: {
					title: 'Tab title that hits the size limit should get a tooltip',
					tooltip: 'Tab title that hits the size limit should get a tooltip',
				},
				tabContent: (
					<>
						<p>Here's some tab content</p>
						<InlineMessage
							variant="information"
							withBackground
							description="With an inline message"
						/>
					</>
				),
			},
			{
				tabTitle: {
					icon: 'user',
					title: 'Tab 2',
					'data-feature': 'domain.feature.description',
				},
				tabContent: (
					<>
						<h2>Different content</h2>
						<InlineMessage
							variant="warning"
							withBackground
							description="With a warning inline message"
						/>
					</>
				),
			},
			{
				tabTitle: {
					icon: 'user',
					title: 'Tab 3',
					tag: {
						variant: 'default',
						value: '999+',
					},
					tooltip: "It's a large number",
				},
				tabContent: (
					<>
						<h2>Different content again</h2>
						<InlineMessage
							variant="destructive"
							withBackground
							description="With a danger inline message"
						/>
					</>
				),
			},
		]}
	/>
);

export const TabsWithComposition = () => (
	<TabsKit selectedId="tab2">
		<TabsKit.TabList>
			<TabsKit.Tab tooltip="Tab title that hits the size limit should get a tooltip">
				Tab title that hits the size limit should get a tooltip
			</TabsKit.Tab>
			<TabsKit.Tab id="tab2" icon="user" title="Tab 2" />
		</TabsKit.TabList>

		<TabsKit.TabPanel>
			<p>Here's some tab content</p>
			<InlineMessage variant="information" withBackground description="With an inline message" />
		</TabsKit.TabPanel>

		<TabsKit.TabPanel>
			<h2>Different content</h2>
			<InlineMessage variant="warning" withBackground description="With a warning inline message" />
		</TabsKit.TabPanel>
	</TabsKit>
);

export const TabsWithCompositionLarge = () => (
	<TabsKit selectedId="tab2">
		<TabsKit.TabList>
			<TabsKit.Tab size="L" tooltip="Tab title that hits the size limit should get a tooltip">
				Tab title that hits the size limit should get a tooltip
			</TabsKit.Tab>
			<TabsKit.Tab size="L" id="tab2" icon="user" title="Tab 2" />
		</TabsKit.TabList>

		<TabsKit.TabPanel>
			<p>Here's some tab content</p>
			<InlineMessage variant="information" withBackground description="With an inline message" />
		</TabsKit.TabPanel>

		<TabsKit.TabPanel>
			<h2>Different content</h2>
			<InlineMessage variant="warning" withBackground description="With a warning inline message" />
		</TabsKit.TabPanel>
	</TabsKit>
);
