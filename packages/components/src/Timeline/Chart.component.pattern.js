import React, { useMemo } from 'react';
import {
	Area,
	AreaChart,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Text,
} from 'recharts';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import getLocale from '../DateFnsLocale/locale';
import { useTimelineContext } from './context';

const randomPercentage = (min, max) => min + Math.round(Math.random() * (max - min));
const DATA_INTERVAL = 60000;

function createDataDictModifier(dataDict, locale) {
	return function setValue(timeCursor, key, value) {
		const chartData = dataDict[timeCursor] || {
			timestamp: timeCursor,
			name: format(timeCursor, 'DD MMM YYYY HH:mm:ss', locale),
		};
		if (key) {
			chartData[key] = value;
		}
		dataDict[timeCursor] = chartData;
	};
}

function getData(groups, timeRange, locale) {
	const dataDict = {};
	const setValue = createDataDictModifier(dataDict, locale);

	const [startTimestamp, endTimestamp] = timeRange;
	setValue(startTimestamp);
	setValue(endTimestamp);

	groups.forEach(({ label, items }) => {
		items.forEach(item => {
			const { min, max } = item.fingerprint.cpu;
			const { start, end } = item.time;
			for (let timeCursor = start + DATA_INTERVAL; timeCursor < end; timeCursor += DATA_INTERVAL) {
				setValue(timeCursor, label, randomPercentage(min, max));
			}
			setValue(start, label, 0);
			setValue(end, label, 0);
		});
	});

	const data = Object.values(dataDict);
	data.sort((a, b) => a.timestamp - b.timestamp);
	return data;
}

const Pattern = ({ id, fill, width, height, children }) => {
	return (
		<pattern id={id} patternUnits="userSpaceOnUse" width={width} height={height}>
			<rect width={width} height={height} fill={fill}></rect>
			{children}
		</pattern>
	);
};

const colors = ['#272288', '#a90d78', '#32692b', '#883f00'];

const patterns = (
	<defs>
		<Pattern id="pattern0" fill="#d7d5ff" width={8} height={8}>
			<path stroke="#272288" d="M 0,8 l 8,-8 M -2,2 l 4,-4 M 6,10 l 4,-4" stroke-width="2" />
		</Pattern>
		<Pattern id="pattern1" fill="#ffbbea" width={4} height={4}>
			<path fill="#a90d78" d="M1 3h1v1H1V3zm2-2h1v1H3V1z" />
		</Pattern>
		<Pattern id="pattern3" fill="#a6dc9f" width={8} height={8}>
			<path fill="#32692b" d="M6 18h12V6H6v12zM4 4h16v16H4V4z" />
		</Pattern>
		<Pattern id="pattern4" fill="#e0ac7e" width={6} height={6}>
			<polygon fill="#883f00" fill-rule="evenodd" points="4 2 6 3 4 4 3 6 2 4 0 3 2 2 3 0 4 2" />
		</Pattern>
	</defs>
);

const patternActivated = false;
export default function Chart() {
	const { data: groups, timeRange, measures } = useTimelineContext();

	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);

	const subGroups = groups.slice(0, 4);
	const data = getData(subGroups, timeRange, locale);

	return (
		<div style={{ width: measures.total.widthUnit }}>
			<div className={theme.title}></div>
			<ResponsiveContainer width="100%" height={100}>
				<AreaChart data={data} margin={{ left: 240 }}>
					{patterns}
					<XAxis
						dataKey="timestamp"
						type="number"
						domain={['dataMin', 'dataMax']}
						tick={false}
						// interval="preserveStartEnd"
						// tick={props => {
						// 	console.log(props);
						// 	return (
						// 		<Text {...props} className="recharts-cartesian-axis-tick-value">
						// 			{format(props.payload.value, 'HH:mm', locale)}
						// 		</Text>
						// 	);
						// }}
					/>
					<YAxis type="number" domain={[0, 100]} />
					<Tooltip filterNull />
					{/* <Legend /> */}
					{/* <Line type="monotone" dataKey={groups[0].label} stroke="#8884d8" dot={false} /> */}

					{subGroups.map(({ label }, index) => (
						<Area
							type="monotone"
							dataKey={label}
							stroke={colors[index]}
							fill={patternActivated ? `url(#pattern${index})` : colors[index]}
							fillOpacity={0.4}
							dot={false}
						/>
					))}
					{/* <Line type="monotone" dataKey="task2" stroke="#82ca9d" /> */}
					{/* <Line type="monotone" dataKey="task3" stroke="#e96065" /> */}
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
