import React from 'react';
import { LineChart as RLineChart, Line, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';

import tokens from '@talend/design-tokens';
import { LineChartEntry, LineChartOptions, LineOptions } from './LineChart.types';


import { CustomTooltip } from './LineChartTooltip.component';
import { CustomLegend } from './LineChartLegend.component';

export interface LineChartProps {
	data: LineChartEntry[];
	lines: LineOptions[];
	chartOptions: LineChartOptions;
	onLineClicked?: (key: string) => void
	onLineHovered?: (key: string) => void
	onLegendItemClicked?: (key: string) => void
	onLegendItemHovered?: (key: string) => void

};

function LineChart({
	data,
	lines,
	chartOptions,
	onLineClicked = () => {},
	onLineHovered = () => {},
	onLegendItemClicked = () => {},
	onLegendItemHovered = () => {},
}: LineChartProps) {
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
		<ResponsiveContainer width={width || '100%'} height={height || '100%'} debounce={1}>
		  <RLineChart
			data={data}
			margin={margin || {}}
		  >
			{ !!showGridLines && <CartesianGrid stroke={tokens.coralColorNeutralBackgroundMedium} strokeDasharray="2" vertical={false} />}
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
				hide
				{...rightYAxisOptions?.rechartsOptions}
				unit={rightYAxisOptions?.hideUnitInAxis ? '' : rightYAxisOptions?.rechartsOptions.unit}
			/>
			{tooltip?.custom ?
				<Tooltip
					content={<CustomTooltip external={{chartOptions, linesConfig: lines}} />}
				/>
			:
				<Tooltip contentStyle={tooltip?.contentStyle} formatter={tooltip?.formatter} />

			}
			{legend?.custom ?
				<Legend
				{...legend?.rechartsOptions}
				content={
					<CustomLegend
						external={{
							chartOptions,
							linesConfig: lines,
							align: legend?.rechartsOptions?.align
						}}
						onLegendClicked={onLegendItemClicked}
						onLegendHovered={onLegendItemHovered}
					/>
				}
				/>
			:
				<Legend
					{...legend?.rechartsOptions}
					onClick={({ dataKey }) => onLegendItemClicked(dataKey)}
					onMouseEnter={({ dataKey }) => onLegendItemHovered(dataKey)}
					onMouseLeave={() => onLegendItemHovered('')}
				/>

			}
			{lines.map(options =>
				<Line
					id={`line_${options.key}`}
					key={options.key}
					yAxisId={options.axis || 'left'}
					dataKey={options.key}
					stroke={options.color}
					connectNulls
					{...options.rechartsOptions}
					onClick={() => onLineClicked(options.key)}
					onMouseEnter={() => onLineHovered(options.key)}
					onMouseLeave={() => onLineHovered('')}
				/>
			)}
		  </RLineChart>
		</ResponsiveContainer>
	  );
};


export default LineChart;
