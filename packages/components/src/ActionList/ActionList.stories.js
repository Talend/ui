import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ActionList from './ActionList.component';
import IconsProvider from '../IconsProvider';

const actions = [
	{
		label: 'Recent datasets',
		icon: 'talend-clock',
		'data-feature': 'actionlist.item',
		onClick: action('Recent clicked'),
	},
	{
		label: 'Favorite datasets',
		icon: 'talend-star',
		'data-feature': 'actionlist.item',
		onClick: action('Favorite clicked'),
		active: true,
	},
	{
		label: 'Certified datasets',
		icon: 'talend-badge',
		'data-feature': 'actionlist.item',
		onClick: action('Certified clicked'),
	},
	{
		label: 'All datasets',
		icon: 'talend-expanded',
		'data-feature': 'actionlist.item',
		onClick: action('All clicked'),
	},
	{
		label: 'Import file',
		icon: 'talend-folder',
		'data-feature': 'actionlist.item',
		onClick: action('Import clicked'),
	},
	{
		label: 'Use magic',
		icon: 'talend-tdp-negative',
		'data-feature': 'actionlist.item',
		onClick: action('Magic clicked'),
	},
];

const stories = storiesOf('Navigation/ActionList', module);

stories
	.addDecorator(story => (
		<div>
			<IconsProvider />
			{story()}
		</div>
	))
	.add('default', () => (
		<div style={{ display: 'inline-table' }}>
			<ActionList
				id="context"
				actions={actions}
				onSelect={action('onItemSelect')}
				onToggleDock={action('onToggleDock')}
				tooltipPlacement="top"
			/>
		</div>
	))
	.add('with custom class names', () => (
		<div>
			<p>You can add your custom classnames to the container and items</p>
			<pre>
				{`
.custom-container-classname {
	border: 5px solid turquoise;
}

.custom-item-classname {
	background-color: pink;
}
					`}
			</pre>
			<pre>
				{`
<ActionList
	className={'custom-container-classname'}
	itemClassName={'custom-item-classname'}
	{...otherProps}
/>
			`}
			</pre>
			<style>
				{`.custom-container-classname {
						border: 5px solid turquoise;
					}

					.custom-item-classname {
						background-color: pink;
					}`}
			</style>
			<div style={{ display: 'inline-table' }}>
				<ActionList
					id="context"
					actions={actions}
					onSelect={action('onItemSelect')}
					onToggleDock={action('onToggleDock')}
					tooltipPlacement="top"
					className="custom-container-classname"
					itemClassName="custom-item-classname"
				/>
			</div>
		</div>
	))
	.add('single', () => (
		<div style={{ display: 'inline-table' }}>
			<ActionList
				id="context"
				actions={[actions[1]]}
				onSelect={action('onItemSelect')}
				onToggleDock={action('onToggleDock')}
				tooltipPlacement="top"
			/>
		</div>
	));
