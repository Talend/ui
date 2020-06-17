import React from 'react';
import PropTypes from 'prop-types';
import 'react-grid-layout/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';

import Tile from './Tile';
import { SKELETON_TILE_CONF } from './Tile/Skeleton/SkeletonTile.component';

import css from './Grid.scss';
import { getTheme } from '../theme';

const theme = getTheme(css);

// eslint-disable-next-line new-cap
const ResponsiveGridLayout = WidthProvider(Responsive);
const MARGIN = 20;

const DEFAULT_COLUMNS = {
	s: 2,
	m: 4,
	l: 6,
	xl: 12,
};

const DEFAULT_BREAKPOINTS = {
	s: 479,
	m: 768,
	l: 1024,
	xl: 1366,
};

const noOp = () => {};

function Grid({
	children,
	isResizable = false,
	isDraggable = true,
	onLayoutChange = noOp,
	onBreakpointChange = noOp,
	onDragStop = noOp,
	onResizeStop = noOp,
	isLoading = false,
	skeletonConfiguration,
	compactType = 'vertical',
	verticalCompact = true,
	columns = DEFAULT_COLUMNS,
	breakpoints = DEFAULT_BREAKPOINTS,
}) {
	return (
		<ResponsiveGridLayout
			className={theme('layout', {
				draggable: isDraggable,
			})}
			onLayoutChange={onLayoutChange}
			onDragStop={onDragStop}
			onResizeStop={onResizeStop}
			onBreakpointChange={onBreakpointChange}
			breakpoints={breakpoints}
			cols={columns}
			measureBeforeMount={false}
			margin={[MARGIN, MARGIN]}
			compactType={compactType}
			isResizable={isResizable}
			useCSSTransforms={false}
			verticalCompact={verticalCompact}
			isDraggable={isDraggable}
		>
			{isLoading
				? (skeletonConfiguration || SKELETON_TILE_CONF).map(tile => (
						<div className="skeleton-tile" key={tile.key} data-grid={tile['data-grid']}>
							<Tile.Skeleton />
						</div>
				  ))
				: children}
		</ResponsiveGridLayout>
	);
}

Grid.propTypes = {
	children: PropTypes.node,
	compactType: PropTypes.string,
	isResizable: PropTypes.bool,
	isDraggable: PropTypes.bool,
	onLayoutChange: PropTypes.func,
	onBreakpointChange: PropTypes.func,
	onDragStop: PropTypes.func,
	onResizeStop: PropTypes.func,
	isLoading: PropTypes.bool,
	columns: PropTypes.shape({
		s: PropTypes.number,
		m: PropTypes.number,
		l: PropTypes.number,
		xl: PropTypes.number,
	}),
	breakpoints: PropTypes.shape({
		s: PropTypes.number,
		m: PropTypes.number,
		l: PropTypes.number,
		xl: PropTypes.number,
	}),
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
	verticalCompact: PropTypes.bool,
};

export default Grid;
