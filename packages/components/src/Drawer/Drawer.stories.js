import { useState } from 'react';

import { action } from '@storybook/addon-actions';

import { TagVariantsNames } from '@talend/design-system';

import ActionBar from '../ActionBar';
import { ActionButton } from '../Actions';
import HeaderBar from '../HeaderBar';
import Layout from '../Layout';
import SidePanel from '../SidePanel';
import TabBar from '../TabBar';
import Drawer from './Drawer.component';

const header = <HeaderBar brand={{ label: 'Example App Name' }} />;

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
	className: 'btn-inverse',
};

const primary = {
	label: 'Primary',
	bsStyle: 'primary',
	onClick: action('You clicked me'),
};

const onCancelAction = {
	label: 'Cancel',
	onClick: action('You clicked on cancel action'),
	className: 'btn-inverse',
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
	id: 'tabs',
	items: [
		{
			key: 'info',
			label: 'Info',
		},
		{
			key: 'navigator',
			label: 'Navigator',
		},
		{
			key: 'profile',
			label: 'Profile',
		},
		{
			key: 'metrics',
			label: 'Metrics',
		},
	],
	onSelect: action('Tab clicked'),
	selectedKey: 'navigator',
};

const tabsActionFooter = {
	id: 'tabs',
	items: [
		{
			key: 'info',
			label: 'Info',
			footerActions: {
				actions: {
					left: [
						{
							id: 'view-left',
							key: 'view-left',
							label: 'ActionRight',
						},
					],
					center: [
						{
							id: 'view-center',
							key: 'view-center',
							label: 'ActionCenter',
						},
					],
					right: [
						{
							id: 'view-right',
							key: 'view-right',
							label: 'ActionRight',
						},
					],
				},
			},
		},
		{
			key: 'navigator',
			label: 'Navigator',
			footerActions: {
				actions: {
					left: [
						{
							id: 'view-left-hidden',
							key: 'view-left-hidden',
							bsStyle: 'danger',
							label: 'Action not visible in the tab "info"',
						},
					],
				},
			},
		},
	],
	onSelect: action('Tab clicked'),
};

function scrollableContent() {
	const content = [];
	for (let i = 1; i <= 42; i += 1) {
		content.push(<p key={i}>The scroll is defined by the content {i}</p>);
	}
	return content;
}

const titleActions = () => (
	<div>
		<ActionButton {...actions[0]} hideLabel link></ActionButton>
		<ActionButton {...actions[1]} hideLabel link></ActionButton>
	</div>
);

const drawers = [
	<Drawer
		stacked
		title="Im stacked drawer 1"
		footerActions={{ ...basicProps, selected: 0 }}
		key="drawer-1"
	>
		<h1>Hello drawer 1</h1>
		<p>You should not being able to read this because I'm first</p>
	</Drawer>,
	<Drawer title="Im drawer 2" footerActions={{ ...basicProps, selected: 0 }} key="drawer-2">
		<h1>Hello drawer 2</h1>
		<p>The scroll is defined by the content</p>
		<h1>Hello drawer 3</h1>
		{scrollableContent()}
	</Drawer>,
];

const editableDrawers = [
	<Drawer
		stacked
		title="Im stacked drawer 1"
		footerActions={{ ...basicProps, selected: 0 }}
		key="drawer-1"
	>
		<h1>Hello drawer 1</h1>
		<p>You should not being able to read this because I'm first</p>
	</Drawer>,
	<Drawer
		renderTitleActions={titleActions}
		editableTitle
		title="Im drawer 20"
		footerActions={{ ...basicProps, selected: 0 }}
		key="drawer-2"
	>
		<h1>Hello drawer 2</h1>
		<p>The scroll is defined by the content</p>
		<h1>Hello drawer 3</h1>
		{scrollableContent()}
	</Drawer>,
];

