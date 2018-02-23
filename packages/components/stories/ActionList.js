import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';
import { IconsProvider, ActionList } from '../src/index';


const icons = {
	'talend-clock': talendIcons['talend-clock'],
	'talend-star': talendIcons['talend-star'],
	'talend-badge': talendIcons['talend-badge'],
	'talend-expanded': talendIcons['talend-expanded'],
	'talend-folder': talendIcons['talend-folder'],
	'talend-tdp-negative': talendIcons['talend-tdp-negative'],
};

const actions = [
	{
		label: 'Recent datasets',
		icon: 'talend-clock',
		onClick: action('Recent clicked'),
		active: true,
	},
	{
		label: 'Favorite datasets',
		icon: 'talend-star',
		onClick: action('Favorite clicked'),
	},
	{
		label: 'Certified datasets',
		icon: 'talend-badge',
		onClick: action('Certified clicked'),
	},
	{
		label: 'All datasets',
		icon: 'talend-expanded',
		onClick: action('All clicked'),
	},
	{
		label: 'Import file',
		icon: 'talend-folder',
		onClick: action('Import clicked'),
	},
	{
		label: 'Use magic',
		icon: 'talend-tdp-negative',
		onClick: action('Magic clicked'),
	},
];


const stories = storiesOf('ActionList', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}


stories
	.addDecorator(story => (
		<div>
			<IconsProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.addWithInfo('default', () => (
		<div style={{ display: 'inline-table', background: '#236192' }}>
			<ActionList
				id="context"
				actions={actions}
				onSelect={action('onItemSelect')}
				onToggleDock={action('onToggleDock')}
				tooltipPlacement="top"
			/>
		</div>
	))
	.addWithInfo('single', () => (
		<div style={{ display: 'inline-table', background: '#236192' }}>
			<ActionList
				id="context"
				actions={[actions[1]]}
				onSelect={action('onItemSelect')}
				onToggleDock={action('onToggleDock')}
				tooltipPlacement="top"
			/>
		</div>
	));
