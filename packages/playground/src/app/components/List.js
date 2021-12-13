/* eslint-disable no-console */

import React from 'react';
import { List, Layout, SubHeaderBar } from '@talend/react-components';
import { SidePanel, HeaderBar } from '@talend/react-containers';

const props = {
	id: 'talend',
	displayMode: 'table',
	list: {
		columns: [
			{ key: 'id', label: 'Id', order: 1 },
			{ key: 'name', label: 'Name', order: 2 },
			{ key: 'author', label: 'Author', order: 3 },
			{ key: 'created', label: 'Created', order: 6 },
			{
				key: 'modified',
				label: 'Modified',
				order: 4,
				header: 'icon',
				data: { iconName: 'talend-scheduler' },
			},
			{ key: 'icon', label: 'Icon', hidden: true, order: 5 },
		],
		items: [
			{
				id: 0,
				name: 'Title with actions',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				icon: 'talend-file-s3-o',
				display: 'text',
				className: 'item-0-class',
			},
			{
				id: 1,
				name: 'Title with a lot of actions',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-1-class',
			},
			{
				id: 2,
				name: 'Title with super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super long title oh yeah',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-1-class',
			},
			{
				id: 3,
				name: 'Title in input mode',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				icon: 'talend-file-json-o',
				display: 'input',
				className: 'item-2-class',
			},
			{
				id: 4,
				name: 'Super long title to trigger overflow on tile rendering',
				created: '2016-09-22',
				modified: '2016-09-22',
				author:
					'Jean-Pierre DUPONT with super super super super super super super super super super super super super super super super super super super super super super super long name, but there was not enough long text',
				className: 'item-3-class',
			},
		],
		titleProps: {
			key: 'name',
			iconKey: 'icon',
			displayModeKey: 'display',
			onClick: () => console.log('onClick'),
			onEditCancel: () => console.log('onEditCancel'),
			onEditSubmit: () => console.log('onEditSubmit'),
		},
		itemProps: {
			classNameKey: 'className',
		},
	},
	toolbar: {
		actionBar: {
			actions: {
				left: [],
			},
		},
		display: {
			onChange: () => console.log('display.onChange'),
		},
		sort: {
			field: 'name',
			onChange: () => console.log('sort.onChange'),
			options: [
				{ id: 'id', name: 'Id' },
				{ id: 'name', name: 'Name With Multiple Words' },
			],
		},
	},
};

export function LeaguesList() {
	return (
		<Layout mode="TwoColumns" one={<SidePanel />} header={<HeaderBar />}>
			<SubHeaderBar
				title="List"
				onGoBack={() => {
					window.location = '/';
				}}
			/>
			<List displayMode="table" {...props} />
		</Layout>
	);
}

LeaguesList.displayName = 'LeaguesList';
