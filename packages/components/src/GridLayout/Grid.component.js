import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
// eslint-disable-next-line no-unused-vars
import theme from './Grid.scss';

// eslint-disable-next-line new-cap
const ResponsiveGridLayout = WidthProvider(Responsive);
const MARGIN = 20;

const columns = {
	xs: 2,
	s: 4,
	m: 6,
	l: 10,
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
		if (onBreakpointChangeCallback) {
			onBreakpointChangeCallback(breakpoint, cols);
		}
	};
}

function Grid({ children, isResizable, layoutChangeCallback, onBreakpointChangeCallback }) {
	return (
		<ResponsiveGridLayout
			className="layout"
			onLayoutChange={onLayoutChange(layoutChangeCallback)}
			onBreakpointChange={onBreakpointChange(onBreakpointChangeCallback)}
			breakpoints={breakpoints}
			cols={columns}
			measureBeforeMount={false}
			margin={[MARGIN, MARGIN]}
			compactType="vertical"
			verticalCompact={false}
			isResizable={isResizable}
			preventCollision
		>
			{children}
		</ResponsiveGridLayout>
	);
}

Grid.propTypes = {
	children: PropTypes.node,
	layoutChangeCallback: PropTypes.func,
	onBreakpointChangeCallback: PropTypes.func,
};

export default Grid;
