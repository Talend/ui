import React from 'react';
import classNames from 'classnames';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './VerticalBarChart.component.scss';
import { ChartStyle, DataType, VerticalBarChartEntry } from '../barChart.types';
import { getPrimaryBarValue, getSecondaryBarValue, useBarChart } from '../useBarChart.hook';
import ColoredBar from '../ColoredBar/ColoredBar.component';

export interface VerticalBarChartProps {
	data: VerticalBarChartEntry[];
	dataType: DataType;
	onBarClick: (event: MouseEvent, entry: VerticalBarChartEntry) => void;
	getTooltipContent: (entry: VerticalBarChartEntry) => JSX.Element;
}

function VerticalBarChart({
	data,
	dataType,
	onBarClick,
	getTooltipContent,
}: VerticalBarChartProps) {
	const { focusedBarIndex, onClick, onMouseMove, onMouseOut, TooltipContent } = useBarChart(
		data,
		onBarClick,
		getTooltipContent,
	);

	return (
		<ResponsiveContainer>
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
					cursor={false}
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
