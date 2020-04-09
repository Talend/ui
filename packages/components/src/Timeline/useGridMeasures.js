import { useMemo } from 'react';
import { SCALE_MODES, SCALE_BASE_MULTIPLIERS } from './useScale';

const DEFAULT_UNIT_WIDTH = 5; // rem

const DEFAULT_HEIGHT = 3; // rem
const DEFAULT_DATA_HEIGHT = 2; //rem
const DEFAULT_MIN_DATA_WIDTH = 0.3; //rem

const headerHeight = DEFAULT_HEIGHT * 2;
const headerHeightUnit = `${headerHeight}rem`;
const rowHeight = DEFAULT_HEIGHT;
const rowHeightUnit = `${rowHeight}rem`;
const dataHeight = DEFAULT_DATA_HEIGHT;
const dataHeightUnit = `${dataHeight}rem`;
const dataTop = (rowHeight - dataHeight) / 2;

export default function useGridMeasures({ data, zoom, scale }) {
	return useMemo(() => {
		const unitWidth = DEFAULT_UNIT_WIDTH * zoom * SCALE_BASE_MULTIPLIERS[scale.scaleMode];
		console.log(DEFAULT_UNIT_WIDTH, zoom, SCALE_BASE_MULTIPLIERS[scale.scaleMode], scale.scaleMode);
		const timeUnitWidth = unitWidth;
		const timeUnitWidthUnit = `${unitWidth}rem`;
		const remPerMs = unitWidth / scale.stepMs;

		const totalDataLevels = data.reduce((accu, group) => accu + 1 + group.maxLevel, 0);
		const totalHeight = totalDataLevels * DEFAULT_HEIGHT;
		const totalHeightUnit = `${totalHeight}rem`;
		const totalWidth = unitWidth * scale.intervals.timeUnits.length;
		const totalWidthUnit = `${totalWidth}rem`;

		return {
			remPerMs,

			header: {
				height: headerHeight,
				heightUnit: headerHeightUnit,
			},
			row: {
				height: rowHeight,
				heightUnit: rowHeightUnit,
			},
			timeUnit: {
				width: timeUnitWidth,
				widthUnit: timeUnitWidthUnit,
			},
			data: {
				top: dataTop,
				height: dataHeight,
				heightUnit: dataHeightUnit,
				minWidth: DEFAULT_MIN_DATA_WIDTH,
				getTopUnit: (level) => `${dataTop + level * (dataHeight + dataTop)}rem`,
				getWidthUnit: (ms) => `${Math.max(ms * remPerMs, DEFAULT_MIN_DATA_WIDTH)}rem`,
				getLeftUnit: (msFromDayStart) => `${msFromDayStart * remPerMs}rem`,
			},
			total: {
				levels: totalDataLevels,
				height: totalHeight,
				heightUnit: totalHeightUnit,
				width: totalWidth,
				widthUnit: totalWidthUnit,
			},
		};
	}, [data, zoom, scale]);
}
