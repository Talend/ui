import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import theme from './Grid.scss';
import Tile from './Tile/Tile.component';
const ResponsiveGridLayout = WidthProvider(Responsive);
const MARGIN = 20;
const COLUMN_MIN_WIDTH = 190;

const thresholds= {
	xxs: 1,
	xs: 2,
	sm: 3,
	m: 4,
	l: 5,
	xl: 6,
	xxl: 8,
};

function onLayoutChange(layoutChangeCallback) {
	return (layout) => {
		layoutChangeCallback(layout)
	}
}

// We're using the cols coming back from this to calculate where to add new items.
function onBreakpointChange(onBreakpointChangeCallback) {
	return (breakpoint, cols) => {
		onBreakpointChangeCallback(breakpoint, cols);
	}
}

function Grid({ children, layoutChangeCallback, onBreakpointChangeCallback }) {
	return (
		<ResponsiveGridLayout
			className="layout"
			onLayoutChange={onLayoutChange(layoutChangeCallback)}
			onBreakpointChange={onBreakpointChange(onBreakpointChangeCallback)}
			breakpoints={Object.keys(thresholds).reduce(
				(breakpoints, breakpoint) => ({
					...breakpoints,
					[breakpoint]:
						thresholds[breakpoint] * COLUMN_MIN_WIDTH +
						thresholds[breakpoint] * MARGIN + MARGIN,
				}),
				{}
			)}
			cols={{...thresholds}}
			measureBeforeMount={false}
			margin={[MARGIN, MARGIN]}
			compactType="vertical"
			verticalCompact={false}
			preventCollision={true}>
			{ children }
		</ResponsiveGridLayout>
	);
}

Grid.propTypes = {
	tiles: PropTypes.arrayOf(PropTypes.shape(Tile.propTypes)).required,
	layoutChangeCallback: PropTypes.func,
	onBreakpointChangeCallback: PropTypes.func,
};

export default Grid;