const longEditableDrawers = [
	<Drawer
		stacked
		title="Im stacked drawer 1"
		footerActions={{ ...basicProps, selected: 0 }}
		key="drawer-1"
	>
		<h1>Hello drawer 1</h1>
		<p>You should not being able to read this because I'm first</p>
	</Drawer>,
	<Drawer
		editableTitle
		renderTitleActions={titleActions}
		title="Im drawer 20 here in the long title header header header"
		footerActions={{ ...basicProps, selected: 0 }}
		onCancelAction={onCancelAction}
		key="drawer-2"
	>
		<h1>Hello drawer 2</h1>
		<p>The scroll is defined by the content</p>
		<h1>Hello drawer 3</h1>
		{scrollableContent()}
	</Drawer>,
];

const drawersNoTransition = [
	<Drawer
		route={{ state: { withTransition: false } }}
		stacked
		title="Im stacked drawer 1"
		footerActions={{ ...basicProps, selected: 0 }}
		key="drawer-1"
	>
		<h1>Hello drawer 1</h1>
		<p>You should not being able to read this because I'm first</p>
	</Drawer>,
	<Drawer
		withTransition={false}
		title="Im drawer 2"
		footerActions={{ ...basicProps, selected: 0 }}
		key="drawer-2"
	>
		<h1>Hello drawer 2</h1>
		<p>The scroll is defined by the content</p>
		<h1>Hello drawer 3</h1>
		{scrollableContent()}
	</Drawer>,
];

const sidePanel = <SidePanel actions={actions} />;
const twentyRows = [];
for (let index = 0; index < 20; index++) {
	twentyRows.push(<p key={index}>The content dictate the width</p>);
}

export default {
	title: 'Components/Layout/Drawer',
};

export const Layout1Column = () => (
	<Layout header={header} mode="OneColumn" drawers={drawers}>
		<span>zone with drawer</span>
		{twentyRows}
	</Layout>
);

export const Layout2Columns = () => (
	<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawers}>
		<span>zone with drawer</span>
		{twentyRows}
	</Layout>
);

export const WithEditableHeader = () => (
	<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={editableDrawers}>
		<span>zone with drawer</span>
		{twentyRows}
	</Layout>
);

export const WithLongEditableHeader = () => (
	<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={longEditableDrawers}>
		<span>zone with drawer</span>
		{twentyRows}
	</Layout>
);

export const DefaultWithNoTransition = () => (
	<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawersNoTransition}>
		<span>zone with drawer</span>
		{twentyRows}
	</Layout>
);

export const StackedDrawers = () => {
	const stackedDrawers = [
		<Drawer
			stacked
			title="I'm stacked drawer 1"
			footerActions={{ ...basicProps, selected: 0 }}
			key="drawer-1"
		>
			<h1>Hello drawer 1</h1>
			<p>You should not being able to read this because I'm first</p>
		</Drawer>,
		<Drawer
			stacked
			title="I'm drawer 2"
			footerActions={{ ...basicProps, selected: 0 }}
			key="drawer-2"
		>
			<h1>Hello drawer 2</h1>
			<p>The scroll is defined by the content</p>
			{scrollableContent()}
		</Drawer>,
		<Drawer
			stacked
			title="I'm drawer 3"
			footerActions={{ ...basicProps, selected: 0 }}
			key="drawer-3"
		>
			<h1>Hello drawer 3</h1>
			<p>The scroll is defined by the content</p>
			{scrollableContent()}
		</Drawer>,
	];
	const fiftyRows = [];
	for (let index = 0; index < 50; index++) {
		fiftyRows.push(<p key={index}>The content dictate the width</p>);
	}
	return (
		<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={stackedDrawers}>
			<span>zone with drawer</span>
			{fiftyRows}
		</Layout>
	);
};

