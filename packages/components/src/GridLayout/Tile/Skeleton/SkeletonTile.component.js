import React from 'react';
import Skeleton from '../../../Skeleton';
import Tile from '../../Tile';

export default function SkeletonTile() {
	return (
		<Tile.Container>
			<Tile.Body>
				<Skeleton width={'100%'} height={'100%'} />
			</Tile.Body>
		</Tile.Container>
	);
}

export const SKELETON_TILE_CONF = [
	{ key: 'skel1', 'data-grid': { w: 2, h: 2, x: 0, y: 0, i: 'skel1' } },
	{ key: 'skel2', 'data-grid': { w: 2, h: 2, x: 2, y: 0, i: 'skel2' } },
	{ key: 'skel3', 'data-grid': { w: 6, h: 2, x: 4, y: 0, i: 'skel3' } },
];
