/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Action from '../Actions/Action';
import ActionIconToggle from '../Actions/ActionIconToggle';
import { InputDateTimePicker } from '../DateTimePickers';
import IconsProvider from '../IconsProvider';
import GridLayout from '.';

export const customSkeletonConf = [
	{ key: 'skel1', 'data-grid': { w: 2, h: 2, x: 0, y: 0, i: 'skel1' } },
];

function TdsTileContent({ id }) {
	const { displayMode = 'chart', setDisplayMode } = GridLayout.Tile.useTileContext();

	const submitAction = {
		label: 'Click me',
		onClick: () => {
			setDisplayMode('chart');
		},
	};

	switch (displayMode) {
		case 'chart':
			return (
				<React.Fragment>
					<div>
						'my chart'
						<InputDateTimePicker
							id={id}
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
						/>
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
	const { displayMode, setDisplayMode } = GridLayout.Tile.useTileContext();

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
			<ActionIconToggle {...addItemAction} />
			<ActionIconToggle {...filterAction} />
		</div>
	);
}

function ChartTile({ tile, id }) {
	// tile.header.actions construct the action depending of the tile header props

	return (
		<GridLayout.Tile.Container>
			{tile.header ? (
				<GridLayout.Tile.Header>
					{tile.header.label}
					<ViewSelector />
				</GridLayout.Tile.Header>
			) : null}
			<GridLayout.Tile.Body>
				<TdsTileContent id={id} />
			</GridLayout.Tile.Body>
		</GridLayout.Tile.Container>
	);
}

function TileWithAction({ tile }) {
	// tile.header.actions construct the action depending of the tile header props

	return (
		<GridLayout.Tile.Container>
			<GridLayout.Tile.Header>{tile.header.label}</GridLayout.Tile.Header>
			<GridLayout.Tile.Body>
				Quisque a gravida velit. Aenean molestie quam sed arcu fermentum semper. Curabitur et ligula
				viverra, hendrerit urna ac, hendrerit urna. Sed ornare urna justo, nec tincidunt ipsum
				ultrices vitae. Morbi vel ligula orci. Suspendisse condimentum porttitor tempor. Sed eu leo
				nunc.
			</GridLayout.Tile.Body>
			<GridLayout.Tile.Footer>
				<Action label="Submit" />
			</GridLayout.Tile.Footer>
		</GridLayout.Tile.Container>
	);
}

const tiles = [
	{
		header: {
			label: "My tile's title",
		},
		key: 'firstTile',
		'data-grid': { w: 2, h: 2, x: 0, y: 0, i: 'firstTile' },
	},
	{
		header: {
			label: "My second tile's title",
		},
		key: 'secondTile',
		'data-grid': { w: 2, h: 2, x: 2, y: 0, i: 'secondTile' },
	},
	{
		key: 'thirdTile',
		'data-grid': { w: 12, h: 2, x: 0, y: 2, i: 'thirdTile' },
	},
	{
		header: {
			label: "My fourth tile's title",
		},
		key: 'fourthTile',
		'data-grid': { w: 2, h: 2, x: 4, y: 2, i: 'fourthTile' },
	},
	{
		header: {
			label: "My Fifth tile's title",
		},
		key: 'fifthTile',
		'data-grid': { w: 4, h: 2, x: 4, y: 2, i: 'fifthTile' },
	},
	{
		header: {
			label: "My Sixth tile's title",
		},
		key: 'sixthTile',
		'data-grid': { w: 4, h: 2, x: 4, y: 2, i: 'sixthTile' },
	},
];

function GridContainer({ isLoading = false, skeletonConfiguration, isResizable = true, ...rest }) {
	return (
		<div className="App">
			<GridLayout
				isLoading={isLoading}
				isResizable={isResizable}
				skeletonConfiguration={skeletonConfiguration}
				{...rest}
			>
				{tiles.map(tile => (
					<div key={tile.key} data-grid={tile['data-grid']}>
						<ChartTile tile={tile} id={tile.key} />
					</div>
				))}

				<div key="tile-with-footer" data-grid={{ w: 4, h: 2, x: 4, y: 2, i: 'sixthTile' }}>
					<TileWithAction
						tile={{
							header: {
								label: 'This is a tile with a submit action',
							},
							key: 'actionTile',
						}}
					/>
				</div>
			</GridLayout>
		</div>
	);
}

storiesOf('Layout/Dashboard', module)
	.addDecorator(story => (
		<div>
			<IconsProvider bundles={[`${location.origin}${location.pathname}all.svg`]} />
			{story()}
		</div>
	))
	.add('default', () => <GridContainer />)
	.add('not draggable', () => <GridContainer isDraggable={false} />)
	.add('not resizable', () => <GridContainer isResizable={false} />)
	.add('neither draggable nor resizable', () => (
		<GridContainer isDraggable={false} isResizable={false} />
	))
	.add('isLoading', () => <GridContainer isLoading />)
	.add('isLoading with custom grid', () => (
		<GridContainer isLoading skeletonConfiguration={customSkeletonConf} />
	));
