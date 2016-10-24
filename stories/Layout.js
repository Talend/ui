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
const contentOne = (<h1>Content one</h1>);
const contentTwo = (<h1>Content two</h1>);
const sidePanel = (<SidePanel
	actions={actions}
	onToggleDock={action('Toggle dock clicked')}
	docked={false}
/>);
const header = {
	app: 'Example App Name',
};

storiesOf('Layout', module)
	.addWithInfo('OneColumn', () => {
		return (
			<Layout
				header={header}
				mode="OneColumn"
				one={contentOne}
			/>
		);
	})
	.addWithInfo('TwoColumns', () => {
		return (
			<Layout
				header={header}
				mode="TwoColumns"
				one={sidePanel}
				two={contentTwo}
			/>
		);
	})
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
				two={contentTwo}
			/>
		);
	});
