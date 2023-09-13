import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

import {
	TabsAsLinkList,
	StackHorizontal,
	StackVertical,
	Tabs,
	TabsKit,
	InlineMessage,
	Tab,
} from '@talend/design-system';

export default { component: Tabs };

export const Styles = () => (
	<StackHorizontal gap="M" justify="spaceBetween">
		<StackVertical gap="S" align="center">
			<h2>Default</h2>
			<Tabs>
				<div title="Tabs 1"></div>
				<div title="Tabs 2"></div>
				<div title="Tabs 3"></div>
			</Tabs>
		</StackVertical>

		<StackVertical gap="S" align="center">
			<h2>Large</h2>
			<Tabs size="L">
				<Tab id="tab1" title="Tabs 1"></Tab>
				<Tab id="tab2" title="Tabs 2"></Tab>
				<Tab id="tab3" title="Tabs 3"></Tab>
			</Tabs>
		</StackVertical>
	</StackHorizontal>
);

export const TabsWithIcon = () => (
	<></>
	// <Tabs
	// 	tabs={[
	// 		{
	// 			icon: 'user',
	// 			title: 'User',
	// 			content: <h2>Users tab content</h2>,
	// 		},
	// 		{
	// 			icon: 'calendar',
	// 			title: 'Calendar',
	// 			content: <h2>Calendar tab content</h2>,
	// 		},
	// 		{
	// 			icon: 'star',
	// 			title: 'Favorite',
	// 			content: <h2>Favorite tab content</h2>,
	// 		},
	// 	]}
	// />
);

export const TabsWithTag = () => (
	<></>
	// <Tabs
	// 	tabs={[
	// 		{
	// 			title: 'User',
	// 			tag: 13,
	// 			content: <h2>Users tab content</h2>,
	// 		},
	// 		{
	// 			title: 'Calendar',
	// 			tag: 54,
	// 			content: <h2>Calendar tab content</h2>,
	// 		},
	// 		{
	// 			title: 'Favorite',
	// 			tag: '999+',
	// 			tooltip: '1534 Favorite items',
	// 			content: <h2>Favorite tab content</h2>,
	// 		},
	// 	]}
	// />
);

export const TabsWithLongTitles = () => (
	<></>
	// <Tabs
	// 	tabs={[
	// 		{
	// 			icon: 'user',
	// 			title: 'Users',
	// 			tag: 123,
	// 			content: <h2>Users tab content</h2>,
	// 		},
	// 		{
	// 			icon: 'information-stroke',
	// 			title: 'A much too long title that will trigger the overflow limit',
	// 			tag: '999+',
	// 			tooltip: '1239 notifications - A much too long title that will trigger the overflow limit',
	// 			content: <h2>About tab content</h2>,
	// 		},
	// 	]}
	// />
);

export const TabStandalone = () => (
	<></>
	// <Tabs
	// 	tabs={[
	// 		{
	// 			title: 'Tab 1', // Simple string title
	// 			content: (
	// 				<>
	// 					<p>Here's some tab content</p>
	// 					<InlineMessage
	// 						variant="information"
	// 						withBackground
	// 						description="With an inline message"
	// 					/>
	// 				</>
	// 			),
	// 		},
	// 		{
	// 			// Advanced object title
	// 			icon: 'user',
	// 			title: 'Tab 2',
	// 			'data-feature': 'domain.feature.description',
	// 			content: (
	// 				<>
	// 					<h2>Different content</h2>
	// 					<InlineMessage
	// 						variant="warning"
	// 						withBackground
	// 						description="With a warning inline message"
	// 					/>
	// 				</>
	// 			),
	// 		},
	// 		{
	// 			icon: 'user',
	// 			title: 'Tab 3',
	// 			tag: '999+',
	// 			tooltip: "It's a large number",
	// 			content: (
	// 				<>
	// 					<h2>Different content again</h2>
	// 					<InlineMessage
	// 						variant="destructive"
	// 						withBackground
	// 						description="With a danger inline message"
	// 					/>
	// 				</>
	// 			),
	// 		},
	// 	]}
	// />
);

export const TabStandaloneLarge = () => (
	<></>
	// <Tabs
	// 	size="L"
	// 	tabs={[
	// 		{
	// 			title: 'Tab title that hits the size limit should get a tooltip',
	// 			tooltip: 'Tab title that hits the size limit should get a tooltip',
	// 			content: (
	// 				<>
	// 					<p>Here's some tab content</p>
	// 					<InlineMessage
	// 						variant="information"
	// 						withBackground
	// 						description="With an inline message"
	// 					/>
	// 				</>
	// 			),
	// 		},
	// 		{
	// 			icon: 'user',
	// 			title: 'Tab 2',
	// 			'data-feature': 'domain.feature.description',
	// 			content: (
	// 				<>
	// 					<h2>Different content</h2>
	// 					<InlineMessage
	// 						variant="warning"
	// 						withBackground
	// 						description="With a warning inline message"
	// 					/>
	// 				</>
	// 			),
	// 		},
	// 		{
	// 			icon: 'user',
	// 			title: 'Tab 3',
	// 			tag: '999+',
	// 			tooltip: "It's a large number",
	// 			content: (
	// 				<>
	// 					<h2>Different content again</h2>
	// 					<InlineMessage
	// 						variant="destructive"
	// 						withBackground
	// 						description="With a danger inline message"
	// 					/>
	// 				</>
	// 			),
	// 		},
	// 	]}
	// />
);

