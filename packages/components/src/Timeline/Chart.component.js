import React, { useMemo } from 'react';
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';

import getLocale from '../DateFnsLocale/locale';
import { useTimelineContext } from './context';

import theme from './Chart.scss';

const randomPercentage = (min, max) => min + Math.round(Math.random() * (max - min));
const DATA_INTERVAL = 120000;

function createDataDictModifier(dataDict, locale, key) {
	return function addValue(timeCursor, label, value) {
		const chartData = dataDict[timeCursor] || {
			timestamp: timeCursor,
			name: format(timeCursor, 'DD MMM YYYY HH:mm:ss', locale),
			max: { label, value },
			[key]: 0,
		};
		dataDict[timeCursor] = chartData;

		chartData[key] += value;
		if (value > chartData.max.value) {
			chartData.max = { label, value };
		}
	};
}

function getNormalizedMinuteTimestamp(timestamp) {
	const date = new Date(timestamp);
	return new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		0,
		0,
	).getTime();
}

function getData(groups, timeRange, locale, itemKey, caption) {
	const dataDict = {};
	const addValue = createDataDictModifier(dataDict, locale, caption);

	const [startTimestamp, endTimestamp] = timeRange;
	addValue(getNormalizedMinuteTimestamp(startTimestamp), null, 0);
	addValue(getNormalizedMinuteTimestamp(endTimestamp), null, 0);

	groups.forEach(({ label, items }) => {
		items.forEach(item => {
			const { min, max } = get(item, itemKey);
			const start = getNormalizedMinuteTimestamp(item.time.start);
			const end = getNormalizedMinuteTimestamp(item.time.end);
			for (let timeCursor = start + DATA_INTERVAL; timeCursor < end; timeCursor += DATA_INTERVAL) {
				addValue(timeCursor, label, randomPercentage(min, max));
			}
			addValue(start, label, 0);
			addValue(end, label, 0);
		});
	});

	const data = Object.values(dataDict);
	data.sort((a, b) => a.timestamp - b.timestamp);
	return data;
}

export default function Chart(props) {
	const { data: groups, timeRange, measures } = useTimelineContext();

	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);

	const { caption, itemKey, labelFormatter, valueFormatter, color, fillColor } = props;

	const data = getData(groups, timeRange, locale, itemKey, caption);

	return (
		<div className={theme.timelineChart}>
			<div className={theme.timelineChartCaption}>{caption}</div>
			<div className={theme.timelineChartContainer} style={{ width: measures.total.widthUnit }}>
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={data} margin={{ left: 0 }}>
						<XAxis
							dataKey="timestamp"
							type="number"
							domain={['dataMin', 'dataMax']}
							tick={false}
							hide
						/>
						<YAxis type="number" hide />
						<Tooltip filterNull labelFormatter={labelFormatter} formatter={valueFormatter} />
						<Area
							type="monotone"
							dataKey={caption}
							stroke={color}
							fill={fillColor}
							fillOpacity={0.4}
							dot={false}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
