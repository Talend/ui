import React from 'react';
import PropTypes from 'prop-types';
import 'react-grid-layout/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Tile from './Tile';
import { SKELETON_TILE_CONF } from './Tile/Skeleton/SkeletonTile.component';
import './Grid.scss';

// eslint-disable-next-line new-cap
const ResponsiveGridLayout = WidthProvider(Responsive);
const MARGIN = 20;

const columns = {
	s: 2,
	m: 4,
	l: 6,
	xl: 12,
};

const breakpoints = {
	s: 479,
	m: 768,
	l: 1024,
	xl: 1366,
};

const noOp = () => {};

function Grid({
	children,
	isResizable = false,
	onLayoutChange = noOp,
	onBreakpointChange = noOp,
	onDragStop = noOp,
	onResizeStop = noOp,
	isLoading = false,
	skeletonConfiguration,
}) {
	return (
		<ResponsiveGridLayout
			className="layout"
			onLayoutChange={onLayoutChange}
			onDragStop={onDragStop}
			onResizeStop={onResizeStop}
			onBreakpointChange={onBreakpointChange}
			breakpoints={breakpoints}
			cols={columns}
			measureBeforeMount={false}
			margin={[MARGIN, MARGIN]}
			compactType="vertical"
			verticalCompact
			isResizable={isResizable}
			useCSSTransforms={false}
		>
			{isLoading
				? (skeletonConfiguration || SKELETON_TILE_CONF).map(tile => (
						<div className={'skeleton-tile'} key={tile.key} data-grid={tile['data-grid']}>
							<Tile.Skeleton />
						</div>
				  ))
				: children}
		</ResponsiveGridLayout>
	);
}

Grid.propTypes = {
	children: PropTypes.node,
	isResizable: PropTypes.bool,
	layoutChangeCallback: PropTypes.func,
	onBreakpointChangeCallback: PropTypes.func,
	onDragStopCallback: PropTypes.func,
	onResizeStopCallback: PropTypes.func,
	isLoading: PropTypes.bool,
	skeletonConfiguration: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			'data-grid': PropTypes.shape({
				w: PropTypes.number,
				h: PropTypes.number,
				x: PropTypes.number,
				y: PropTypes.number,
				i: PropTypes.string,
			}).isRequired,
		}),
	),
};

export default Grid;
