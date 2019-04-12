import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import uuid from 'uuid';
import talendIcons from '@talend/icons/dist/react';

import { GridLayout, IconsProvider } from '../src/';

const icons = {
	'talend-panel-opener-right': talendIcons['talend-panel-opener-right'],
	'talend-plus': talendIcons['talend-plus'],
};

const addItemAction = {
	label: 'Add item',
	icon: 'talend-plus',
	id: 'add',
	onClick: action('add.item'),
};

const openingRightAction = {
	label: 'Add item',
	icon: 'talend-panel-opener-right',
	id: 'add',
	onClick: action('open.right'),
};

function TileContentComponent({ label }) {
	return (<span>{label}</span>);
}

function GridContainer() {
	const id = uuid.v4();
	const [tiles, setTiles] = useState([
		{
			content: { component: TileContentComponent },
			contentProps: { label: 'A tile content' },
			header: {
				label: 'My tile\'s title',
				rightActions: [addItemAction, openingRightAction],
			},
			key: 'firstTile',
			'data-grid': {w: 2, h: 2, x: 0, y: Infinity, i: 'firstTile'},
		},
		{
			content: { component: TileContentComponent },
			contentProps: { label: 'Second tile content' },
			header: {
				label: 'My second tile\'s title',
				rightActions: [addItemAction, openingRightAction],
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
				rightActions: [addItemAction, openingRightAction],
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
			<GridLayout tiles={tiles}
	            layoutChangeCallback={layoutChangeCallback}
	            onBreakpointChangeCallback={onBreakpointChangeCallback}>
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