export const WithTabs = () => {
	const drawersWithTabs = [
		<Drawer
			stacked
			title="I'm a stacked drawer with tabs"
			footerActions={basicProps}
			tabs={tabs}
			key="drawer-1"
		>
			<p>The content</p>
		</Drawer>,
		<Drawer title="I'm a drawer with tabs" footerActions={basicProps} tabs={tabs} key="drawer-2">
			<p>The content</p>
		</Drawer>,
	];
	return (
		<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawersWithTabs}>
			<span>zone with drawer</span>
		</Layout>
	);
};

export const WithTabsWithSpecificFooters = () => {
	const drawersWithTabs = [
		<Drawer
			stacked
			title="I'm a stacked drawer with tabs"
			selectedTabKey="info"
			tabs={tabsActionFooter}
			key="drawer-1"
		>
			<p>This tab contain specific actions in left, center and right parts of the footer.</p>
			<p>
				An other specific action with the label "Action not visible in the tab 'info'" is define in
				the tab "navigator" but not visible in the tab "info".
			</p>
		</Drawer>,
		<Drawer
			title="I'm a drawer with tabs"
			selectedTabKey="info"
			tabs={tabsActionFooter}
			key="drawer-2"
		>
			<p>This tab contain specific actions in left, center and right parts of the footer.</p>
			<p>
				An other specific action with the label "Action not visible in the tab 'info'" is define in
				the tab "navigator" but not visible in the tab "info".
			</p>
		</Drawer>,
	];
	return (
		<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawersWithTabs}>
			<span>zone with drawer</span>
		</Layout>
	);
};

export const Custom = () => {
	function CustomDrawer() {
		const [selectedTab, setSelectedTab] = useState('info');
		return (
			<Drawer.Container>
				<Drawer.Title
					title="Custom drawer with tabs and a super long name that breaks the drawer title"
					onCancelAction={onCancelAction}
				>
					<TabBar
						items={[
							{
								key: 'info',
								label: 'Info',
							},
							{
								key: 'navigator',
								label: 'Navigator',
							},
							{
								key: 'profile',
								label: 'Profile',
							},
						]}
						onSelect={(_, tab) => setSelectedTab(tab.key)}
						selectedKey={selectedTab}
					/>
				</Drawer.Title>
				<div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
					{selectedTab === 'info' && (
						<>
							<Drawer.Content>{scrollableContent()}</Drawer.Content>
							<Drawer.Footer>Test</Drawer.Footer>
						</>
					)}
					{selectedTab === 'navigator' && (
						<>
							<Drawer.Content>{scrollableContent()}</Drawer.Content>
							<Drawer.Footer />
						</>
					)}
					{selectedTab === 'profile' && (
						<>
							<Drawer.Content>{scrollableContent()}</Drawer.Content>
							<Drawer.Footer />
						</>
					)}
				</div>
			</Drawer.Container>
		);
	}
	return (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
			drawers={[<CustomDrawer key="drawer-1" />]}
		>
			<span>zone with drawer</span>
		</Layout>
	);
};

export const CustomStacked = () => {
	// Use same cancel action props with className for Title and Footer
	const sameCancelAction = panelActions.left[0];
	function CustomDrawer() {
		return (
			<Drawer.Container stacked>
				<Drawer.Title
					title="Custom drawer with tabs and a super long name that breaks the drawer title"
					onCancelAction={sameCancelAction}
				/>
				<div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
					<Drawer.Content>{scrollableContent()}</Drawer.Content>
					<Drawer.Footer>
						<ActionBar actions={panelActions} />
					</Drawer.Footer>
				</div>
			</Drawer.Container>
		);
	}
	return (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
			drawers={[<CustomDrawer key="drawer-1" />]}
		>
			<span>zone with drawer</span>
		</Layout>
	);
};

