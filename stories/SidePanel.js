import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { SidePanel, IconsProvider } from '../src/index';

const actions = [
	{
		label: 'Preparations',
		icon: 'talend-dataprep',
		onClick: action('Preparations clicked'),
		active: true,
	},
	{
		label: 'Datasets',
		icon: 'talend-download',
		onClick: action('Datasets clicked'),
	},
	{
		label: 'Favorites',
		icon: 'talend-star',
		onClick: action('Favorites clicked'),
	},
];

storiesOf('SidePanel', module)
	.addWithInfo('default', () => {
		return (
			<div>
				<h1>SidePanel</h1>
				<h2>Definition</h2>
				<a href="http://guidelines.talend.com/document/92132#/ui-controls/side-panel">Spec</a>
				<h2>Examples</h2>
				<IconsProvider />
				<SidePanel
					id="context"
					actions={actions}
					onToggleDock={action('Toggle dock clicked')}
					docked={false}
				/>
			</div>
		);
	})
	.addWithInfo('docked', () =>
		(
			<div>
				<h1>SidePanel</h1>
				<h2>Definition</h2>
				<a href="http://guidelines.talend.com/document/92132#/ui-controls/side-panel">Spec</a>
				<h2>Examples</h2>
				<IconsProvider />
				<SidePanel
					actions={actions}
					onToggleDock={action('Toggle dock clicked')}
					docked
				/>
			</div>
		)
	);

