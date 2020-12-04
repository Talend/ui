import React, { useEffect, useState } from 'react';
import VerticalBarChart from '../../BarChart/VerticalBarChart/VerticalBarChart.component';
import { ChartEntry, DataType, Range, VerticalBarChartEntry } from '../../BarChart/barChart.types';
import styles from './ProfilingChartPanel.component.scss';
import RangeFilter from '../../RangeFilter/RangeFilter.component';
import Tooltip from '../../Tooltip/Tooltip.component';
import { getVerticalBarChartTooltip } from '../../BarChart/barChart.tooltip';

export interface PanelProps {
	data: VerticalBarChartEntry[];
	activeRange?: Range;
	rangeLimits: Range;
	dataType: DataType;
	onBarClick: (event: MouseEvent, entry: VerticalBarChartEntry) => void;
	onRangeChange: (value: Range) => void;
}

function Panel({
	activeRange,
	rangeLimits,
	data,
	onBarClick,
	onRangeChange,
	dataType,
}: PanelProps): JSX.Element {
	const [sliderValue, setSliderValue] = useState<Range>(activeRange || rangeLimits);

	useEffect(() => {
		if (activeRange) {
			setSliderValue(activeRange);
		}
	}, [activeRange]);

	function isInActiveRange(entry: ChartEntry<Range>) {
		return sliderValue.min <= entry.key.min && entry.key.max <= sliderValue.max;
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
						<Tooltip entries={getVerticalBarChartTooltip(entry)} />
					)}
				/>
			</div>
			{rangeLimits.min !== rangeLimits.max && (
				<div className="slider-container">
					<RangeFilter
						range={sliderValue}
						dataType={dataType}
						limits={rangeLimits}
						onSliderChange={setSliderValue}
						onAfterChange={onRangeChange}
					/>
				</div>
			)}
		</div>
	);
}

export default Panel;
