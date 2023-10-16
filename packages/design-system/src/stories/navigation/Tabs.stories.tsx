import { useState } from 'react';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';
import {
	TabsAsLinkList,
	StackHorizontal,
	StackVertical,
	Tabs,
	TabsProvider,
	Tab,
	TabPanel,
	InlineMessage,
} from '../../';

export default { component: Tabs, title: 'Navigation/Tabs' };

export const Styles = () => (
	<StackHorizontal gap="M" justify="spaceBetween">
		<StackVertical gap="S" align="center">
			<h2>Default</h2>
			<TabsProvider defaultActiveKey="profile">
				<Tabs>
					<Tab aria-controls="home" title="Home" />
					<Tab aria-controls="profile" title="Profile" />
					<Tab aria-controls="contact" title="Contact" disabled />
				</Tabs>
				<TabPanel id="home">Tab content for Home</TabPanel>
				<TabPanel id="profile">Tab content for Profile</TabPanel>
				<TabPanel id="contact">Tab content for Contact</TabPanel>
			</TabsProvider>
		</StackVertical>
		<StackVertical gap="S" align="center">
			<h2>Large</h2>
			<TabsProvider size="L" defaultActiveKey="profile">
				<Tabs>
					<Tab aria-controls="home" title="Home" />
					<Tab aria-controls="profile" title="Profile" />
					<Tab aria-controls="contact" title="Contact" disabled />
				</Tabs>
				<TabPanel id="home">Tab content for Home</TabPanel>
				<TabPanel id="profile">Tab content for Profile</TabPanel>
				<TabPanel id="contact">Tab content for Contact</TabPanel>
			</TabsProvider>
		</StackVertical>
	</StackHorizontal>
);

export const TabsWithIcon = () => (
	<TabsProvider defaultActiveKey="profile">
		<Tabs>
			<Tab aria-controls="user" title="User" icon="user" />
			<Tab aria-controls="calendar" title="Calendar" icon="calendar" />
			<Tab aria-controls="favorite" title="Favorite" icon="star" disabled />
		</Tabs>
		<TabPanel id="user">Users tab content</TabPanel>
		<TabPanel id="calendar">Calendar tab content</TabPanel>
		<TabPanel id="favorite">Favorite tab content</TabPanel>
	</TabsProvider>
);

export const TabsWithTag = () => (
	<TabsProvider defaultActiveKey="profile">
		<Tabs>
			<Tab aria-controls="user" title="User" icon="user" tag={13} />
			<Tab aria-controls="calendar" title="Calendar" icon="calendar" tag={54} />
			<Tab
				aria-controls="favorite"
				title="Favorite"
				icon="star"
				tag="999+"
				tooltip="1534 Favorite items"
			/>
		</Tabs>
		<TabPanel id="user">Users tab content</TabPanel>
		<TabPanel id="calendar">Calendar tab content</TabPanel>
		<TabPanel id="favorite">Favorite tab content</TabPanel>
	</TabsProvider>
);

export const TabsWithLongTitles = () => (
	<TabsProvider defaultActiveKey="user">
		<Tabs>
			<Tab aria-controls="user" title="User" icon="user" tag={13} />
			<Tab
				aria-controls="notification"
				title="A much too long title that will trigger the overflow limit"
				icon="information-stroke"
				tag="999+"
				tooltip="1239 notifications - A much too long title that will trigger the overflow limit"
			/>
		</Tabs>
		<TabPanel id="user">Users tab content</TabPanel>
		<TabPanel id="notification">
			<h2>About tab content</h2>
		</TabPanel>
	</TabsProvider>
);

export const TabStandaloneControlled = () => {
	const [key, setKey] = useState<string>('home');
	return (
		<TabsProvider activeKey={key} onSelect={(e, k) => setKey(k)}>
			<Tabs>
				<Tab aria-controls="home" title="Home" />
				<Tab aria-controls="profile" title="Profile" />
				<Tab aria-controls="contact" title="Contact" disabled />
			</Tabs>
			<TabPanel id="home">Tab content for Home</TabPanel>
			<TabPanel id="profile">Tab content for Profile</TabPanel>
			<TabPanel id="contact">Tab content for Contact</TabPanel>
		</TabsProvider>
	);
};
