import { useMemo } from 'react';

const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const DEFAULT_DAY_LENGTH = 150; // rem
const DEFAULT_HEIGHT = 4; // rem
const DEFAULT_DATA_HEIGHT = 3; //rem

const headerHeight = DEFAULT_HEIGHT * 2;
const headerHeightUnit = `${headerHeight}rem`;
const rowHeight = DEFAULT_HEIGHT;
const rowHeightUnit = `${rowHeight}rem`;
const dataHeight = DEFAULT_DATA_HEIGHT;
const dataHeightUnit = `${dataHeight}rem`;
const dataTop = (rowHeight - dataHeight) / 2;

export default function useGridMeasures({ data, timeRange, zoom }) {
	return useMemo(() => {
		const [startTimestamp, endTimestamp] = timeRange;
		const dayWidth = DEFAULT_DAY_LENGTH * zoom;
		const dayWidthUnit = `${dayWidth}rem`;
		const hourWidth = dayWidth / 24;
		const hourWidthUnit = `${hourWidth}rem`;
		const remPerMs = dayWidth / MILLISECONDS_IN_DAY;

		const totalDataLevels = data.reduce((accu, group) => accu + 1 + group.maxLevel, 0);
		const totalHeight = totalDataLevels * DEFAULT_HEIGHT + headerHeight;
		const totalHeightUnit = `${totalHeight}rem`;
		const totalWidth = (endTimestamp - startTimestamp) * remPerMs;
		const totalWidthUnit = `${totalWidth}rem`;

		return {
			remPerMs,

			header: {
				height: headerHeight,
				heightUnit: headerHeightUnit,
				day: {
					width: dayWidth,
					widthUnit: dayWidthUnit,
				},
				hour: {
					width: hourWidth,
					widthUnit: hourWidthUnit,
				},
			},
			row: {
				height: rowHeight,
				heightUnit: rowHeightUnit,
			},
			data: {
				top: dataTop,
				height: dataHeight,
				heightUnit: dataHeightUnit,
				minWidth: 0.3,
			},
			total: {
				levels: totalDataLevels,
				height: totalHeight,
				heightUnit: totalHeightUnit,
				width: totalWidth,
				widthUnit: totalWidthUnit,
			},
		};
	}, [data, timeRange, zoom]);
}
