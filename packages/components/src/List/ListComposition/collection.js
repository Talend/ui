// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import random from 'lodash/random';

const fewTitleActions = [
	{
		id: 'edit',
		label: 'Edit',
		'data-feature': 'list.item.edit',
		icon: 'talend-pencil',
		onClick: action('onEdit'),
		hideLabel: true,
	},
	{
		id: 'delete',
		label: 'Delete',
		'data-feature': 'list.item.delete',
		icon: 'talend-trash',
		onClick: action('onDelete'),
		hideLabel: true,
	},
];

const lotOfTitleActions = [
	{
		id: 'edit',
		label: 'Edit',
		'data-feature': 'list.item.edit',
		icon: 'talend-pencil',
		onClick: action('onEdit'),
	},
	{
		id: 'delete',
		label: 'Delete',
		'data-feature': 'list.item.delete',
		icon: 'talend-trash',
		onClick: action('onDelete'),
	},
	{
		id: 'copy',
		label: 'Copy',
		'data-feature': 'list.item.copy',
		icon: 'talend-files-o',
		onClick: action('onCopy'),
	},
	{
		id: 'parameters',
		label: 'Edit parameters',
		'data-feature': 'list.item.params',
		icon: 'talend-cog',
		onClick: action('onEditParameters'),
	},
];

const titleActions = [
	{
		id: 'edit',
		label: 'edit',
		'data-feature': 'list.item.edit',
		icon: 'talend-pencil',
		onClick: action('onEdit'),
	},
	{
		id: 'delete',
		label: 'delete',
		'data-feature': 'list.item.delete',
		icon: 'talend-trash',
		onClick: action('onDelete'),
	},
	{
		id: 'copy',
		label: 'copy',
		'data-feature': 'list.item.copy',
		icon: 'talend-files-o',
		onClick: action('onCopy'),
	},
	{
		id: 'parameters',
		label: 'edit parameters',
		'data-feature': 'list.item.params',
		icon: 'talend-cog',
		onClick: action('onEditParameters'),
	},
	{
		id: 'related',
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'talend-folder',
		items: [
			{
				label: 'document 1',
				'data-feature': 'list.item.related',
				onClick: action('document 1 click'),
			},
			{
				label: 'document 2',
				'data-feature': 'list.item.related',
				onClick: action('document 2 click'),
			},
			{
				label: 'document 3',
				'data-feature': 'list.item.related',
				onClick: action('document 3 click'),
			},
			{
				label: 'document 4',
				'data-feature': 'list.item.related',
				onClick: action('document 4 click'),
			},
			{
				label: 'document 5',
				'data-feature': 'list.item.related',
				onClick: action('document 5 click'),
			},
			{
				label: 'document 6',
				'data-feature': 'list.item.related',
				onClick: action('document 6 click'),
			},
			{
				label: 'document 7',
				'data-feature': 'list.item.related',
				onClick: action('document 7 click'),
			},
			{
				label: 'document 8',
				'data-feature': 'list.item.related',
				onClick: action('document 8 click'),
			},
			{
				label: 'document 9',
				'data-feature': 'list.item.related',
				onClick: action('document 9 click'),
			},
			{
				label: 'document 10',
				'data-feature': 'list.item.related',
				onClick: action('document 10 click'),
			},
		],
		pullRight: true,
	},
];

const persistentActions = [
	{
		label: 'favorite',
		icon: 'talend-star',
		className: 'favorite',
		'data-feature': 'list.item.favorite',
		onClick: action('onFavorite'),
	},
	{
		label: 'certify',
		icon: 'talend-badge',
		className: 'certify',
		'data-feature': 'list.item.certify',
		onClick: action('onCertify'),
	},
];

const complexCollection = [
	{
		id: 0,
		iconAndText: {
			icon: 'talend-list',
			label: 'list',
		},
		name: 'Title with few actions',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with few actions',
		author: 'Jean-Pierre DUPONT',
		display: 'text',
		className: 'item-0-class',
		titleActions: fewTitleActions,
	},
	{
		id: 1,
		iconAndText: {
			icon: 'talend-list',
			label: 'list',
		},
		name: 'Title with lot of actions',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with lot of actions',
		display: 'text',
		className: 'item-1-class',
		titleActions: lotOfTitleActions,
	},
	{
		id: 2,
		iconAndText: {
			icon: 'talend-list',
			label: 'list',
		},
		name: 'Title with persistant actions',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with icon and actions',
		author: 'Jean-Pierre DUPONT',
		display: 'text',
		className: 'item-2-class',
		persistentActions,
	},
	{
		id: 3,
		iconAndText: {
			icon: 'talend-list',
			label: 'list',
		},
		name: 'Title with icon',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row without icon',
		author: '',
		icon: 'talend-file-xls-o',
		display: 'text',
		className: 'item-3-class',
	},
	{
		id: 4,
		iconAndText: {
			icon: 'talend-list',
			label: 'list',
		},
		name: 'Title in input mode',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with title in edit mode',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-json-o',
		display: 'input',
		className: 'item-4-class',
	},
	{
		id: 5,
		iconAndText: {
			icon: 'talend-list',
			label: 'list',
		},
		name: 'Title with long long long long long long long long long long long text',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Row with a super super long text to show the ellipsis',
		author:
			'Jean-Pierre DUPONT with super super super super super super super super super super super super super super super super super super super super super super super long name, but there was not enough long text',
		icon: 'talend-file-json-o',
		className: 'item-5-class',
	},
];
for (let i = complexCollection.length; i < 100; i += 1) {
	complexCollection.push({
		id: i,
		iconAndText: {
			icon: 'talend-list',
			label: 'list',
		},
		name: `Title with icon and actions ${i}`,
		tag: 'test',
		created: 1474495200,
		modified: 1474495200,
		description: 'Simple row with icon and actions',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
		display: 'text',
		className: 'item-0-class',
		persistentActions,
		titleActions,
	});
}

const simpleCollection = [];
for (let i = 0; i < 100; i += 1) {
	simpleCollection.push({
		id: i,
		iconAndText: {
			icon: 'talend-list',
			label: 'list',
		},
		iconAndTextWithGetter: 'icon from getter',
		name: `Title with icon and actions ${i}`,
		isValid: [true, false, undefined][random(2)],
		tag: 'test',
		created: 1474495200,
		modified: 1474495200,
		description: `Simple row with icon and actions${[' (crème brûlée)', ''][random(1)]}`,
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
		display: 'text',
		className: 'item-0-class',
		persistentActions,
		titleActions,
	});
}

export { simpleCollection, complexCollection };
