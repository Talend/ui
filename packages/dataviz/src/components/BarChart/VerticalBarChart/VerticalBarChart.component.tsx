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
import ColoredBar, { ChartStyle } from '../ColoredBar/ColoredBar.component';
import { DataType, Range } from '../../../types';

export type VerticalBarChartEntry = ChartEntry<Range> & {
	label: string;
};

export interface VerticalBarChartProps {
	data: VerticalBarChartEntry[];
	dataType: DataType;
	onBarClick: (event: MouseEvent, entry: VerticalBarChartEntry) => void;
	getTooltipContent: (entry: VerticalBarChartEntry) => JSX.Element;
	width?: number;
	height?: number;
}

function VerticalBarChart({
	data,
	dataType,
	width,
	height,
	onBarClick,
	getTooltipContent,
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
					// Or date labels will overflow
					bottom: dataType === DataType.DATE ? 40 : undefined,
				}}
				onMouseOut={onMouseOut}
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
					allowEscapeViewBox={{ x: false, y: true }}
					isAnimationActive={false}
					content={TooltipContent}
				/>

				{dataType === DataType.DATE && (
					<XAxis
						dataKey="label"
						type="category"
						interval={0}
						tick={{ angle: -45 }}
						textAnchor="end"
					/>
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
