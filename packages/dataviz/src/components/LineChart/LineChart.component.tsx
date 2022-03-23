import React from 'react';
import { LineChart as RLineChart, Line, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';

import { LineChartEntry, LineChartOptions, LineOptions } from './LineChart.types';

import { CustomTooltip } from './LineChartTooltip.component';
import { CustomLegend } from './LineChartLegend.component';

export interface LineChartProps {
	data: LineChartEntry[];
	lines: LineOptions[];
	chartOptions: LineChartOptions;
};

function LineChart({ data, lines, chartOptions }: LineChartProps) {
	const {
		width,
		height,
		margin,
		showGridLines,
		xAxisOptions,
		leftYAxisOptions,
		rightYAxisOptions,
		tooltip,
		legend,
	} = chartOptions;

	return (
		<ResponsiveContainer width={width || "100%"} height={height || "100%"} debounce={1}>
		  <RLineChart
			data={data}
			margin={margin || {}}
		  >
			{ !!showGridLines && <CartesianGrid stroke="#F2F2F2" strokeDasharray="2" vertical={false} />}
			<XAxis
				dataKey="xLabel"
				{...xAxisOptions?.rechartsOptions}
			/>
			<YAxis
				yAxisId="left"
				{...leftYAxisOptions?.rechartsOptions}
				unit={leftYAxisOptions?.hideUnitInAxis ? '' : leftYAxisOptions?.rechartsOptions.unit}
			/>
			<YAxis
				yAxisId="right"
				orientation='right'
				hide={true}
				{...rightYAxisOptions?.rechartsOptions}
				unit={rightYAxisOptions?.hideUnitInAxis ? '' : rightYAxisOptions?.rechartsOptions.unit}
			/>
			{tooltip?.custom ?
				<Tooltip content={
					<CustomTooltip external={{chartOptions: chartOptions, linesConfig: lines}} />
				}/>
			:
				<Tooltip contentStyle={tooltip?.constentStyle} formatter={tooltip?.formatter} />

			}
			{legend?.custom ?
				<Legend
				{...legend?.rechartsOptions}
				content={
					<CustomLegend external={{chartOptions: chartOptions, linesConfig: lines, align: legend?.rechartsOptions?.align}}/>
				}
				/>
			:
				<Legend {...legend?.rechartsOptions}/>

			}
			{lines.map((options) =>
				<Line
					key={options.key}
					yAxisId={options.axis || 'left'}
					dataKey={options.key}
					stroke={options.color}
					connectNulls
					{...options.rechartsOptions}
				/>
			)}
		  </RLineChart>
		</ResponsiveContainer>
	  );
};


export default LineChart;
