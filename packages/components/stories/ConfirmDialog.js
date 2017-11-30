import React from 'react';
import { storiesOf, action } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';

import { List, ConfirmDialog, IconsProvider } from '../src/index';

const icons = {
	'talend-file-csv-o': talendIcons['talend-file-csv-o'],
	'talend-badge': talendIcons['talend-badge'],
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-chevron-end': talendIcons['talend-chevron-end'],
	'talend-chevron-left': talendIcons['talend-chevron-left'],
	'talend-cross': talendIcons['talend-cross'],
	'talend-expanded': talendIcons['talend-expanded'],
	'talend-file': talendIcons['talend-file'],
	'talend-file-json-o': talendIcons['talend-file-json-o'],
	'talend-file-xls-o': talendIcons['talend-file-xls-o'],
	'talend-folder': talendIcons['talend-folder'],
	'talend-icons': talendIcons['talend-icons'],
	'talend-pencil': talendIcons['talend-pencil'],
	'talend-plus': talendIcons['talend-plus'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
	'talend-search': talendIcons['talend-search'],
	'talend-star': talendIcons['talend-star'],
	'talend-table': talendIcons['talend-table'],
	'talend-tiles': talendIcons['talend-tiles'],
	'talend-trash': talendIcons['talend-trash'],
};

const defaultProps = {
	header: 'Hello world',
	show: true,
	description: {
		text: 'Owner',
		highlight: 'John Doe',
	},
	icon: 'talend-file-csv-o',
	validateAction: {
		label: 'OK',
		onClick: action('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: action('cancel'),
	},
};

const propsWithoutHeader = {
	show: true,
	validateAction: {
		label: 'OK',
		onClick: action('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: action('cancel'),
	},
};

const smallProps = {
	show: true,
	header: 'Hello world',
	size: 'small',
	validateAction: {
		label: 'OK',
		onClick: action('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: action('cancel'),
	},
};
const largeProps = {
	show: true,
	header: 'Hello world',
	size: 'large',
	validateAction: {
		label: 'OK',
		onClick: action('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: action('cancel'),
	},
};

const withProgressBarProps = {
	show: true,
	header: 'Hello world',
	size: 'large',
	validateAction: {
		label: 'OK',
		onClick: action('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: action('cancel'),
	},
	progressValue: 66,
};

const children = <div>BODY content. You can put what ever you want here</div>;

storiesOf('ConfirmDialog', module)
	.addWithInfo('default', () => (
		<div>
			<h1>Dialog</h1>
			<IconsProvider defaultIcons={icons} />
			<ConfirmDialog {...defaultProps}>{children}</ConfirmDialog>
		</div>
	))
	.addWithInfo('without header', () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...propsWithoutHeader}>{children}</ConfirmDialog>
		</div>
	))
	.addWithInfo('small', () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...smallProps}>{children}</ConfirmDialog>
		</div>
	))
	.addWithInfo('large', () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...largeProps}>{children}</ConfirmDialog>
		</div>
	))
	.addWithInfo('with progress bar', () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...withProgressBarProps}>{children}</ConfirmDialog>
		</div>
	))
	.addWithInfo('with lots of content', () => {
		const rows = [];
		for (let index = 0; index < 50; index++) {
			rows.push(<p key={index}>The content dictate the height</p>);
		}
		return (
			<div>
				<h1>Dialog</h1>
				<ConfirmDialog {...withProgressBarProps}>{rows}</ConfirmDialog>
			</div>
		);
	})
	.addWithInfo('overflow set to false', () => {
		const rows = [];
		for (let index = 0; index < 50; index++) {
			rows.push(<p key={index}>The content dictate the height</p>);
		}
		return (
			<div>
				<h1>Dialog</h1>
				<ConfirmDialog bodyOverflow={false} {...defaultProps}>
					{rows}
				</ConfirmDialog>
			</div>
		);
	})
	.addWithInfo('user manage overflow', () => {
		const actions = [
			{
				label: 'edit',
				icon: 'talend-pencil',
				onClick: action('onEdit'),
			},
			{
				label: 'delete',
				icon: 'talend-trash',
				onClick: action('onDelete'),
			},
			{
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
				pullRight: true,
			},
		];

		const items = [];
		for (let index = 0; index < 10; index++) {
			items.push({
				id: index,
				name: 'Title with actions',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				actions,
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-0-class',
			});
		}

		const props = {
			id: 'talend',
			displayMode: 'table',
			list: {
				columns: [
					{ key: 'id', label: 'Id' },
					{ key: 'name', label: 'Name' },
					{ key: 'author', label: 'Author' },
					{ key: 'created', label: 'Created' },
					{ key: 'modified', label: 'Modified' },
				],
				items,
				titleProps: {
					key: 'name',
					iconKey: 'icon',
					displayModeKey: 'display',
					onClick: action('onClick'),
					onEditCancel: action('onEditCancel'),
					onEditSubmit: action('onEditSubmit'),
				},
				itemProps: {
					classNameKey: 'className',
					onSelect: action('onSelect'),
					onToggle: action('onToggle'),
					onToggleAll: action('onToggleAll'),
				},
			},
			toolbar: {
				actionBar: {
					actions: {
						left: [
							{
								id: 'add',
								label: 'Add Folder',
								bsStyle: 'primary',
								icon: 'talend-plus-circle',
								onClick: action('add.onClick'),
							},
							{
								displayMode: 'splitDropdown',
								label: 'Add File',
								icon: 'talend-folder',
								onClick: action('onAdd'),
								items: [
									{
										label: 'From Local',
										onClick: action('From Local click'),
									},
									{
										label: 'From Remote',
										onClick: action('From Remote click'),
									},
								],
								emptyDropdownLabel: 'No option',
							},
						],
					},
				},
				display: {
					onChange: action('display.onChange'),
				},
				sort: {
					field: 'name',
					onChange: action('sort.onChange'),
					options: [{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }],
				},
				pagination: {
					itemsPerPage: 5,
					totalResults: 10,
					onChange: action('pagination.onChange'),
				},
				filter: {
					docked: true,
					onBlur: action('filter.onBlur'),
					onFocus: action('filter.onFocus'),
					onFilter: action('filter.onFilter'),
					onToggle: action('filter.onToggle'),
					placeholder: 'search for something',
				},
			},
		};
		const tprops = {
			...props,
		};
		return (
			<div>
				<h1>Dialog</h1>
				<IconsProvider defaultIcons={icons} />
				<ConfirmDialog bodyOverflow={false} {...largeProps}>
					<List {...tprops} />
				</ConfirmDialog>
			</div>
		);
	})
	.addWithInfo('with secondary actions', () => {
		const propsWithMoreActions = {
			...defaultProps,
			header: 'Delete elements',
			validateAction: {
				label: 'Delete',
				onClick: action('ok'),
				bsStyle: 'danger',
			},
			secondaryActions: [
				{
					label: 'Show info',
					onClick: action('info'),
					bsStyle: 'info',
				},
			],
		};
		return (
			<div>
				<h1>Dialog</h1>
				<ConfirmDialog {...propsWithMoreActions}>{children}</ConfirmDialog>
			</div>
		);
	});
