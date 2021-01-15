import React, { useEffect, useState } from 'react';
import VerticalBarChart, {
	VerticalBarChartEntry,
} from '../../BarChart/VerticalBarChart/VerticalBarChart.component';
import styles from './VerticalChartFilter.component.scss';
import RangeFilter from '../../RangeFilter/RangeFilter.component';
import TooltipContent from '../../TooltipContent/TooltipContent.component';
import { getVerticalBarChartTooltip } from '../../BarChart/barChart.tooltip';
import { Range } from '../../../types';
import { RangeHandler } from '../../RangeFilter/handlers/range-handler.types';

export interface VerticalChartFilterProps {
	data: VerticalBarChartEntry[];
	barDataFeature?: string;
	activeRange?: Range;
	rangeLimits: Range;
	onBarClick: (event: MouseEvent, entry: VerticalBarChartEntry) => void;
	onRangeChange: (value: Range) => void;
	showXAxis?: boolean;
	rangeHandler: RangeHandler;
}

function VerticalChartFilter({
	activeRange,
	rangeLimits,
	data,
	barDataFeature,
	onBarClick,
	onRangeChange,
	rangeHandler,
	showXAxis,
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
					showXAxis={showXAxis}
					data={data.map(entry => ({
						...entry,
						filteredValue: entry.filteredValue && isInActiveRange(entry) ? entry.filteredValue : 0,
					}))}
					dataFeature={barDataFeature}
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
						limits={rangeLimits}
						onSliderChange={setSliderValue}
						onAfterChange={range => {
							onRangeChange(range);
						}}
						{...rangeHandler}
					/>
				</div>
			)}
		</div>
	);
}

export default VerticalChartFilter;
