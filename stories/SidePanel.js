import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { SidePanel } from '../src/index';

storiesOf('Side Panel', module)
	.addWithInfo('default', () => {
		const actions = [
			{
				label: 'Preparations',
				icon: 'fa fa-asterisk',
				onClick: action('Preparations clicked'),
				active: true,
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

		return (
			<div>
				<h1>SidePanel</h1>
				<h2>Definition</h2>
				<a href="http://guidelines.talend.com/document/92132#/ui-controls/side-panel">Spec</a>
				<h2>Examples</h2>
				<SidePanel
					actions={actions}
					onToggleDock={action('Toggle dock clicked')}
					docked={false}
				/>
			</div>
		);
	})
	.addWithInfo('docked', () => {
		const actions = [
			{
				label: 'Preparations',
				icon: 'fa fa-asterisk',
				onClick: action('Preparations clicked'),
				active: true,
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

		return (
			<div>
				<h1>SidePanel</h1>
				<h2>Definition</h2>
				<a href="http://guidelines.talend.com/document/92132#/ui-controls/side-panel">Spec</a>
				<h2>Examples</h2>
				<SidePanel
					actions={actions}
					onToggleDock={action('Toggle dock clicked')}
					docked={true}
				/>
			</div>
		);
	});
