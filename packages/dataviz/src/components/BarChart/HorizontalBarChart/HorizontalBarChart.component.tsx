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

const BAR_GAP = 5;
const BAR_HEIGHT = 20;
const X_AXIS_TICKS_HEIGHT = 40;

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
	// If no height is provided, guess it from content (we don't want the bars to stretch to available height)
	const contentHeight = height || X_AXIS_TICKS_HEIGHT + data.length * (BAR_GAP + BAR_HEIGHT);
	return (
		<ResponsiveContainer width={width} height={contentHeight}>
			<BarChart
				data={data}
				layout="vertical"
				className={styles['horizontal-bar-chart']}
				onMouseMove={onMouseMove}
				onClick={onClick}
				onMouseLeave={onMouseOut}
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
					isAnimationActive={false}
					content={<TooltipContent />}
					cursor={<TooltipCursor dataFeature={dataFeature} height={200} />}
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
		</ResponsiveContainer>
	);
}

export default Object.assign(HorizontalBarChart, {
	ChartStyle,
});
