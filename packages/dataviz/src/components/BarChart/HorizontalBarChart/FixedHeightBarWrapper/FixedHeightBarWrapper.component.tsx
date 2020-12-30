import React, { useMemo } from 'react';
import { ChartEntry } from '../../barChart.types';

const BAR_GAP = 5;
const BAR_HEIGHT = 20;
const X_AXIS_TICKS_HEIGHT = 40;

/**
 * Recharts fills available height.
 * To display fixed height bar and gaps, we'll have to guess:
 * - min height fitting the provided data
 * - max number of bar fitting into the provided height
 */
interface FixedBarSizeWrapperProps {
	width?: number;
	height?: number;
	children: JSX.Element;
	data: ChartEntry<string>[];
}

function FixedBarSizeWrapper({ width, height = 0, children, data }: FixedBarSizeWrapperProps) {
	const neededHeight = Math.min(height, X_AXIS_TICKS_HEIGHT + data.length * (BAR_GAP + BAR_HEIGHT));

	const fittingData = useMemo(
		() => data.slice(0, Math.floor((height - X_AXIS_TICKS_HEIGHT) / (BAR_GAP + BAR_HEIGHT))),
		[data, height],
	);

	return React.cloneElement(children, {
		data: fittingData,
		width,
		height: neededHeight,
	});
}

export default FixedBarSizeWrapper;
