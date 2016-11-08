import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Layout, SidePanel } from '../src/index';

const actions = [
	{
		label: 'Preparations',
		icon: 'fa fa-asterisk',
		onClick: action('Preparations clicked'),
	},
	{
		label: 'Datasets',
		icon: 'fa fa-file-excel-o',
		onClick: action('Datasets clicked'),
	},
	{
		label: 'Favorites',
		icon: 'fa fa-star',
		onClick: action('Favorites clicked'),
	},
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
	toggleIcon={ 'fa fa-arrow-left' }
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
		</Layout>
	))
	.addWithInfo('OneColumn with scroll', () => (
		<Layout
			header={header}
			mode="OneColumn"
		>
			{content}
		</Layout>
	))
	.addWithInfo('TwoColumns', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
		>
			<h1>Hello world</h1>
		</Layout>
	))
	.addWithInfo('TwoColumns with scroll', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
		>
			{content}
		</Layout>
	))
	.addWithInfo('TwoColumns docked', () => {
		const dockedSidePanel = (<SidePanel
			actions={actions}
			onToggleDock={action('Toggle dock clicked')}
			docked
			toggleIcon={ 'fa fa-arrow-left' }
		/>);

		return (
			<Layout
				header={header}
				mode="TwoColumns"
				one={dockedSidePanel}
			>
				{content}
			</Layout>
		);
	});