export const Interactive = () => {
	const allDrawers = {
		first: (
			<Drawer
				withTransition
				stacked
				title="Im stacked drawer 1"
				onCancelAction={{ label: 'Close', onClick: () => remove('first') }}
			>
				<h1>Hello drawer 1</h1>
				<p>You should not being able to read this because I'm first</p>
			</Drawer>
		),
		second: (
			<Drawer
				withTransition
				stacked
				title="Im drawer 2"
				onCancelAction={{ label: 'Close', onClick: () => remove('second') }}
			>
				<h1>Hello drawer 2</h1>
				<p>The scroll is defined by the content</p>
				{scrollableContent()}
			</Drawer>
		),
		third: (
			<Drawer
				withTransition={false}
				title="Im drawer 3"
				onCancelAction={{ label: 'Close', onClick: () => remove('third') }}
			>
				<h1>No transition on this one</h1>
				Coucou
			</Drawer>
		),
	};
	const [displayedDrawers, setDisplayedDrawers] = useState(allDrawers);

	function remove(id) {
		setDisplayedDrawers(oldDrawers =>
			Object.entries(oldDrawers)
				.filter(([key]) => key !== id)
				.reduce((accu, [key, value]) => {
					accu[key] = value;
					return accu;
				}, {}),
		);
	}

	return (
		<Layout header={header} mode="OneColumn" drawers={Object.values(displayedDrawers)}>
			<div style={{ padding: '1.5rem' }}>
				<button className="btn btn-primary" onClick={() => setDisplayedDrawers(allDrawers)}>
					Set back the drawers
				</button>
			</div>
		</Layout>
	);
};

export const _Interactive = () => {
	const allDrawers = {
		first: (
			<Drawer
				withTransition
				stacked
				title="Im stacked drawer 1"
				onCancelAction={{ label: 'Close', onClick: () => remove('first') }}
			>
				<h1>Hello drawer 1</h1>
				<p>You should not being able to read this because I'm first</p>
			</Drawer>
		),
		second: (
			<Drawer
				withTransition
				stacked
				title="Im drawer 2"
				onCancelAction={{ label: 'Close', onClick: () => remove('second') }}
			>
				<h1>Hello drawer 2</h1>
				<p>The scroll is defined by the content</p>
				{scrollableContent()}
			</Drawer>
		),
		third: (
			<Drawer
				withTransition={false}
				title="Im drawer 3"
				onCancelAction={{ label: 'Close', onClick: () => remove('third') }}
			>
				<h1>No transition on this one</h1>
				Coucou
			</Drawer>
		),
	};
	const [displayedDrawers, setDisplayedDrawers] = useState(allDrawers);

	function remove(id) {
		setDisplayedDrawers(oldDrawers =>
			Object.entries(oldDrawers)
				.filter(([key]) => key !== id)
				.reduce((accu, [key, value]) => {
					accu[key] = value;
					return accu;
				}, {}),
		);
	}

	return (
		<Layout header={header} mode="OneColumn" drawers={Object.values(displayedDrawers)}>
			<div style={{ padding: '1.5rem' }}>
				<button className="btn btn-primary" onClick={() => setDisplayedDrawers(allDrawers)}>
					Set back the drawers
				</button>
			</div>
		</Layout>
	);
};

export const WithSubtitleComponent = () => {
	const [variant, setVariant] = useState('default');

	return (
		<Layout
			header={header}
			mode="OneColumn"
			drawers={[
				<Drawer key="drawer-1">
					<Drawer.Title
						title="Im drawer 1"
						subtitle="Drawer subtitle"
						subtitleTag={{
							label: 'Preview',
							tooltip: 'This is a preview',
							variant,
						}}
						renderTitleActions={titleActions}
						onCancelAction={onCancelAction}
						editable
					/>
					<h1>Hello drawer 1</h1>
					<p>You should not being able to read this because I'm first</p>
				</Drawer>,
			]}
		>
			<span>Select subtitle tag variants</span>
			<select onChange={ev => setVariant(ev.target.value)} style={{ width: '250px' }}>
				{TagVariantsNames.map(variant => (
					<option key={variant} value={variant}>
						{variant}
					</option>
				))}
			</select>
		</Layout>
	);
};
