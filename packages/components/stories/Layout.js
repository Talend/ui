import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import talendIcons from 'talend-icons/dist/react';

import { IconsProvider, Layout, SidePanel } from '../src/index';

const icons = {
	'talend-arrow-left': talendIcons['talend-arrow-left'],
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-folder': talendIcons['talend-folder'],
	'talend-star': talendIcons['talend-star'],
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

const drawers = [
	(<div style={{ width: 500 }}>
		<h1>Hello drawers</h1>
		<p>You should not being able to read this because I'm first</p>
	</div>),
	(<div style={{ width: 400 }}>
		<h1>Hello drawers</h1>
		<p>The content dictate the width</p>
	</div>),
];

const content = (
	<div>
		<h1>Welcome to the content for testing scroll</h1>
		<ul>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
		</ul>
	</div>
);
const sidePanel = (<SidePanel
	actions={actions}
	onToggleDock={action('Toggle dock clicked')}
	docked={false}
/>);
const header = {
	app: 'Example App Name',
};

storiesOf('Layout', module)
	.addWithInfo('OneColumn', () => (
		<Layout
			header={header}
			mode="OneColumn"
		>
			<h1>Hello world</h1>
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('OneColumn with scroll', () => (
		<Layout
			header={header}
			mode="OneColumn"
		>
			{content}
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('TwoColumns', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
		>
			<h1>Hello world</h1>
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('TwoColumns with scroll', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
		>
			{content}
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('TwoColumns docked', () => {
		const dockedSidePanel = (<SidePanel
			actions={actions}
			onToggleDock={action('Toggle dock clicked')}
			docked
		/>);

		return (
			<Layout
				header={header}
				mode="TwoColumns"
				one={dockedSidePanel}
			>
				{content}
				<IconsProvider defaultIcons={icons} />
			</Layout>
		);
	})
	.addWithInfo('TwoColumns with drawers', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
			drawers={drawers}
		>
			{content}
			<IconsProvider defaultIcons={icons} />
		</Layout>
	));