export const TabsWithComposition = () => (
	<TabsKit selectedId="one">
		<TabsKit.TabList>
			<TabsKit.Tab id="one" tooltip="Tab title that hits the size limit should get a tooltip">
				Tab title that hits the size limit should get a tooltip
			</TabsKit.Tab>
			<TabsKit.Tab id="two" icon="user" title="Tab 2" />
		</TabsKit.TabList>

		<TabsKit.TabPanel id="one">
			<p>Here's some tab content</p>
			<InlineMessage variant="information" withBackground description="With an inline message" />
		</TabsKit.TabPanel>

		<TabsKit.TabPanel id="two">
			<h2>Different content</h2>
			<InlineMessage variant="warning" withBackground description="With a warning inline message" />
		</TabsKit.TabPanel>
	</TabsKit>
);

export const TabsWithCompositionLarge = () => (
	<TabsKit selectedId="one">
		<TabsKit.TabList>
			<TabsKit.Tab
				id="one"
				size="L"
				tooltip="Tab title that hits the size limit should get a tooltip"
			>
				Tab title that hits the size limit should get a tooltip
			</TabsKit.Tab>
			<TabsKit.Tab id="two" size="L" icon="user" title="Tab 2" />
		</TabsKit.TabList>

		<TabsKit.TabPanel id="one">
			<p>Here's some tab content</p>
			<InlineMessage variant="information" withBackground description="With an inline message" />
		</TabsKit.TabPanel>

		<TabsKit.TabPanel id="two">
			<h2>Different content</h2>
			<InlineMessage variant="warning" withBackground description="With a warning inline message" />
		</TabsKit.TabPanel>
	</TabsKit>
);

export const TabStandaloneControlled = () => (
	<></>
	// <Tabs
	// 	selectedId="tab2"
	// 	tabs={[
	// 		{
	// 			title: 'Tab 1',
	// 			content: (
	// 				<>
	// 					<p>Here's some tab content</p>
	// 					<InlineMessage
	// 						variant="information"
	// 						withBackground
	// 						description="With an inline message"
	// 					/>
	// 				</>
	// 			),
	// 		},
	// 		{
	// 			icon: 'user',
	// 			title: 'Tab 2',
	// 			'data-feature': 'domain.feature.description',
	// 			id: 'tab2', // Set the tab's id for this use, otherwise it will create one randomly
	// 			content: (
	// 				<>
	// 					<h2>Different content</h2>
	// 					<InlineMessage
	// 						variant="warning"
	// 						withBackground
	// 						description="With a warning inline message"
	// 					/>
	// 				</>
	// 			),
	// 		},
	// 	]}
	// />
);

export const TabsWithCompositionControlled = () => (
	<TabsKit selectedId="tab2">
		<TabsKit.TabList>
			<TabsKit.Tab
				size="L"
				id="tab1"
				tooltip="Tab title that hits the size limit should get a tooltip"
			>
				Tab title that hits the size limit should get a tooltip
			</TabsKit.Tab>
			<TabsKit.Tab size="L" id="tab2" icon="user" title="Tab 2" />
		</TabsKit.TabList>

		<TabsKit.TabPanel id="tab1">
			<p>Here's some tab content</p>
			<InlineMessage variant="information" withBackground description="With an inline message" />
		</TabsKit.TabPanel>

		<TabsKit.TabPanel id="tab2">
			<h2>Different content</h2>
			<InlineMessage variant="warning" withBackground description="With a warning inline message" />
		</TabsKit.TabPanel>
	</TabsKit>
);

export const TabsAsLinks = () => (
	<BrowserRouter>
		<TabsAsLinkList
			tabs={[
				{
					href: '/test',
					title: 'Tab 1',
					icon: 'user',
					tag: 12,
				},
				{
					href: '/test',
					title: 'Tab 2',
					icon: 'calendar',
					tag: 9,
				},
				{
					title: 'Tab 3',
					icon: 'star',
					tag: '999+',
					tooltip: '1234',
					isActive: true,
				},
			]}
		/>

		<TabsAsLinkList
			size="L"
			tabs={[
				{
					href: '/test',
					title: 'Tab 1',
					icon: 'user',
					tag: 12,
				},
				{
					href: '/test',
					title: 'Tab 2',
					icon: 'calendar',
					tag: 9,
				},
				{
					title: 'Tab 3',
					icon: 'star',
					tag: '120',
					isActive: true,
					as: <RouterLink to="/home" />, // Be careful, polymorphism and tooltips are not compatible.
				},
			]}
		/>
	</BrowserRouter>
);
