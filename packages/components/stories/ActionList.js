import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import talendIcons from '@talend/icons/dist/react';
import classNames from 'classnames';
import { Action } from '../src/Actions';
import { IconsProvider, ActionList } from '../src/index';
import Inject from '../src/Inject';
import theme from '../src/ActionList/ActionList.scss';

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

const customActions = [
	{
		preprationId: 1,
		title: 'Space the final Frontier',
		path: 'Beyond The Naked Eye',
		author: 'Helena Harris',
		numberSteps: 5,
	},
	{
		preprationId: 2,
		title: 'How To Look Up',
		path: 'MoonGazing',
		author: 'Lydia Warner',
		numberSteps: 5,
	},
];

function getActionId(id, _action) {
	if (_action.id || _action.label) {
		const actionId =
			_action.id ||
			_action.label
				.toLowerCase()
				.split(' ')
				.join('-');
		return id && `${id}-nav-${actionId}`;
	}
	return undefined;
}

function ActionListItem({ getComponent, id, onSelect, action, isSelected, isNav, itemClassName }) {
	const a11y = {
		role: 'presentation',
	};
	const extra = {};
	const Renderers = Inject.getAll(getComponent, { Action });
	if (isSelected && isNav) {
		// @see https://tink.uk/using-the-aria-current-attribute/
		a11y['aria-current'] = true;
	}
	if (onSelect) {
		extra.onClick = event => {
			onSelect(event, action);
			if (action.onClick) {
				action.onClick(event);
			}
		};
	}

	const actionProps = Object.assign(
		{},
		action,
		{
			active: undefined, // active scope is only the list item
			id: getActionId(id, action),
			bsStyle: 'link',
			role: 'link',
		},
		extra,
	);

	return (
		<li
			title={action.title}
			key={action.key || action.label}
			className={classNames(theme['tc-action-list-item'], 'tc-action-list-item', itemClassName, {
				active: isSelected,
				[theme.active]: isSelected,
			})}
			{...a11y}
		>
			<div>{action.label}</div>
			<Renderers.Action {...actionProps} label={actionProps.title} />
		</li>
	);
}

const components = {
	Action,
	ActionListItem,
};

const stories = storiesOf('ActionList', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addDecorator(checkA11y)
	.addDecorator(story => (
		<div>
			<IconsProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.addWithInfo('default', () => (
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
	.addWithInfo('with custom class names', () => (
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
	.addWithInfo('single', () => (
		<div style={{ display: 'inline-table' }}>
			<ActionList
				id="context"
				actions={[actions[1]]}
				onSelect={action('onItemSelect')}
				onToggleDock={action('onToggleDock')}
				tooltipPlacement="top"
			/>
		</div>
	))
	.addWithInfo('custom ActtionListItem', () => (
		<div style={{ display: 'inline-table' }}>
			<ActionList
				id="context"
				actions={customActions}
				onSelect={action('onItemSelect')}
				tooltipPlacement="top"
				getComponent={componentKey => components[componentKey]}
			/>
		</div>
	));
