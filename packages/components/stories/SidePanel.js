import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import talendIcons from 'talend-icons/dist/react';

import { SidePanel, IconsProvider } from '../src/index';

const icons = {
	'talend-arrow-left': talendIcons['talend-arrow-left'],
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-download': talendIcons['talend-download'],
	'talend-star': talendIcons['talend-star'],
};

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
				<IconsProvider defaultIcons={icons} />
				<SidePanel
					id="context"
					actions={actions}
					onToggleDock={action('Toggle dock clicked')}
					docked={false}
					tooltipPlacement="top"
				/>
			</div>
		);
	})
	.addWithInfo('docked', () =>
		(
			<div>
				<IconsProvider defaultIcons={icons} />
				<SidePanel
					actions={actions}
					onToggleDock={action('Toggle dock clicked')}
					docked
					tooltipPlacement="top"
				/>
			</div>
		)
	);

