import React, { useState } from 'react';
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

import './LineChart.scss';

const colors = ['#0565A7', '#70A338', '#CA7129', '#677077', '#C95357'];

export function renderLine(data, key, highlightLegendKey, selectedLegends) {
	let dataKeys = new Set();
	data.forEach((dots) => {
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
				activeDot={{ r: getActiveDotR(dataKey, highlightLegendKey, selectedLegends), fill: 'white', stroke: color }}
			/>
		);
	});
}

export const renderLegend = (highlightLegendKey, selectedLegends, handleMouseDown, handleMouseEnter, handleMouseLeave) => (props) => {
	const { payload } = props;
	return (
		<ul>
			{
				payload.map((entry, index) => {
					const isSelected = isSelectedOrHighlight(entry.dataKey, highlightLegendKey, selectedLegends);
					const legendClass = classNames({
						'recharts-legend-item': true,
						'legend-selected': isSelected,
					});
					return (
						<li className={legendClass}
						    key={`item-${index}`}
						    onMouseEnter={() => { handleMouseEnter(entry); }}
						    onMouseLeave={handleMouseLeave}
						    onClick={() => { handleMouseDown(entry); }}
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
				})
			}
		</ul>
	);
}

export function handleMouseDown(selectedLegends, setSelectedLegends) {
	return (o) => {
		const { dataKey } = o;
		if (!selectedLegends.find(legend => legend === dataKey)) {
			setSelectedLegends(selectedLegends.concat([dataKey]));
		} else {
			setSelectedLegends(selectedLegends.filter(legend => legend !== dataKey));
		}
	};
}

export function handleMouseEnter(setHighlightLegendKey) {
	return (o) => {
		const { dataKey } = o;
		setHighlightLegendKey(dataKey);
	};
}

export function handleMouseLeave(setHighlightLegendKey) {
	return () => {
		setHighlightLegendKey('');
	};
}

export default function CustomLineChart({ data, key = 'name', height = '100%', width = '100%', labelFormatter, tickFormatter, ticks }) {
	const [highlightLegendKey, setHighlightLegendKey] = useState('');
	const [selectedLegends, setSelectedLegends] = useState([]);
	return (
		<React.Fragment>
			<ResponsiveContainer width={width} height={height}>
				<LineChart data={data} margin={{ top: 7, right: 20, bottom: 5, left: 5 }}>
					<CartesianGrid stroke="#F2F2F2" strokeDasharray="2" vertical={false} />
					<XAxis dy={5} dataKey={key} tickLine={false} />
					<YAxis dx={-5} tickFormatter={tickFormatter} ticks={ticks} />
					<Legend
						content={
							renderLegend(highlightLegendKey, selectedLegends, handleMouseDown(selectedLegends, setSelectedLegends), handleMouseEnter(setHighlightLegendKey), handleMouseLeave(setHighlightLegendKey))
						}
						verticalAlign="bottom"
						iconType={'circle'}
					/>
					<Tooltip contentStyle={{fontSize: 10}} formatter={labelFormatter} />
					{renderLine(data, key, highlightLegendKey, selectedLegends)}
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
}
