import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import talendIcons from 'talend-icons/dist/react';
import { Layout, Drawer, IconsProvider, SidePanel, Nav, NavItem, Tab, AppHeaderBar } from '../src/index';

const header = <AppHeaderBar app="Example App Name" />;

const icons = {
	'talend-arrow-left': talendIcons['talend-arrow-left'],
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-folder': talendIcons['talend-folder'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
	'talend-star': talendIcons['talend-star'],
	'talend-cross': talendIcons['talend-cross'],
};

const actions = [
	{
		label: 'Preparations',
		icon: 'talend-dataprep',
		onClick: action('Preparations clicked'),
	},
	{
		label: 'Datasets',
		icon: 'talend-folder',
		onClick: action('Datasets clicked'),
	},
	{
		label: 'Favorites',
		icon: 'talend-star',
		onClick: action('Favorites clicked'),
	},
];

const connect = {
	label: 'Connect',
	onClick: action('You clicked me'),
};

const primary = {
	label: 'Primary',
	bsStyle: 'primary',
	onClick: action('You clicked me'),
};

const onCancelAction = {
	label: 'Cancel',
	onClick: action('You clicked on cancel action'),
};

const panelActions = {
	left: [],
	right: [
		connect,
		primary,
	],
};

const multi3 = {
	label: 'multi3',
	icon: 'talend-cog',
	onClick: action('You clicked me'),
};

const multiSelectActions = {
	left: [
		{
			label: 'multi1',
			icon: 'talend-cog',
			onClick: action('You clicked me'),
		},
		{
			label: 'multi2',
			icon: 'talend-cog',
			onClick: action('You clicked me'),
		},
	],
	right: [
		multi3,
		{
			label: 'multi4',
			icon: 'talend-cog',
			onClick: action('You clicked me'),
		},
	],
};

const basicProps = {
	actions: panelActions,
	multiSelectActions,
};

function scrollableContent() {
	const content = [];
	for (let i = 0; i < 42; i += 1) {
		content.push(<p>The content dictate the scroll {i}</p>);
	}
	return content;
}

const drawers = [
	(<Drawer stacked title="Im stacked drawer 1" footerActions={Object.assign({}, basicProps, { selected: 0 })}>
		<h1>Hello drawer 1</h1>
		<p>{ "You should not being able to read this because I'm first" }</p>
	</Drawer>),
	(<Drawer title="Im drawer 2" footerActions={Object.assign({}, basicProps, { selected: 0 })}>
		<h1>Hello drawer 2</h1>
		<p>The content dictate the scroll</p>
		<h1>Hello drawer 3</h1>
		{scrollableContent()}
	</Drawer>),
];

storiesOf('Drawer', module)
	.addWithInfo('Default', () => {
		const sidePanel = (<SidePanel
			actions={actions}
			onToggleDock={action('Toggle dock clicked')}
		/>);
		return (
			<Layout
				header={header}
				mode="TwoColumns"
				one={sidePanel}
				drawers={drawers}
			>
				<span>zone with drawer</span>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<IconsProvider defaultIcons={icons} />
			</Layout>
		);
	})
	.addWithInfo('stacked drawers', () => {
		const stackedDrawers = [
			(<Drawer stacked title="Im stacked drawer 1" footerActions={Object.assign({}, basicProps, { selected: 0 })}>
				<h1>Hello drawer 1</h1>
				<p>{ "You should not being able to read this because I'm first" }</p>
			</Drawer>),
			(<Drawer stacked title="Im drawer 2" footerActions={Object.assign({}, basicProps, { selected: 0 })}>
				<h1>Hello drawer 2</h1>
				<p>The content dictate the scroll</p>
				{scrollableContent()}
			</Drawer>),
			(<Drawer stacked title="Im drawer 3" footerActions={Object.assign({}, basicProps, { selected: 0 })}>
				<h1>Hello drawer 3</h1>
				<p>The content dictate the scroll</p>
				{scrollableContent()}
			</Drawer>),
		];
		const sidePanel = (<SidePanel
			actions={actions}
			onToggleDock={action('Toggle dock clicked')}
		/>);
		return (
			<Layout
				header={header}
				mode="TwoColumns"
				one={sidePanel}
				drawers={stackedDrawers}
			>
				<span>zone with drawer</span>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<p>The content dictate the width</p>
				<IconsProvider defaultIcons={icons} />
			</Layout>
		);
	})
	.addWithInfo('Custom', () => {
		const customDrawers = [(
			<Drawer.Container>
				<Tab.Container
					defaultActiveKey="info"
				>
					<div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
						<Drawer.Title title="custom with tabs" onCancelAction={onCancelAction}>
							<Nav bsClass="nav nav-tabs">
								<NavItem componentClass="button" eventKey="info">
									Info
								</NavItem>
								<NavItem componentClass="button" eventKey="navigator">
									Navigator
								</NavItem>
								<NavItem componentClass="button" eventKey="profile">
									Profile
								</NavItem>
								<NavItem componentClass="button" eventKey="metrics">
									Metrics
								</NavItem>
							</Nav>
						</Drawer.Title>
						<Tab.Content animation>
							<Tab.Pane eventKey="info">
								<Drawer.Content>
									<p>content</p>
								</Drawer.Content>
								<Drawer.Footer>
									Test
								</Drawer.Footer>
							</Tab.Pane>
							<Tab.Pane eventKey="navigator">
								<Drawer.Content>
									content
								</Drawer.Content>
								<Drawer.Footer />
							</Tab.Pane>
							<Tab.Pane eventKey="profile">
								<Drawer.Content>
									content
								</Drawer.Content>
								<Drawer.Footer />
							</Tab.Pane>
							<Tab.Pane eventKey="metrics">
								<Drawer.Content>
									content
								</Drawer.Content>
								<Drawer.Footer />
							</Tab.Pane>
						</Tab.Content>
					</div>
				</Tab.Container>
			</Drawer.Container>
		)];
		const sidePanel = (<SidePanel
			actions={actions}
			onToggleDock={action('Toggle dock clicked')}
		/>);
		return (
			<Layout
				header={header}
				mode="TwoColumns"
				one={sidePanel}
				drawers={customDrawers}
			>
				<span>zone with drawer</span>
				<IconsProvider defaultIcons={icons} />
			</Layout>
		);
	});
