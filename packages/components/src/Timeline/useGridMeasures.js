import { useMemo } from 'react';
import { SCALE_MODES } from './useScale';

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

function getUnitWidth(scaleMode, zoom) {
	// width for hour and 5minutes scale
	let unitWidth = DEFAULT_UNIT_WIDTH * zoom;

	// Between 3 and 5 days mode
	// the defaut mode is 1 hour steps
	// if the zoom switch the scale to 30-min or 15-min, to avoid jump between 1h to the new unit, we divide the 1h width
	// result is that in 1h scale, we zoom, we display the new scale in a smooth way
	if (scaleMode === SCALE_MODES.THREE_HOURS) {
		unitWidth *= 3;
	}
	if (scaleMode === SCALE_MODES.TWO_HOURS) {
		unitWidth *= 2;
	}
	if (scaleMode === SCALE_MODES.HALF_HOUR) {
		unitWidth /= 2;
	}
	if (scaleMode === SCALE_MODES.QUARTER_HOUR) {
		unitWidth /= 4;
	}

	// Less-than-a-day Mode
	// the defaut mode is 5-min steps
	// if the zoom switch the scale to 2-min or 1-min, to avoid jump between 5min to the new unit, we divide the 5-min width
	// result is that in 5min scale, we zoom, we display the new scale in a smooth way
	if (scaleMode === SCALE_MODES.TEN_MINUTES) {
		unitWidth *= 2;
	}
	if (scaleMode === SCALE_MODES.TWO_MINUTES) {
		unitWidth /= 2.5;
	}
	if (scaleMode === SCALE_MODES.MINUTES) {
		unitWidth /= 5;
	}

	return unitWidth;
}

export default function useGridMeasures({ data, zoom, scale }) {
	return useMemo(() => {
		const unitWidth = getUnitWidth(scale.scaleMode, zoom);

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
