import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './HorizontalBarChart.component.scss';
import { ChartEntry } from '../barChart.types';
import {
	getPrimaryBarValue,
	getSecondaryBarValue,
	PRIMARY_BAR_ANIMATION_PROPS,
	SECONDARY_BAR_ANIMATION_PROPS,
	useBarChart,
} from '../useBarChart.hook';
import FixedBarSizeWrapper from './FixedHeightBarWrapper/FixedHeightBarWrapper.component';
import ColoredBar from '../ColoredBar/ColoredBar.component';
import TooltipCursor from '../TooltipCursor/TooltipCursor.component';
import { ChartStyle } from '../../../types';

export interface HorizontalBarChartProps {
	data: ChartEntry<string>[];
	dataFeature?: string;
	chartStyle: ChartStyle;
	onBarClick: (event: MouseEvent, entry: ChartEntry<string>) => void;
	getTooltipContent: (entry: ChartEntry<string>) => JSX.Element;
	width?: number;
	height?: number;
}

function HorizontalBarChart({
	chartStyle,
	data,
	dataFeature,
	onBarClick,
	getTooltipContent,
	width,
	height,
}: HorizontalBarChartProps) {
	const { focusedBarIndex, onClick, onMouseMove, onMouseOut, TooltipContent } = useBarChart(
		data,
		onBarClick,
		getTooltipContent,
	);

	return (
		<ResponsiveContainer width={width} height={height}>
			<FixedBarSizeWrapper data={data}>
				<BarChart
					layout="vertical"
					className={styles['horizontal-bar-chart']}
					onMouseMove={onMouseMove}
					onClick={onClick}
					onMouseOut={onMouseOut}
				>
					<CartesianGrid strokeDasharray="3 3" horizontal={false} />

					<Bar
						dataKey={getPrimaryBarValue}
						stackId="1"
						{...PRIMARY_BAR_ANIMATION_PROPS}
						shape={
							<ColoredBar
								chartStyle={chartStyle}
								focusedBarIndex={focusedBarIndex}
								barType="primary"
							/>
						}
					/>

					<Bar
						dataKey={getSecondaryBarValue}
						stackId="1"
						{...SECONDARY_BAR_ANIMATION_PROPS}
						shape={
							<ColoredBar
								chartStyle={chartStyle}
								focusedBarIndex={focusedBarIndex}
								barType="secondary"
							/>
						}
					/>

					<Tooltip
						allowEscapeViewBox={{ x: false, y: true }}
						isAnimationActive={false}
						content={<TooltipContent />}
						cursor={<TooltipCursor dataFeature={dataFeature} />}
					/>

					<XAxis dataKey="value" type="number" orientation="top" />

					<YAxis
						dataKey="key"
						tickMargin={5}
						tickLine={false}
						tick={<ColoredBar.Label chartStyle={chartStyle} focusedBarIndex={focusedBarIndex} />}
						type="category"
						interval={0}
						mirror
					/>
				</BarChart>
			</FixedBarSizeWrapper>
		</ResponsiveContainer>
	);
}

export default Object.assign(HorizontalBarChart, {
	ChartStyle,
});
