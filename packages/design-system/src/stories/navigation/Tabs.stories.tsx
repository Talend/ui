import { useState } from 'react';
import { StackHorizontal, StackVertical, Tabs } from '../../';

export default { component: Tabs, title: 'Navigation/Tabs' };

export const Styles = () => (
	<StackHorizontal gap="M" justify="spaceBetween">
		<StackVertical gap="S" align="center">
			<h2>Default</h2>
			<Tabs.Container defaultActiveKey="profile">
				<Tabs.List>
					<Tabs.Tab aria-controls="home" title="Home" />
					<Tabs.Tab aria-controls="profile" title="Profile" />
					<Tabs.Tab aria-controls="contact" title="Contact" disabled />
				</Tabs.List>
				<Tabs.Panel id="home">Tab content for Home</Tabs.Panel>
				<Tabs.Panel id="profile">Tab content for Profile</Tabs.Panel>
				<Tabs.Panel id="contact">Tab content for Contact</Tabs.Panel>
			</Tabs.Container>
		</StackVertical>
		<StackVertical gap="S" align="center">
			<h2>Large</h2>
			<Tabs.Container size="L" defaultActiveKey="profile">
				<Tabs.List>
					<Tabs.Tab aria-controls="home" title="Home" />
					<Tabs.Tab aria-controls="profile" title="Profile" />
					<Tabs.Tab aria-controls="contact" title="Contact" disabled />
				</Tabs.List>
				<Tabs.Panel id="home">Tab content for Home</Tabs.Panel>
				<Tabs.Panel id="profile">Tab content for Profile</Tabs.Panel>
				<Tabs.Panel id="contact">Tab content for Contact</Tabs.Panel>
			</Tabs.Container>
		</StackVertical>
	</StackHorizontal>
);

export const TabsWithIcon = () => (
	<Tabs.Container defaultActiveKey="profile">
		<Tabs.List>
			<Tabs.Tab aria-controls="user" title="User" icon="user" />
			<Tabs.Tab aria-controls="calendar" title="Calendar" icon="calendar" />
			<Tabs.Tab aria-controls="favorite" title="Favorite" icon="star" disabled />
		</Tabs.List>
		<Tabs.Panel id="user">Users tab content</Tabs.Panel>
		<Tabs.Panel id="calendar">Calendar tab content</Tabs.Panel>
		<Tabs.Panel id="favorite">Favorite tab content</Tabs.Panel>
	</Tabs.Container>
);

export const TabsWithTag = () => (
	<Tabs.Container defaultActiveKey="profile">
		<Tabs.List>
			<Tabs.Tab aria-controls="user" title="User" icon="user" tag={13} />
			<Tabs.Tab aria-controls="calendar" title="Calendar" icon="calendar" tag={54} />
			<Tabs.Tab
				aria-controls="favorite"
				title="Favorite"
				icon="star"
				tag="999+"
				tooltip="1534 Favorite items"
			/>
		</Tabs.List>
		<Tabs.Panel id="user">Users tab content</Tabs.Panel>
		<Tabs.Panel id="calendar">Calendar tab content</Tabs.Panel>
		<Tabs.Panel id="favorite">Favorite tab content</Tabs.Panel>
	</Tabs.Container>
);

export const TabsWithLongTitles = () => (
	<Tabs.Container defaultActiveKey="user">
		<Tabs.List>
			<Tabs.Tab aria-controls="user" title="User" icon="user" tag={13} />
			<Tabs.Tab
				aria-controls="notification"
				title="A much too long title that will trigger the overflow limit"
				icon="information-stroke"
				tag="999+"
				tooltip="1239 notifications - A much too long title that will trigger the overflow limit"
			/>
		</Tabs.List>
		<Tabs.Panel id="user">Users tab content</Tabs.Panel>
		<Tabs.Panel id="notification">
			<h2>About tab content</h2>
		</Tabs.Panel>
	</Tabs.Container>
);

export const TabStandaloneControlled = () => {
	const [key, setKey] = useState<string>('home');
	return (
		<Tabs.Container activeKey={key} onSelect={(e, k) => setKey(k)}>
			<Tabs.List>
				<Tabs.Tab aria-controls="home" title="Home" />
				<Tabs.Tab aria-controls="profile" title="Profile" />
				<Tabs.Tab aria-controls="contact" title="Contact" disabled />
			</Tabs.List>
			<Tabs.Panel id="home">Tab content for Home</Tabs.Panel>
			<Tabs.Panel id="profile">Tab content for Profile</Tabs.Panel>
			<Tabs.Panel id="contact">Tab content for Contact</Tabs.Panel>
		</Tabs.Container>
	);
};

export const TabAPI = () => (
	<Tabs
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
	/>
);
