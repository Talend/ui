import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { List, IconsProvider } from '../src/index';

const props = {
	displayMode: 'table',
	list: {
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
				name: 'Hello world',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				actions: [{
					label: 'edit',
					icon: 'talend-edit',
					onClick: action('onEdit'),
				}, {
					label: 'delete',
					icon: 'talend-delete',
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
			},
			{
				id: 2,
				name: 'Foo',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				icon: 'fa fa-file-pdf-o',
			},
			{
				id: 2,
				name: 'Super long title to trigger overflow on tile rendering',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT with super long name',
			},
		],
		titleKey: 'name',
		iconKey: 'icon',
		onTitleClick: action('onClick'),
		onElementSelect: action('onSelect'),
	},
	toolbar: {
		onClickAdd: action('onClickAdd'),
		listActions: [
			{
				label: 'Delete selection',
				icon: 'talend-delete',
				onClick: action('delete'),
			},
		],
		onFilter: action('onFilter'),
		onSelectSortBy: action('onSelectSortBy'),
		onSelectDisplayMode: action('onSelectDisplayMode'),
		sortBy: [
			{ id: 'id', name: 'Id' },
			{ id: 'name', name: 'Name', selected: true },
		],
	},
};

storiesOf('List', module)
	.add('default', () => (
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
	});
