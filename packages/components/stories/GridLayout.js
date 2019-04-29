import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';

import ActionIconToggle from '../src/Actions/ActionIconToggle';
import { GridLayout, IconsProvider } from '../src/';
import Tile from '../src/GridLayout/Tile/index';
import Action from '../src/Actions/Action';
import { useTileContext } from '../src/GridLayout/Tile/context';

const icons = {
	'talend-filter': talendIcons['talend-filter'],
	'talend-user-circle': talendIcons['talend-user-circle'],
	'talend-file-xls-o': talendIcons['talend-file-xls-o'],
};

function TdsTileContent() {
	const { displayMode= 'chart', setDisplayMode } = useTileContext();

	const submitAction = {
		label: 'Click me',
		onClick: () => {
			setDisplayMode('chart');
		}
	};

	switch (displayMode) {
		case 'chart':
			return (
				<React.Fragment>
					<div>
						'my chart'
					</div>
				</React.Fragment>
			);
		case 'filter':
			return (
				<React.Fragment>
					<div>my filter</div>
					<Action {...submitAction} />
				</React.Fragment>
			);
		case 'filterUser': {
			return (
				<React.Fragment>
					<div>'user list'</div>
					<Action {...submitAction} />
				</React.Fragment>
			);
		}
		default:
			return null;
	}
}

function ViewSelector() {
	const { displayMode, setDisplayMode } = useTileContext();

	const addItemAction = {
		label: 'Add item',
		icon: 'talend-user-circle',
		id: 'filter-user',
		onClick: () => {
			setDisplayMode('filterUser');
		},
		active: displayMode === 'filterUser',
	};

	const filterAction = {
		label: 'filter item',
		icon: 'talend-filter',
		id: 'filter',
		onClick: () => {
			setDisplayMode('filter');
		},
		active: displayMode === 'filter',
	};

	return (
		<div style={{ display: 'flex' }}>
			{
				[addItemAction, filterAction].map(action => (
					<ActionIconToggle {...action} />
				))
			}
		</div>
	);
}

function ChartTile({ tile }) {
	// tile.header.actions construct the action depending of the tile header props

	return (
		<Tile.Container>
			{
				tile.header ? (
					<Tile.Header>
						{ tile.header.label }
						<ViewSelector></ViewSelector>
					</Tile.Header> )
					: null
			}
			<Tile.Body>
				<TdsTileContent />
			</Tile.Body>
		</Tile.Container>
	);
}

function GridContainer() {
	const [tiles, setTiles] = useState([
		{
			header: {
				label: 'My tile\'s title',
			},
			key: 'firstTile',
			'data-grid': {w: 2, h: 2, x: 0, y: 0, i: 'firstTile'},
		},
		{
			header: {
				label: 'My second tile\'s title',
			},
			key: 'secondTile',
			'data-grid': {w: 2, h: 2, x: 2, y: 0, i: 'secondTile'},
		},
		{
			key: 'thirdTile',
			'data-grid': {w: 12, h: 2, x: 0, y: 2, i: 'thirdTile'},
		},
		{
			header: {
				label: 'My fourth tile\'s title',
			},
			key: 'fourthTile',
			'data-grid': {w: 2, h: 2, x: 4, y: 2, i: 'fourthTile'},
		},
		{
			header: {
				label: 'My Fifth tile\'s title',
			},
			key: 'fifthTile',
			'data-grid': {w: 4, h: 2, x: 4, y: 2, i: 'fifthTile'},
		},
		{
			header: {
				label: 'My Sixth tile\'s title',
			},
			key: 'sixthTile',
			'data-grid': {w: 4, h: 2, x: 4, y: 2, i: 'sixthTile'},
		},
	]);

	function layoutChangeCallback(newlayouts) {}

	function onBreakpointChangeCallback(breakpoint, cols) {}

	return (
		<div className="App">
			<GridLayout
				layoutChangeCallback={layoutChangeCallback}
	            onBreakpointChangeCallback={onBreakpointChangeCallback}>
				{ tiles.map(tile => (
					<div key={tile.key} data-grid={tile['data-grid']}>
						<ChartTile tile={tile} />
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
