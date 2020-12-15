import React, { useEffect, useState } from 'react';
import VerticalBarChart, {
	VerticalBarChartEntry,
} from '../../BarChart/VerticalBarChart/VerticalBarChart.component';
import styles from './VerticalChartFilter.component.scss';
import RangeFilter from '../../RangeFilter/RangeFilter.component';
import TooltipContent from '../../TooltipContent/TooltipContent.component';
import { getVerticalBarChartTooltip } from '../../BarChart/barChart.tooltip';
import { DataType, Range } from '../../../types';

export interface VerticalChartFilterProps {
	data: VerticalBarChartEntry[];
	activeRange?: Range;
	rangeLimits: Range;
	dataType: DataType;
	onBarClick: (event: MouseEvent, entry: VerticalBarChartEntry) => void;
	onRangeChange: (value: Range) => void;
}

function VerticalChartFilter({
	activeRange,
	rangeLimits,
	data,
	onBarClick,
	onRangeChange,
	dataType,
}: VerticalChartFilterProps): JSX.Element {
	const [sliderValue, setSliderValue] = useState<Range>(activeRange || rangeLimits);

	useEffect(() => {
		if (activeRange) {
			setSliderValue(activeRange);
		}
	}, [activeRange]);

	function isInActiveRange(entry: VerticalBarChartEntry) {
		// Check if bar is inside range, and handle bar min/max outside of rangelimits
		return (
			sliderValue.min <= Math.max(rangeLimits.min, entry.key.min) &&
			Math.min(rangeLimits.max, entry.key.max) <= sliderValue.max
		);
	}

	return (
		<div className={styles['vertical-chart-panel']}>
			<div className={styles['vertical-chart-panel__chart-container']}>
				<VerticalBarChart
					dataType={dataType}
					data={data.map(entry => ({
						...entry,
						filteredValue: entry.filteredValue && isInActiveRange(entry) ? entry.filteredValue : 0,
					}))}
					onBarClick={onBarClick}
					getTooltipContent={(entry: VerticalBarChartEntry) => (
						<TooltipContent entries={getVerticalBarChartTooltip(entry)} />
					)}
				/>
			</div>
			{rangeLimits.min !== rangeLimits.max && (
				<div className={styles['vertical-chart-panel__slider-container']}>
					<RangeFilter
						range={sliderValue}
						dataType={dataType}
						limits={rangeLimits}
						onSliderChange={setSliderValue}
						onAfterChange={range => {
							onRangeChange(range);
						}}
					/>
				</div>
			)}
		</div>
	);
}

export default VerticalChartFilter;
