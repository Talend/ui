import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import talendIcons from 'talend-icons/dist/react';
import { Layout, WithDrawer, Drawer, IconsProvider, SidePanel, Nav, NavItem, Tab } from '../src/index';

const header = {
	app: 'Example App Name',
};

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


const drawers = [
	(<Drawer stacked title="Im stacked drawer 1" footerActions={Object.assign({}, basicProps, { selected: 0 })}>
		<h1>Hello drawer 1</h1>
		<p>You should not being able to read this because I'm first</p>
	</Drawer>),
	(<Drawer title="Im drawer 2" footerActions={Object.assign({}, basicProps, { selected: 0 })}>
		<h1>Hello drawer 2</h1>
		<p>The content dictate the width</p>
	</Drawer>),
	(<Drawer
		tight
		title="Im drawer 3"
		onCancelAction={onCancelAction}
		footerActions={Object.assign({}, basicProps, { selected: 0 })}
	>
		<h1>Hello drawer 3</h1>
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
	</Drawer>),
];

storiesOf('Drawer', module)
	.addWithInfo('test', () => {
		const sidePanel = (<SidePanel
			actions={actions}
			onToggleDock={action('Toggle dock clicked')}
		/>);
		return (
			<Layout
				header={header}
				mode="TwoColumns"
				one={sidePanel}
			>
				<WithDrawer
					drawers={drawers}
				>
					<span>zone with drawer</span>
				</WithDrawer>
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
									content
								</Drawer.Content>
								<Drawer.Footer>
									Test
								</Drawer.Footer>
							</Tab.Pane>
							<Tab.Pane eventKey="navigator">
								<Drawer.Footer />
							</Tab.Pane>
							<Tab.Pane eventKey="profile">
								<Drawer.Footer />
							</Tab.Pane>
							<Tab.Pane eventKey="metrics">
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
			>
				<WithDrawer
					drawers={customDrawers}
				>
					<span>zone with drawer</span>
				</WithDrawer>
				<IconsProvider defaultIcons={icons} />
			</Layout>
		);
	})
	.addWithInfo('Default', () => (
		<div>
			<h1>Hello world</h1>
			<Drawer.Animation>
				<Drawer>
					<h1>I am a drawer</h1>
				</Drawer>
				<Drawer>
					<h1>I am an other drawer</h1>
				</Drawer>
			</Drawer.Animation>
		</div>
	))
	.addWithInfo('custom classname', () => (
		<div>
			<h1>Hello world</h1>
			<Drawer.Animation>
				<Drawer className="drawer-custom">
					<h1>I am a customized drawer</h1>
					<p>Using className props</p>
				</Drawer>
			</Drawer.Animation>
		</div>
	))
	.addWithInfo('with title bar', () => (
		<div>
			<h1>Hello world</h1>
			<Drawer title="Im a title">
				<p>using title</p>
			</Drawer>
		</div>
	))
	.addWithInfo('custom styles without animation', () => (
		<div>
			<h1>Hello world</h1>
			<Drawer style={{ width: 400, backgroundColor: '#ddd' }}>
				<h1>I am a custom drawer</h1>
				<p>Using style props</p>
			</Drawer>
		</div>
	));

