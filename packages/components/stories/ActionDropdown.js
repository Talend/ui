import React from 'react';
import Immutable from 'immutable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ActionDropdown, IconsProvider, FilterBar, Action } from '../src/index';

const myAction = {
	id: 'context-dropdown-related-items',
	label: 'related items',
	icon: 'talend-file-xls-o',
	items: [
		{
			id: 'context-dropdown-item-document-1',
			icon: 'talend-file-json-o',
			label: 'document 1',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 1 click'),
		},
		{
			divider: true,
		},
		{
			id: 'context-dropdown-item-document-2',
			label: 'document 2',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 2 click'),
		},
	],
};

const withImmutable = {
	id: 'context-dropdown-related-items',
	label: 'related immutable items',
	items: Immutable.fromJS([
		{
			id: 'context-dropdown-item-document-1',
			icon: 'talend-file-json-o',
			label: 'document 1',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 1 click'),
		},
		{
			divider: true,
		},
		{
			id: 'context-dropdown-item-document-2',
			label: 'document 2',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 2 click'),
		},
	]),
};

const withComponents = {
	id: 'context-dropdown-custom-items',
	label: 'custom items',
	icon: 'talend-file-xls-o',
	getComponent: key => {
		if (key === 'Action') {
			return Action;
		} else if (key === 'FilterBar') {
			return FilterBar;
		}
		return Action;
	},
	components: {
		itemsDropdown: [
			{
				component: 'Action',
				label: 'First item',
				'data-feature': 'actiondropdown.items',
			},
			{
				divider: true,
			},
			{
				component: 'FilterBar',
				label: 'Second item',
				'data-feature': 'actiondropdown.items',
			},
		],
	},
};

const mixItemsComponents = {
	id: 'context-dropdown-mix-items',
	label: 'mix items',
	getComponent: key => {
		if (key === 'Action') {
			return Action;
		}
		return Action;
	},
	items: [
		{
			id: 'context-dropdown-item-document-1',
			icon: 'talend-file-json-o',
			label: 'document 1',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 1 click'),
		},
		{
			divider: true,
		},
		{
			id: 'context-dropdown-item-document-2',
			label: 'document 2',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 2 click'),
		},
	],
	components: {
		itemsDropdown: [
			{
				component: 'Action',
				label: 'Third item',
				'data-feature': 'actiondropdown.items',
			},
			{
				divider: true,
			},
			{
				component: 'Action',
				label: 'Fourth item',
				'data-feature': 'actiondropdown.items',
			},
		],
	},
};

const propsTooltip = {
	id: 'context-dropdown-tooltip-items',
	tooltipLabel: 'my tooltip',
	label: 'Tooltip',
	items: [
		{
			id: 'context-dropdown-item-document-1',
			icon: 'talend-file-json-o',
			label: 'document 1',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 1 click'),
		},
		{
			divider: true,
		},
		{
			id: 'context-dropdown-item-document-2',
			label: 'document 2',
			'data-feature': 'actiondropdown.items',
			onClick: action('document 2 click'),
		},
	],
};

const oneEventAction = {
	id: 'context-dropdown-events',
	label: 'Dropdown',
	items: [{ id: 'item-1', label: 'Item 1', 'data-feature': 'actiondropdown.items' }, { id: 'item-2', label: 'Item 2', 'data-feature': 'actiondropdown.items' }],
	onSelect: action('onItemSelect'),
};

storiesOf('ActionDropdown', module).addWithInfo('default', () => (
	<div>
		<p>By default :</p>
		<div id="default">
			<ActionDropdown {...myAction} />
		</div>
		<p>With immutable items :</p>
		<div id="default">
			<ActionDropdown {...withImmutable} />
		</div>
		<p>With one event handler:</p>
		<div id="oneEvent">
			<ActionDropdown {...oneEventAction} />
		</div>
		<p>With hideLabel option</p>
		<div id="hidelabel">
			<ActionDropdown {...myAction} hideLabel />
		</div>
		<p>Empty option</p>
		<div id="empty">
			<ActionDropdown {...myAction} items={[]} hideLabel />
		</div>
		<p>Dropup</p>
		<div id="dropup">
			<ActionDropdown {...myAction} dropup />
		</div>
		<p>Type link</p>
		<div id="typeLink">
			<ActionDropdown {...myAction} link />
		</div>
		<p>Components Items</p>
		<div id="withComponents">
			<ActionDropdown {...withComponents} />
		</div>
		<p>Mix Items</p>
		<div id="mixComponents">
			<ActionDropdown {...mixItemsComponents} />
		</div>
		<p>Tool tip</p>
		<div id="toolTip">
			<ActionDropdown {...propsTooltip} />
		</div>
		<IconsProvider />
	</div>
));
