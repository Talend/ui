import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { List, IconsProvider } from '../src/index';

const selected = [
	{
		id: 2,
		name: 'Foo',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-pdf-o',
	}];
const props = {
	id: 'talend',
	displayMode: 'table',
	list: {
		titleProps: {
			key: 'name',
			iconKey: 'icon',
			displayModeKey: 'display',
			onClick: action('onClick'),
			onEditCancel: action('onEditCancel'),
			onEditSubmit: action('onEditSubmit'),
		},
		columns: [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
			{ key: 'author', label: 'Author' },
			{ key: 'created', label: 'Created' },
			{ key: 'modified', label: 'Modified' },
		],
		items: [
			{
				id: 1,
				name: 'Title with actions',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				actions: [{
					label: 'edit',
					icon: 'talend-pencil',
					onClick: action('onEdit'),
				}, {
					label: 'delete',
					icon: 'talend-trash',
					onClick: action('onDelete'),
				}, {
					displayMode: 'dropdown',
					label: 'related items',
					icon: 'talend-folder',
					items: [
						{
							label: 'document 1',
							onClick: action('document 1 click'),
						},
						{
							label: 'document 2',
							onClick: action('document 2 click'),
						},
					],
				}],
				icon: 'fa fa-file-excel-o',
				display: 'text',
			},
			{
				id: 2,
				name: 'Title in input mode',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				icon: 'fa fa-file-pdf-o',
				display: 'input',
			},
			{
				id: 2,
				name: 'Super long title to trigger overflow on tile rendering',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT with super long name',
			},
		],
		onElementSelect: action('onSelect'),
		onToggleAll: action('onToggleAll'),
		onToggleSingle: action('onToggleSingle'),
		ifSelected: (item) => {
			let found = false;
			for (let i = 0; i < selected.length; i += 1) {
				if (selected[i].id === item.id) {
					found = true;
					break;
				}
			}
			return found;
		},
	},
	toolbar: {
		onClickAdd: action('onClickAdd'),
		listActions: [
			{
				label: 'Delete selection',
				icon: 'talend-trash',
				onClick: action('delete'),
			},
		],
		onFilter: action('onFilter'),
		onSelectDisplayMode: action('onSelectDisplayMode'),
		sortBy: [
			{ id: 'id', name: 'Id' },
			{ id: 'name', name: 'Name', selected: true },
		],
		onSelectSortBy: action('onSelectSortBy'),
		itemsLength: 3,
		onChangePagination: action('onChangePagination'),
	},
};

storiesOf('List', module)
	.add('table (default)', () => (
		<div>
			<h1>List</h1>
			<h2>Definition</h2>
			<p>Display a list by defining your.</p>
			<h2>Examples</h2>
			<IconsProvider />
			<List {...props} />
		</div>
	))
	.add('large', () => {
		const eprops = Object.assign({}, props);
		eprops.displayMode = 'large';
		return (
			<div>
				<h1>List</h1>
				<p>Display the list in large mode</p>
				<IconsProvider />
				<List {...eprops} />
			</div>
		);
	})
	.add('tile', () => {
		const tprops = Object.assign({}, props);
		tprops.displayMode = 'tile';
		return (
			<div>
				<h1>List</h1>
				<p>Display the list in tile mode</p>
				<IconsProvider />
				<List {...tprops} />
			</div>
		);
	})
	.add('Without toolbar', () => {
		const tprops = {
			...props,
			toolbar: undefined,
		};
		return (
			<div>
				<h1>List</h1>
				<p>Display a list without toolbar</p>
				<IconsProvider />
				<List {...tprops} />
			</div>
		);
	});
