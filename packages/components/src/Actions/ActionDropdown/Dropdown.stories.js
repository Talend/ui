import React from 'react';
import Immutable from 'immutable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ActionDropdown from './ActionDropdown.component';
import IconsProvider from '../../IconsProvider';
import FilterBar from '../../FilterBar';
import Action from '../Action';

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

const loadingAdditionalContent = {
	id: 'context-dropdown-related-items',
	label: 'related items',
	loading: true,
	icon: 'talend-file-xls-o',
	items: [],
};

const contentAndLoadingAdditionalContent = {
	...loadingAdditionalContent,
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

const openWithImmutable = { ...withImmutable, open: true };

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
		throw new Error('Component not found');
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
				onFilter: action('onFilter'),
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
		throw new Error('Component not found');
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
	items: [
		{ id: 'item-1', label: 'Item 1', 'data-feature': 'actiondropdown.items' },
		{
			id: 'item-2',
			label: 'Item 2',
			'data-feature': 'actiondropdown.items',
		},
	],
	onSelect: action('onItemSelect'),
};

storiesOf('Buttons/Dropdown', module).add('default', () => (
	<div>
		<h3>By default :</h3>
		<div id="default">
			<ActionDropdown {...myAction} />
		</div>
		<h3>With one event handler:</h3>
		<div id="oneEvent">
			<ActionDropdown {...oneEventAction} />
		</div>
		<h3>With hideLabel option</h3>
		<div id="hidelabel">
			<ActionDropdown {...myAction} hideLabel />
		</div>
		<h3>Empty option</h3>
		<div id="empty">
			<ActionDropdown {...myAction} items={[]} hideLabel />
		</div>
		<h3>Dropup</h3>
		<div id="dropup">
			<ActionDropdown {...myAction} dropup />
		</div>
		<h3>Automatic Dropup : this is contained in a restricted ".tc-dropdown-container" element.</h3>
		<div
			id="auto-dropup"
			className="tc-dropdown-container"
			style={{ border: '1px solid black', overflow: 'scroll', height: '300px' }}
		>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			<br />
			ut labore et dolore magna aliqua.
			<br />
			Ut enim ad minim veniam, quis nostrud exercitation ullamco la
			<br />
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			<br />
			ut labore et dolore magna aliqua.
			<br />
			Ut enim ad minim veniam, quis nostrud exercitation ullamco la
			<br />
			<br />
			<br />
			<br />
			<p>Scroll me to set overflow on top or down of the container, then open the dropdown.</p>
			<ActionDropdown {...myAction} />
			<br />
			<br />
			<br />
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br />
			ut labore et dolore magna aliqua.
			<br />
			Ut enim ad minim veniam, quis nostrud exercitation ullamco la Lorem ipsum dolor sit amet,
			consectetur adipiscing elit, sed do eiusmod tempor <br />
			ut labore et dolore magna aliqua.
			<br />
			Ut enim ad minim veniam, quis nostrud exercitation ullamco la
		</div>
		<h3>Type link</h3>
		<div id="typeLink">
			<ActionDropdown {...myAction} link />
		</div>
		<h3>Components Items</h3>
		<div id="withComponents">
			<ActionDropdown {...withComponents} />
		</div>
		<h3>Mix Items</h3>
		<div id="mixComponents">
			<ActionDropdown {...mixItemsComponents} />
		</div>
		<h3>Tool tip</h3>
		<div id="toolTip">
			<ActionDropdown {...propsTooltip} />
		</div>
		<h3>With immutable items :</h3>
		<div id="default">
			<ActionDropdown {...withImmutable} />
		</div>
		<h3>Loading additional content</h3>
		<div id="loadingAdditionalContent">
			<ActionDropdown {...loadingAdditionalContent} />
		</div>
		<h3>Content and loading additional content</h3>
		<div id="contentAndLoadingAdditionalContent">
			<ActionDropdown {...contentAndLoadingAdditionalContent} />
		</div>
		<h3>Opened and with immutable items :</h3>
		<div id="openImmutable">
			<ActionDropdown {...openWithImmutable} />
		</div>
		<IconsProvider bundles={[`${location.origin}${location.pathname}all.svg`]} />
	</div>
));
