import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
	Legend,
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import {
	isSelectedOrHighlight,
	getActiveDotR,
	getDotR,
	getStrokeOpacity,
	getStrokeWidth,
	union,
} from './linechart-utils';
import theme from './LineChart.scss';

export function handleMouseDown(selectedLegends, setSelectedLegends) {
	return o => {
		const { dataKey } = o;
		if (!selectedLegends.find(legend => legend === dataKey)) {
			setSelectedLegends(selectedLegends.concat([dataKey]));
		} else {
			setSelectedLegends(selectedLegends.filter(legend => legend !== dataKey));
		}
	};
}

export function handleMouseEnter(setHighlightLegendKey) {
	return o => {
		const { dataKey } = o;
		setHighlightLegendKey(dataKey);
	};
}

export function handleMouseLeave(setHighlightLegendKey) {
	return () => {
		setHighlightLegendKey('');
	};
}

export function renderLine(data, key, highlightLegendKey, selectedLegends, colors) {
	let dataKeys = new Set();
	data.forEach(dots => {
		dataKeys = union(dataKeys, new Set(Object.keys(dots)));
	});
	dataKeys.delete(key);
	return [...dataKeys].map((dataKey, index) => {
		const color = index < colors.length ? colors[index] : '';
		return (
			<Line
				type="linear"
				dataKey={dataKey}
				stroke={color}
				fill={color}
				strokeWidth={getStrokeWidth(dataKey, highlightLegendKey, selectedLegends)}
				connectNulls
				strokeOpacity={getStrokeOpacity(dataKey, highlightLegendKey, selectedLegends)}
				dot={{ r: getDotR(dataKey, highlightLegendKey, selectedLegends), fill: color }}
				activeDot={{
					r: getActiveDotR(dataKey, highlightLegendKey, selectedLegends),
					fill: '#fff',
					stroke: color,
				}}
			/>
		);
	});
}

export const renderLegend = (
	highlightLegendKey,
	selectedLegends,
	onMouseDown,
	onMouseEnter,
	onMouseLeave,
) => props => {
	const { payload } = props;
	return (
		<ul>
			{payload.map((entry, index) => {
				const isSelected = isSelectedOrHighlight(
					entry.dataKey,
					highlightLegendKey,
					selectedLegends,
				);
				const legendClass = classNames({
					[theme['td-legend-item']]: true,
					[theme['td-legend-selected']]: isSelected,
				}, 'td-legend-item');
				return (
					<li
						role="button"
						className={legendClass}
						key={`item-${index}`}
						onMouseEnter={() => {
							onMouseEnter(entry);
						}}
						onMouseLeave={onMouseLeave}
						onClick={() => {
							onMouseDown(entry);
						}}
					>
						<svg width="30" height="30">
							<path
								strokeWidth="2"
								fill={isSelected ? entry.color : '#fff'}
								stroke={entry.color}
								d="M0,16h10.666666666666666
								A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
								H32M21.333333333333332,16
								A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
							/>
						</svg>
						{entry.value}
					</li>
				);
			})}
		</ul>
	);
};

function Tick({ x, y, width, height, ...rest }) {
	const { payload } = rest;

	return (
		<g className={classNames(theme['axis-tick'], 'td-axis-tick')}>
			<text width={width} height={height} x={x} y={y} textAnchor="middle">
				<tspan x={x} dy={'1em'}>{payload.value}</tspan>
			</text>
		</g>
	);
}

Tick.propTypes = {
	x: PropTypes.string,
	y: PropTypes.string,
	height: PropTypes.string,
	width: PropTypes.string,
};

function CustomLineChart({
	data,
	key = 'name',
	height = '100%',
	width = '100%',
	labelFormatter,
	tickFormatter,
	ticks,
	margin,
	colors = ['#0565A7', '#70A338', '#CA7129', '#677077', '#C95357'],
}) {
	const [highlightLegendKey, setHighlightLegendKey] = useState('');
	const [selectedLegends, setSelectedLegends] = useState([]);
	return (
		<React.Fragment>
			<ResponsiveContainer width={width} height={height}>
				<LineChart data={data} margin={margin} className={'td-linechart'}>
					<CartesianGrid stroke="#F2F2F2" strokeDasharray="2" vertical={false} />
					<XAxis dataKey={key} tickLine={false} tick={<Tick />} />
					<YAxis dx={-5} tickFormatter={tickFormatter} ticks={ticks} />
					<Legend
						content={renderLegend(
							highlightLegendKey,
							selectedLegends,
							handleMouseDown(selectedLegends, setSelectedLegends),
							handleMouseEnter(setHighlightLegendKey),
							handleMouseLeave(setHighlightLegendKey),
						)}
						verticalAlign="bottom"
					/>
					<Tooltip contentStyle={{ fontSize: 10 }} formatter={labelFormatter} />
					{renderLine(data, key, highlightLegendKey, selectedLegends, colors)}
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
}

CustomLineChart.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.string),
	data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	height: PropTypes.string,
	key: PropTypes.string.required,
	labelFormatter: PropTypes.fn,
	margin: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	tickFormatter: PropTypes.fn,
	ticks: PropTypes.arrayOf(PropTypes.integer),
	width: PropTypes.string,
};

export default CustomLineChart;
