import React, { useMemo } from 'react';
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Dot } from 'recharts';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import getLocale from '../DateFnsLocale/locale';
import { useTimelineContext } from './context';

import theme from './Chart.scss';

function createDataDictModifier(dataDict, timeRange, locale) {
	const [start, end] = timeRange;
	return function addValue(groupLabel, timestamp, value) {
		if (timestamp < start || timestamp > end) {
			return;
		}
		const chartData = dataDict[timestamp] || {
			timestamp: timestamp,
			name: format(timestamp, 'DD MMM YYYY HH:mm:ss', locale),
			max: { label: groupLabel, value },
			value: 0,
		};
		dataDict[timestamp] = chartData;
		chartData.value += value;

		if (value > chartData.max.value) {
			chartData.max = { label: groupLabel, value };
		}
	};
}

function getData(timeRange, groups, locale, getItemValues) {
	const dataDict = {};
	const addValue = createDataDictModifier(dataDict, timeRange, locale);

	groups.forEach(({ label: groupLabel, items }) => {
		items
			.map(getItemValues)
			.filter(Boolean)
			.flat()
			.forEach(({ key, value }) => {
				addValue(groupLabel, key, value);
			});
	});

	const data = Object.values(dataDict);
	data.sort((a, b) => a.timestamp - b.timestamp);
	return data;
}

export default function Chart(props) {
	const { data: groups, measures, timeRange } = useTimelineContext();
	const [startTimestamp, endTimestamp] = timeRange;

	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);

	const { caption, getItemValues, labelFormatter, valueFormatter, color } = props;

	const data = getData(timeRange, groups, locale, getItemValues);

	return (
		<div className={theme.timelineChart}>
			<div className={theme.timelineChartCaption}>{caption}</div>
			<div className={theme.timelineChartContainer} style={{ width: measures.total.widthUnit }}>
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={data} margin={{ left: 0 }}>
						<XAxis
							dataKey="timestamp"
							type="number"
							domain={[startTimestamp, endTimestamp]}
							tick={false}
							hide
						/>
						<YAxis type="number" hide />
						<Tooltip
							filterNull
							labelFormatter={labelFormatter}
							formatter={valueFormatter}
							wrapperStyle={{ zIndex: 10 }}
						/>
						<Area
							type="monotone"
							dataKey="value"
							stroke="none"
							fill={color}
							fillOpacity={0.4}
							dot={(props) => (
								<Dot
									{...props}
									stroke="transparent"
									fill="none"
									aria-label={
										props.payload &&
										`${labelFormatter(props.payload.timestamp)} ${valueFormatter(
											props.payload.value,
											null,
											props,
										)}`
									}
									tabIndex="-1"
								/>
							)}
							aria-label={caption}
							tabIndex="0"
							isAnimationActive={false}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
