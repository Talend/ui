import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import talendIcons from '@talend/icons/dist/react';
import {
	Layout,
	Drawer,
	IconsProvider,
	SidePanel,
	Nav,
	NavItem,
	Tab,
	HeaderBar,
	ActionBar,
} from '../src/index';

const header = <HeaderBar brand={{ label: 'Example App Name' }} />;

const icons = {
	'talend-arrow-left': talendIcons['talend-arrow-left'],
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-folder': talendIcons['talend-folder'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
	'talend-star': talendIcons['talend-star'],
	'talend-cross': talendIcons['talend-cross'],
	'talend-opener': talendIcons['talend-opener'],
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

const cancel = {
	label: 'Cancel',
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
	left: [cancel],
	right: [primary],
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

const tabs = {
	items: [
		{
			id: '1',
			key: 'info',
			label: 'Info',
		},
		{
			id: '2',
			key: 'navigator',
			label: 'Navigator',
		},
		{
			id: '3',
			key: 'profile',
			label: 'Profile',
		},
		{
			id: '4',
			key: 'metrics',
			label: 'Metrics',
		},
	],
	onSelect: action('Tab clicked'),
	selectedKey: 'navigator',
};

function scrollableContent() {
	const content = [];
	for (let i = 0; i < 42; i += 1) {
		content.push(<p>The content dictate the scroll {i}</p>);
	}
	return content;
}

const drawers = [
	<Drawer
		stacked
		title="Im stacked drawer 1"
		footerActions={Object.assign({}, basicProps, { selected: 0 })}
	>
		<h1>Hello drawer 1</h1>
		<p>{"You should not being able to read this because I'm first"}</p>
	</Drawer>,
	<Drawer title="Im drawer 2" footerActions={Object.assign({}, basicProps, { selected: 0 })}>
		<h1>Hello drawer 2</h1>
		<p>The content dictate the scroll</p>
		<h1>Hello drawer 3</h1>
		{scrollableContent()}
	</Drawer>,
];

const drawersNoTransition = [
	<Drawer
		route={{ state: { withTransition: false } }}
		stacked
		title="Im stacked drawer 1"
		footerActions={Object.assign({}, basicProps, { selected: 0 })}
	>
		<h1>Hello drawer 1</h1>
		<p>{"You should not being able to read this because I'm first"}</p>
	</Drawer>,
	<Drawer
		withTransition={false}
		title="Im drawer 2"
		footerActions={Object.assign({}, basicProps, { selected: 0 })}
	>
		<h1>Hello drawer 2</h1>
		<p>The content dictate the scroll</p>
		<h1>Hello drawer 3</h1>
		{scrollableContent()}
	</Drawer>,
];

const sidePanel = <SidePanel actions={actions} onToggleDock={action('Toggle dock clicked')} />;

storiesOf('Drawer', module)
	.addWithInfo('Default', () => {
		const rows = [];
		for (let index = 0; index < 20; index++) {
			rows.push(<p key={index}>The content dictate the width</p>);
		}
		return (
			<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawers}>
				<span>zone with drawer</span>
				{rows}
				<IconsProvider defaultIcons={icons} />
			</Layout>
		);
	})
	.addWithInfo('Default with no transition', () => {
		const rows = [];
		for (let index = 0; index < 20; index++) {
			rows.push(<p key={index}>The content dictate the width</p>);
		}
		return (
			<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawersNoTransition}>
				<span>zone with drawer</span>
				{rows}
				<IconsProvider defaultIcons={icons} />
			</Layout>
		);
	})
	.addWithInfo('stacked drawers', () => {
		const stackedDrawers = [
			<Drawer
				stacked
				title="I'm stacked drawer 1"
				footerActions={Object.assign({}, basicProps, { selected: 0 })}
			>
				<h1>Hello drawer 1</h1>
				<p>{"You should not being able to read this because I'm first"}</p>
			</Drawer>,
			<Drawer
				stacked
				title="I'm drawer 2"
				footerActions={Object.assign({}, basicProps, { selected: 0 })}
			>
				<h1>Hello drawer 2</h1>
				<p>The content dictate the scroll</p>
				{scrollableContent()}
			</Drawer>,
			<Drawer
				stacked
				title="I'm drawer 3"
				footerActions={Object.assign({}, basicProps, { selected: 0 })}
			>
				<h1>Hello drawer 3</h1>
				<p>The content dictate the scroll</p>
				{scrollableContent()}
			</Drawer>,
		];
		const rows = [];
		for (let index = 0; index < 50; index++) {
			rows.push(<p key={index}>The content dictate the width</p>);
		}
		return (
			<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={stackedDrawers}>
				<span>zone with drawer</span>
				{rows}
				<IconsProvider defaultIcons={icons} />
			</Layout>
		);
	})
	.addWithInfo('With tabs', () => {
		const drawersWithTabs = [
			<Drawer stacked title="I'm a stacked drawer with tabs" footerActions={basicProps} tabs={tabs}>
				<p>The content</p>
			</Drawer>,
			<Drawer title="I'm a drawer with tabs" footerActions={basicProps} tabs={tabs}>
				<p>The content</p>
			</Drawer>,
		];
		return (
			<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawersWithTabs}>
				<span>zone with drawer</span>
				<IconsProvider defaultIcons={icons} />
			</Layout>
		);
	})
	.addWithInfo('Custom', () => {
		const customDrawers = [
			<Drawer.Container>
				<Tab.Container defaultActiveKey="info">
					<div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
						<Drawer.Title
							title="Custom drawer with tabs and a super long name that breaks the drawer title"
							onCancelAction={onCancelAction}
						>
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
								<Drawer.Footer>Test</Drawer.Footer>
							</Tab.Pane>
							<Tab.Pane eventKey="navigator">
								<Drawer.Content>content</Drawer.Content>
								<Drawer.Footer />
							</Tab.Pane>
							<Tab.Pane eventKey="profile">
								<Drawer.Content>content</Drawer.Content>
								<Drawer.Footer />
							</Tab.Pane>
							<Tab.Pane eventKey="metrics">
								<Drawer.Content>content</Drawer.Content>
								<Drawer.Footer />
							</Tab.Pane>
						</Tab.Content>
					</div>
				</Tab.Container>
			</Drawer.Container>,
		];
		return (
			<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={customDrawers}>
				<span>zone with drawer</span>
				<IconsProvider defaultIcons={icons} />
			</Layout>
		);
	})
	.addWithInfo('Custom stacked', () => {
		const customDrawers = [
			<Drawer.Container stacked>
				<Tab.Container defaultActiveKey="info">
					<div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
						<Drawer.Title
							title="Custom drawer with tabs and a super long name that breaks the drawer title"
							onCancelAction={onCancelAction}
						/>
						<Tab.Content>
							<Drawer.Content>
								<p>content</p>
							</Drawer.Content>
							<Drawer.Footer>
								<ActionBar actions={panelActions} />
							</Drawer.Footer>
						</Tab.Content>
					</div>
				</Tab.Container>
			</Drawer.Container>,
		];
		return (
			<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={customDrawers}>
				<span>zone with drawer</span>
				<IconsProvider defaultIcons={icons} />
			</Layout>
		);
	});
