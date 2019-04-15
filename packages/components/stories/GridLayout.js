import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import uuid from 'uuid';
import talendIcons from '@talend/icons/dist/react';

import { GridLayout, IconsProvider } from '../src/';
import Tile from '../src/GridLayout/Tile/index';
import ResourcePicker from '../src/ResourcePicker';
import Action from '../src/Actions/Action';

const collection = [
	{
		id: 0,
		name: 'Title with few actions',
		icon: 'talend-file-xls-o',
	},
	{
		id: 1,
		name: 'Title with lot of actions',
		icon: 'talend-file-xls-o',
	},
	{
		id: 2,
		name: 'Title with persistant actions',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
		flags: ['FAVORITE'],
	},
	{
		id: 3,
		name: 'Title with icon',
		modified: '2016-09-22',
		author: 'Third Author',
		icon: 'talend-file-xls-o',
		flags: ['CERTIFIED'],
	},
	{
		id: 4,
		name: 'Title with icon',
		modified: '2016-09-22',
		author: 'Third Author',
		icon: 'talend-file-xls-o',
		flags: ['CERTIFIED'],
	},
	{
		id: 5,
		name: 'Title with icon',
		modified: '2016-09-22',
		author: 'Third Author',
		icon: 'talend-file-xls-o',
		flags: ['CERTIFIED'],
	},
];

const resourcePickerProps = {
	collection,
};

const icons = {
	'talend-filter': talendIcons['talend-filter'],
	'talend-user-circle': talendIcons['talend-user-circle'],
	'talend-file-xls-o': talendIcons['talend-file-xls-o'],
};

function TileContentComponent({ label }) {
	return (<span>{label}</span>);
}

function renderBody(tab, filterProps) {
	switch (tab) {
		case 'chart':
			return <div>'my chart'</div>;
		case 'filter':
			return <div>'my filter'</div>;
		case 'filterUser': {
			return (
				<ResourcePicker { ...filterProps } />
			);
		}
		default:
			return null;
	}
}

function renderFooter(tab) {
	const myAction = {
		label: 'Click me',
		icon: 'talend-dataprep',
		'data-feature': 'action',
		onClick: action('You clicked me'),
	};
	switch (tab) {
	case 'filter': {
		return  <Action { ...myAction} />;
	}
	case 'chart':
	default:
		return null;
	}
}

function ChartTile({ tile }) {
	const [tab, setTab] = useState('chart');
	const [userFilter, setUserFilter] = useState([]);
	// tile.header.actions construct the action depending of the tile header props
	const addItemAction = {
		label: 'Add item',
		icon: 'talend-user-circle',
		id: 'filter-user',
		onClick: () => {
			setTab('filterUser');
		},
	};

	const filterAction = {
		label: 'filter item',
		icon: 'talend-filter',
		id: 'filter',
		onClick: () => {
			setTab('filter');
		},
	};

	const rightActions = [addItemAction, filterAction];
	const filterProps = {
		...tile.filterProps,
		onRowClick: (event, rowData) => {
			if (userFilter.find(user => user.id === rowData.id)) {
				// removing it from selection
				setUserFilter(userFilter.filter(user => user.id !== rowData.id));
			} else {
				// adding it to selection
				setUserFilter(userFilter.concat([rowData]))
			}
		},
		isSelected: (row) => {
			return userFilter.find(user => user.id === row.id);
		},
	};
	return (
		<Tile.Container>
			{
				tile.header ? (
					<Tile.Header>
						<Tile.HeaderActions left></Tile.HeaderActions>
							{ tile.header.label }
						<Tile.HeaderActions right actions={rightActions}></Tile.HeaderActions>
					</Tile.Header> )
					: null
			}
			<Tile.Body>
				{ renderBody(tab, filterProps) }
			</Tile.Body>
			<Tile.Footer>
				{ renderFooter(tab) }
			</Tile.Footer>
		</Tile.Container>
	);
}

function GridContainer() {
	const id = uuid.v4();
	const [tab, setTab] = useState('chart');
	const [tiles, setTiles] = useState([
		{
			content: { component: TileContentComponent },
			contentProps: { label: 'A tile content' },
			header: {
				label: 'My tile\'s title',
				// rightActions: [addItemAction, filterAction],
			},
			key: 'firstTile',
			'data-grid': {w: 2, h: 2, x: 0, y: Infinity, i: 'firstTile'},
			filterMode: true,
			filterProps: resourcePickerProps
		},
		{
			content: { component: TileContentComponent },
			contentProps: { label: 'Second tile content' },
			header: {
				label: 'My second tile\'s title',
				// rightActions: [addItemAction, filterAction],
			},
			key: 'secondTile',
			'data-grid': {w: 2, h: 2, x: 0, y: Infinity, i: 'secondTile'},
		},
		{
			content: { component: TileContentComponent },
			contentProps: { label: 'Third tile content headerless' },
			key: 'thirdTile',
			'data-grid': {w: 3, h: 2, x: 0, y: Infinity, i: 'thirdTile'},
		},
		{
			content: { component: TileContentComponent },
			contentProps: { label: 'Fourth tile content' },
			header: {
				label: 'My fourth tile\'s title',
				// rightActions: [addItemAction, filterAction],
			},
			key: 'fourthTile',
			'data-grid': {w: 2, h: 2, x: 0, y: Infinity, i: 'fourthTile'},
		},
	]);
	const [cols, setCols] = useState(12);

	function layoutChangeCallback(newlayouts) {
	}

	function onBreakpointChangeCallback(breakpoint, cols) {}

	return (
		<div className="App">
			<GridLayout
				layoutChangeCallback={layoutChangeCallback}
	            onBreakpointChangeCallback={onBreakpointChangeCallback}>
				{ tiles.map(tile => (
					<div key={tile.key} data-grid={tile['data-grid']}>
						<ChartTile tile={tile} tab={tab}/>
					</div>)
				)}
			</GridLayout>
		</div>
	);
}


storiesOf('GridLayout', module)
	.addDecorator(story => (
		<div>
			<IconsProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.add('default', () => <GridContainer />);
