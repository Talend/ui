import React, { useEffect, useMemo } from 'react';
import get from 'lodash/get';
import format from 'date-fns/format';
import isSameDay from 'date-fns/is_same_day';
import { useTranslation } from 'react-i18next';

import getLocale from '../DateFnsLocale/locale';
import GridData from './GridData.component';

import { useTimelineContext } from './context';

import theme from './Grid.scss';

const MILLISECONDS_IN_HOUR = 60 * 60 * 1000;
const DEFAULT_DAY_LENGTH = 150; // rem
const DEFAULT_HEIGHT = 4; // rem
const DEFAULT_DATA_HEIGHT = 3; // rem
const MIN_DATA_WIDTH = 0.3; // rem

const headerHeight = DEFAULT_HEIGHT * 2;
const rowHeight = DEFAULT_HEIGHT;
const rowHeightUnit = `${rowHeight}rem`;
const dataHeightUnit = `${DEFAULT_DATA_HEIGHT}rem`;
const dataBottom = (rowHeight - DEFAULT_DATA_HEIGHT) / 2;

function getIntervals(startTimestamp, endTimestamp) {
	const hours = new Array((endTimestamp - startTimestamp) / MILLISECONDS_IN_HOUR)
		.fill(0)
		.map((_, index) => {
			const date = new Date(startTimestamp + index * MILLISECONDS_IN_HOUR);
			const isNewDate = index === 0 || date.getHours() === 0;
			return { start: date, isNewDate };
		});

	const days = hours.reduce((accu, hourDefinition) => {
		const { start, isNewDate } = hourDefinition;
		if (isNewDate) {
			accu.push({ start, count: 1 });
		} else {
			accu[accu.length - 1].count++;
		}
		return accu;
	}, []);

	return { days, hours };
}

function getItemsPerInterval(items, intervals, startName) {
	return intervals.hours.map(({ start, isNewDate }) => {
		const startTimestamp = start.getTime();
		const endTimestamp = startTimestamp + MILLISECONDS_IN_HOUR;
		return {
			start: startTimestamp,
			isNewDate,
			items: items.filter(
				item => get(item, startName) >= startTimestamp && get(item, startName) < endTimestamp,
			),
		};
	});
}
export default function Grid() {
	const scrollerRef = React.createRef();

	useEffect(() => {
		if (scrollerRef.current) {
			scrollerRef.current.scrollLeft =
				scrollerRef.current.scrollWidth - scrollerRef.current.offsetWidth;
		}
	}, [scrollerRef.current]);

	const {
		data,
		timeRange,
		idName,
		startName,
		endName,
		dataItemProps,
		caption,
		onClick,
		dataItemPopover,
		dataItemTooltip,
		zoom,
	} = useTimelineContext();

	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);
	const timeFormat = zoom < 0.7 ? 'HH' : 'HH:mm';
	const dayFormat = 'DD MMM YYYY';

	const [startTimestamp, endTimestamp] = timeRange;
	const intervals = useMemo(() => getIntervals(startTimestamp, endTimestamp), [
		startTimestamp,
		endTimestamp,
	]);
	const dayWidth = DEFAULT_DAY_LENGTH * zoom;
	const intervalWidthUnit = `${dayWidth / 24}rem`;
	const remPerMs = dayWidth / 24 / MILLISECONDS_IN_HOUR;

	const totalDataLevels = data.reduce((accu, group) => accu + 1 + group.maxLevel, 0);
	const totalHeightUnit = `${totalDataLevels * DEFAULT_HEIGHT + headerHeight}rem`;
	const totalWidthUnit = `${(endTimestamp - startTimestamp) * remPerMs}rem`;

	return (
		<div style={{ width: '100%', overflowX: 'auto' }}>
			<table className={theme.grid} style={{ position: 'relative', width: totalWidthUnit }}>
				<caption className={theme.timelineCaption}>{caption}</caption>
				<tbody className={theme.timelineRows} style={{ height: totalHeightUnit }} ref={scrollerRef}>
					{data.map(({ id, label, items, maxLevel = 0 }, groupIndex) => {
						const itemsPerInterval = getItemsPerInterval(items, intervals, startName);
						const height = `${(maxLevel + 1) * rowHeight}rem`;
						return (
							<tr
								key={id}
								className={theme.timelineRow}
								style={{ height }}
								data-group-index={groupIndex}
							>
								<th
									scope="row"
									key={id}
									className={theme.timelineTitle}
									style={{ height: `${rowHeight}rem` }}
								>
									{label}
								</th>
								{itemsPerInterval.map(({ start, isNewDate, items }) => {
									return (
										<td
											key={start}
											className={`${theme.timelineCell} ${isNewDate ? theme.newDate : ''}`}
										>
											{items.map(item => {
												const level = item._timelineLevel || 0;
												const idValue = get(item, idName);
												const itemStart = get(item, startName);
												let end = get(item, endName) || endTimestamp;
												// if the task finished after the last displayed time,
												// we create a block that stops at the last displayed time
												if (end > endTimestamp) {
													end = endTimestamp;
												}
												const left = (itemStart - start) * remPerMs;
												const width = Math.max((end - itemStart) * remPerMs, MIN_DATA_WIDTH);
												const itemProps = dataItemProps(item);
												return (
													<GridData
														{...itemProps}
														id={idValue}
														key={idValue}
														style={{
															...itemProps.style,
															left: `${left}rem`,
															top: `${dataBottom + level * (DEFAULT_DATA_HEIGHT + dataBottom)}rem`,
															height: dataHeightUnit,
															width: `${width}rem`,
														}}
														onClick={onClick}
														item={item}
														dataItemPopover={dataItemPopover}
														dataItemTooltip={dataItemTooltip}
													/>
												);
											})}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
				<tfoot className={theme.timelineFooter} ref={scrollerRef}>
					<tr style={{ height: rowHeightUnit }}>
						<th scope="row" rowSpan="2" className={theme.timelineTitle}>
							<span className="sr-only">Groups</span>
						</th>
						{intervals.days.map(({ start, count }) => {
							const dateAsString = format(start, dayFormat, locale);
							return (
								<th
									scope="colgroup"
									colspan={count}
									key={start.getTime()}
									className={`${theme.timelineDate} ${theme.newDate}`}
								>
									{dateAsString}
									<span style={{ float: 'right' }}>{dateAsString}</span>
								</th>
							);
						})}
					</tr>
					<tr style={{ height: rowHeightUnit }}>
						{intervals.hours.map(({ start, isNewDate }) => (
							<th
								scope="col"
								key={start.getTime()}
								style={{ width: intervalWidthUnit }}
								className={isNewDate ? theme.newDate : undefined}
							>
								{format(start, timeFormat, locale)}
							</th>
						))}
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
