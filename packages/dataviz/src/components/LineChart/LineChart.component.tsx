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
		hideTooltip,
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
				interval={xAxisOptions?.interval}
				dx={xAxisOptions?.horizontalOffset}
				tickFormatter={xAxisOptions?.formatter}
			/>
			<YAxis
				yAxisId="left"
				type={leftYAxisOptions?.type}
				domain={leftYAxisOptions?.domain}
				unit={leftYAxisOptions?.hideUnitInAxis ? '' : leftYAxisOptions?.unit}
				interval='preserveEnd'
				tickCount={6}
				tickLine={false}
				tickFormatter={leftYAxisOptions?.formatter}
			/>
			<YAxis
				hide={rightYAxisOptions?.hide !== false}
				yAxisId="right"
				orientation='right'
				type={rightYAxisOptions?.type}
				domain={rightYAxisOptions?.domain}
				unit={rightYAxisOptions?.hideUnitInAxis ? '' : rightYAxisOptions?.unit}
				interval='preserveEnd'
				tickCount={6}
				tickLine={false}
				tickFormatter={rightYAxisOptions?.formatter}
			/>
			{!hideTooltip &&
				<Tooltip
					content={
						<CustomTooltip
							external={{
								linesConfig: lines,
								xformatter: xAxisOptions?.tooltipFormatter || xAxisOptions?.formatter,
								leftUnit: leftYAxisOptions?.unit,
								rightUnit: rightYAxisOptions?.unit
							}}
						/>
					}
				/>
			}
			{!legend?.hide &&
				<Legend
					verticalAlign={legend?.verticalAlign || 'bottom'}
					content={
						<CustomLegend
							external={{
								linesConfig: lines,
								align: legend?.horizontalAlign || 'right'
							}}
							onLegendClicked={onLegendItemClicked}
							onLegendHovered={onLegendItemHovered}
						/>
					}
				/>
			}
			{lines.map(options =>
				<Line
					id={`line_${options.key}`}
					key={options.key}
					yAxisId={options.axis || 'left'}
					dataKey={options.key}
					stroke={options.color}
					type='monotone'
					strokeWidth={3}
					strokeDasharray={options?.dashed ? '13 4 13' : ''}
					dot={{ r: 0 }}
					connectNulls
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
