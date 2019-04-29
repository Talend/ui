import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import theme from './Grid.scss';
import Tile from './Tile/Tile.component';
const ResponsiveGridLayout = WidthProvider(Responsive);
const MARGIN = 20;

const cols = {
	xs: 2,
	s: 4,
	m: 6,
	l: 10
};

const breakpoints = {
	xs: 479,
	s: 768,
	m: 1024,
	l: 1366,
};

function onLayoutChange(layoutChangeCallback) {
	return layout => {
		if (layoutChangeCallback) {
			layoutChangeCallback(layout);
		}
	};
}

function onBreakpointChange(onBreakpointChangeCallback) {
	return (breakpoint, cols) => {
		console.log(cols);
		if (onBreakpointChangeCallback) {
			onBreakpointChangeCallback(breakpoint, cols);
		}
	};
}

function Grid({ children, layoutChangeCallback, onBreakpointChangeCallback }) {
	return (
		<ResponsiveGridLayout
			className="layout"
			onLayoutChange={onLayoutChange(layoutChangeCallback)}
			onBreakpointChange={onBreakpointChange(onBreakpointChangeCallback)}
			breakpoints={breakpoints}
			cols={cols}
			measureBeforeMount={false}
			margin={[MARGIN, MARGIN]}
			compactType="vertical"
			verticalCompact={false}
			preventCollision={true}
		>
			{children}
		</ResponsiveGridLayout>
	);
}

Grid.propTypes = {
	tiles: PropTypes.arrayOf(PropTypes.shape(Tile.propTypes)).required,
	layoutChangeCallback: PropTypes.func,
	onBreakpointChangeCallback: PropTypes.func,
};

export default Grid;
