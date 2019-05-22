import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
// eslint-disable-next-line no-unused-vars
import theme from './Grid.scss';

// eslint-disable-next-line new-cap
const ResponsiveGridLayout = WidthProvider(Responsive);
const MARGIN = 20;

const columns = {
	xs: 2,
	s: 4,
	m: 6,
	l: 12,
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

function onDragStop(onDragStopCallback) {
	return (layout, oldItem, newItem, placeHolder, event) => {
		if (onDragStopCallback) {
			onDragStopCallback(layout, oldItem, newItem, placeHolder, event);
		}
	};
}

function onResizeStop(onResizeStopCallback) {
	return (layout, oldItem, newItem, placeHolder, event) => {
		if (onResizeStopCallback) {
			onResizeStopCallback(layout, oldItem, newItem, placeHolder, event);
		}
	};
}

function Grid({
	children,
	isResizable = false,
	layoutChangeCallback,
	onBreakpointChangeCallback,
	onDragStopCallback,
	onResizeStopCallback,
}) {
	return (
		<ResponsiveGridLayout
			className="layout"
			onLayoutChange={onLayoutChange(layoutChangeCallback)}
			onDragStop={onDragStop(onDragStopCallback)}
			onResizeStop={onResizeStop(onResizeStopCallback)}
			onBreakpointChange={onBreakpointChange(onBreakpointChangeCallback)}
			breakpoints={breakpoints}
			cols={columns}
			measureBeforeMount={false}
			margin={[MARGIN, MARGIN]}
			compactType="vertical"
			verticalCompact
			isResizable={isResizable}
			useCSSTransforms={false}
		>
			{children}
		</ResponsiveGridLayout>
	);
}

Grid.propTypes = {
	children: PropTypes.node,
	isResizable: PropTypes.bool,
	layoutChangeCallback: PropTypes.func,
	onBreakpointChangeCallback: PropTypes.func,
	onDragStop: PropTypes.func,
	onResizeStop: PropTypes.func,
};

export default Grid;
