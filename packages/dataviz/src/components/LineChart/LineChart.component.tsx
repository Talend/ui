import React from 'react';
import {
	LineChart as RLineChart,
	Line,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	Legend,
} from 'recharts';

import tokens from '@talend/design-tokens';
import { LineChartEntry, LineChartOptions, LineOptions, LineStatus } from './LineChart.types';

import { CustomTooltip } from './LineChartTooltip.component';
import { CustomLegend } from './LineChartLegend.component';

export interface LineChartProps {
	data: LineChartEntry[];
	lines: LineOptions[];
	chartOptions: LineChartOptions;
	onLineClicked?: (key: string) => void;
	onLineHovered?: (key: string) => void;
	onLegendItemClicked?: (key: string) => void;
	onLegendItemHovered?: (key: string) => void;
}

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
		legend,
		tooltip,
	} = chartOptions;

	const [activeLine, setActiveLine] = React.useState<string | null>(null);

	const getLineStyleFromStatus = (status: LineStatus, key: string) => {
		const styleByStatus = {
			light: {
				strokeWidth: 1,
				strokeOpacity: 1,
				activeDot: { r: 3, strokeWidth: 0 },
			},
			active: {
				strokeWidth: 2,
				strokeOpacity: 1,
				activeDot: { r: 5, strokeWidth: 0 },
			},
			inactive: {
				strokeWidth: 2,
				strokeOpacity: 0.25,
				activeDot: { r: 0, strokeWidth: 0 },
			},
			highlighted: {
				strokeWidth: 3,
				strokeOpacity: 1,
				activeDot: { r: 6, strokeWidth: 0 },
			},
		};

		if (activeLine !== null) {
			return {
				dot: { r: 0 },
				...styleByStatus[status],
				strokeOpacity: activeLine === key ? 1 : 0.25,
			};
		}

		return {
			dot: { r: 0 },
			...styleByStatus[status],
		};
	};

	const onLegendHovered = (key: string) => {
		if (onLegendItemHovered) {
			onLegendItemHovered(key);
		}
		if (key === '') {
			setActiveLine(null);
		} else {
			setActiveLine(key);
		}
	};

	return (
		<>
			<ResponsiveContainer width={width || '100%'} height={height || '100%'} debounce={1}>
				<RLineChart data={data} margin={margin || {}}>
					{!!showGridLines && (
						<CartesianGrid
							stroke={tokens.coralColorNeutralBackgroundMedium}
							strokeDasharray="2"
							vertical={false}
						/>
					)}
					<XAxis
						dataKey="xLabel"
						interval={xAxisOptions?.interval}
						dx={xAxisOptions?.horizontalOffset}
						dy={xAxisOptions?.verticalOffset}
						allowDataOverflow={xAxisOptions?.clipDomain}
						ticks={xAxisOptions?.manualTicks}
						tickLine={false}
						tickFormatter={xAxisOptions?.formatter}
						domain={xAxisOptions?.domain}
						type={xAxisOptions?.type}
					/>
					<YAxis
						yAxisId="left"
						type={leftYAxisOptions?.type}
						domain={leftYAxisOptions?.domain}
						unit={leftYAxisOptions?.hideUnitInAxis ? '' : leftYAxisOptions?.unit}
						interval={leftYAxisOptions?.manualTicks ? 0 : 'preserveEnd'}
						dx={leftYAxisOptions?.horizontalOffset}
						dy={leftYAxisOptions?.verticalOffset}
						minTickGap={2}
						tickCount={6}
						ticks={leftYAxisOptions?.manualTicks}
						tickLine={false}
						tickFormatter={leftYAxisOptions?.formatter}
					/>
					<YAxis
						hide={rightYAxisOptions?.hide !== false}
						yAxisId="right"
						orientation="right"
						type={rightYAxisOptions?.type}
						domain={rightYAxisOptions?.domain}
						unit={rightYAxisOptions?.hideUnitInAxis ? '' : rightYAxisOptions?.unit}
						interval={rightYAxisOptions?.manualTicks ? 0 : 'preserveEnd'}
						dx={rightYAxisOptions?.horizontalOffset}
						dy={rightYAxisOptions?.verticalOffset}
						minTickGap={2}
						tickCount={6}
						ticks={rightYAxisOptions?.manualTicks}
						tickLine={false}
						tickFormatter={rightYAxisOptions?.formatter}
					/>
					{!tooltip?.hide && (
						<Tooltip
							content={
								<CustomTooltip
									external={{
										linesConfig: lines,
										xformatter: xAxisOptions?.tooltipFormatter || xAxisOptions?.formatter,
										leftUnit: leftYAxisOptions?.unit,
										rightUnit: rightYAxisOptions?.unit,
										showInactives: tooltip?.showInnactives,
									}}
								/>
							}
						/>
					)}
					{!legend?.hide && (
						<Legend
							verticalAlign={legend?.verticalAlign || 'bottom'}
							content={
								<CustomLegend
									external={{
										linesConfig: lines,
										align: legend?.horizontalAlign || 'right',
										showInactives: legend?.showInactives,
										isRightAxisDisplayed: rightYAxisOptions?.hide === false,
									}}
									onLegendClicked={onLegendItemClicked}
									onLegendHovered={onLegendHovered}
								/>
							}
						/>
					)}

					{lines.map(options => (
						<Line
							id={`line_${options.key}`}
							key={options.key}
							yAxisId={options.axis || 'left'}
							dataKey={options.key}
							stroke={options.color}
							type="monotone"
							strokeDasharray={options?.dashed ? '17 4' : ''}
							connectNulls
							animationDuration={300}
							{...getLineStyleFromStatus(options?.status || 'active', options.key)}
							onClick={() => onLineClicked(options.key)}
							onMouseEnter={() => onLineHovered(options.key)}
							onMouseLeave={() => onLineHovered('')}
						/>
					))}
				</RLineChart>
			</ResponsiveContainer>
		</>
	);
}

export default LineChart;
