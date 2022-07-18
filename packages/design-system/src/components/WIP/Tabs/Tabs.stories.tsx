import React from 'react';
import Tabs from './variants/Tabs';
import TabsKit from './variants/TabsKit';
import { InlineMessage } from '../../InlineMessage';
import Divider from '../../Divider';
import { StackVertical } from '../../Stack';

export default { component: Tabs };

export const TabsWithIcon = () => (
	<Tabs
		tabs={[
			{
				tabTitle: {
					icon: 'user',
					title: 'Users',
				},
				tabContent: <h2>Users tab content</h2>,
			},
			{
				tabTitle: {
					icon: 'information-stroke',
					title: 'About',
				},
				tabContent: <h2>About tab content</h2>,
			},
		]}
	/>
);

export const TabsWithTag = () => (
	<Tabs
		tabs={[
			{
				tabTitle: {
					icon: 'user',
					title: 'Users',
					tag: 123,
				},
				tabContent: <h2>Users tab content</h2>,
			},
			{
				tabTitle: {
					icon: 'information-stroke',
					title: 'Notifications',
					tag: '999+',
					tooltip: '1239 notifications',
				},
				tabContent: <h2>About tab content</h2>,
			},
		]}
	/>
);

export const TabsWithLongTitles = () => (
	<Tabs
		tabs={[
			{
				tabTitle: {
					icon: 'user',
					title: 'Users',
					tag: 123,
				},
				tabContent: <h2>Users tab content</h2>,
			},
			{
				tabTitle: {
					icon: 'information-stroke',
					title: 'A much too long title that will trigger the overflow limit',
					tag: '999+',
					tooltip:
						'1239 notifications - A much too long title that will trigger the overflow limit',
				},
				tabContent: <h2>About tab content</h2>,
			},
		]}
	/>
);

export const TabStandalone = () => (
	<Tabs
		tabs={[
			{
				tabTitle: 'Tab 1', // Simple string title
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
					// Advanced object title
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
					tag: '999+',
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
					tag: '999+',
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
	<TabsKit>
		<StackVertical gap="M">
			<StackVertical gap="S">
				<h2>A header of some sort</h2>
				<TabsKit.TabList>
					<TabsKit.Tab tooltip="Tab title that hits the size limit should get a tooltip">
						Tab title that hits the size limit should get a tooltip
					</TabsKit.Tab>
					<TabsKit.Tab icon="user" title="Tab 2" />
				</TabsKit.TabList>
			</StackVertical>

			<Divider />

			<TabsKit.TabPanel>
				<p>Here's some tab content</p>
				<InlineMessage variant="information" withBackground description="With an inline message" />
			</TabsKit.TabPanel>

			<TabsKit.TabPanel>
				<h2>Different content</h2>
				<InlineMessage
					variant="warning"
					withBackground
					description="With a warning inline message"
				/>
			</TabsKit.TabPanel>
		</StackVertical>
	</TabsKit>
);

export const TabsWithCompositionLarge = () => (
	<TabsKit>
		<StackVertical gap="M">
			<StackVertical gap="S">
				<h2>A header of some sort</h2>
				<TabsKit.TabList>
					<TabsKit.Tab size="L" tooltip="Tab title that hits the size limit should get a tooltip">
						Tab title that hits the size limit should get a tooltip
					</TabsKit.Tab>
					<TabsKit.Tab size="L" icon="user" title="Tab 2" />
				</TabsKit.TabList>
			</StackVertical>

			<TabsKit.TabPanel>
				<p>Here's some tab content</p>
				<InlineMessage variant="information" withBackground description="With an inline message" />
			</TabsKit.TabPanel>

			<TabsKit.TabPanel>
				<h2>Different content</h2>
				<InlineMessage
					variant="warning"
					withBackground
					description="With a warning inline message"
				/>
			</TabsKit.TabPanel>
		</StackVertical>
	</TabsKit>
);

export const TabStandaloneControlled = () => (
	<Tabs
		selectedId="tab2"
		tabs={[
			{
				tabTitle: 'Tab 1',
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
					id: 'tab2', // Set the tab's id for this use, otherwise Reakit will create one randomly
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
		]}
	/>
);

export const TabsWithCompositionControlled = () => (
	<TabsKit selectedId="tab2">
		<StackVertical gap="M">
			<StackVertical gap="S">
				<h2>A header of some sort</h2>
				<TabsKit.TabList>
					<TabsKit.Tab size="L" tooltip="Tab title that hits the size limit should get a tooltip">
						Tab title that hits the size limit should get a tooltip
					</TabsKit.Tab>
					<TabsKit.Tab size="L" id="tab2" icon="user" title="Tab 2" />
				</TabsKit.TabList>
			</StackVertical>

			<TabsKit.TabPanel>
				<p>Here's some tab content</p>
				<InlineMessage variant="information" withBackground description="With an inline message" />
			</TabsKit.TabPanel>

			<TabsKit.TabPanel>
				<h2>Different content</h2>
				<InlineMessage
					variant="warning"
					withBackground
					description="With a warning inline message"
				/>
			</TabsKit.TabPanel>
		</StackVertical>
	</TabsKit>
);
