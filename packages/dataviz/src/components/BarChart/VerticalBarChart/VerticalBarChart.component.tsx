import React from 'react';
import classNames from 'classnames';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './VerticalBarChart.component.scss';
import { ChartEntry } from '../barChart.types';
import {
	getPrimaryBarValue,
	getSecondaryBarValue,
	PRIMARY_BAR_ANIMATION_PROPS,
	SECONDARY_BAR_ANIMATION_PROPS,
	useBarChart,
} from '../useBarChart.hook';
import ColoredBar from '../ColoredBar/ColoredBar.component';
import { ChartStyle, Range } from '../../../types';
import TooltipCursor from '../TooltipCursor/TooltipCursor.component';

export type VerticalBarChartEntry = ChartEntry<Range> & {
	label: string;
};

export interface VerticalBarChartProps {
	data: VerticalBarChartEntry[];
	dataFeature?: string;
	onBarClick: (event: MouseEvent, entry: VerticalBarChartEntry) => void;
	getTooltipContent: (entry: VerticalBarChartEntry) => JSX.Element;
	width?: number;
	height?: number;
	showXAxis?: boolean;
}

function VerticalBarChart({
	data,
	dataFeature,
	width,
	height,
	onBarClick,
	getTooltipContent,
	showXAxis,
}: VerticalBarChartProps) {
	const { focusedBarIndex, onClick, onMouseMove, onMouseOut, TooltipContent } = useBarChart(
		data,
		onBarClick,
		getTooltipContent,
	);

	return (
		<ResponsiveContainer height={height} width={width}>
			<BarChart
				data={data}
				className={classNames(styles['vertical-bar-chart'])}
				onMouseMove={onMouseMove}
				layout="horizontal"
				onClick={onClick}
				margin={{
					// Or labels will overflow
					bottom: showXAxis ? 40 : 10,
				}}
				onMouseLeave={onMouseOut}
			>
				<CartesianGrid strokeDasharray="3 3" vertical={false} />

				<Bar
					dataKey={getPrimaryBarValue}
					stackId="1"
					{...PRIMARY_BAR_ANIMATION_PROPS}
					shape={
						<ColoredBar
							chartStyle={ChartStyle.VALUE}
							barType="primary"
							focusedBarIndex={focusedBarIndex}
						/>
					}
				/>
				<Bar
					dataKey={getSecondaryBarValue}
					stackId="1"
					{...SECONDARY_BAR_ANIMATION_PROPS}
					shape={
						<ColoredBar
							chartStyle={ChartStyle.VALUE}
							barType="secondary"
							focusedBarIndex={focusedBarIndex}
						/>
					}
				/>
				<Tooltip
					isAnimationActive={false}
					content={TooltipContent}
					cursor={<TooltipCursor dataFeature={dataFeature} height={200} />}
				/>

				{showXAxis && (
					<XAxis dataKey="label" type="category" interval={0} angle={-45} textAnchor="end" />
				)}

				<YAxis
					dataKey="value"
					orientation="right"
					tickLine={false}
					type="number"
					mirror
					interval={0}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}

export default VerticalBarChart;
