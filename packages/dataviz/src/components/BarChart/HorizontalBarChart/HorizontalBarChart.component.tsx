import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './HorizontalBarChart.component.scss';
import { ChartEntry, ChartStyle, ValueType } from '../barChart.types';
import { getPrimaryBarValue, getSecondaryBarValue, useBarChart } from '../useBarChart.hook';
import FixedBarSizeWrapper from './FixedHeightBarWrapper/FixedHeightBarWrapper.component';
import ColoredBar from '../ColoredBar/ColoredBar.component';

export interface HorizontalBarChartProps {
	data: ChartEntry<string>[];
	valueType: ValueType;
	chartStyle: ChartStyle;
	onBarClick: (event: MouseEvent, entry: ChartEntry<string>) => void;
	getTooltipContent: (entry: ChartEntry<string>) => JSX.Element;
	width?: number;
	height?: number;
}

function HorizontalBarChart({
	chartStyle,
	data,
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
						cursor={false}
						content={<TooltipContent />}
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

export default Object.assign(HorizontalBarChart);
