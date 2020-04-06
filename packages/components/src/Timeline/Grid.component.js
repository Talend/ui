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

function getIntervals(startTimestamp, endTimestamp) {
	if (!startTimestamp || !endTimestamp) {
		return { days: [], hours: [] };
	}

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
		measures,
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

	return (
		<table className={theme.grid} style={{ position: 'relative', width: measures.total.widthUnit }}>
			<caption className={`${theme.timelineSticky} ${theme.timelineCaption}`}>{caption}</caption>
			<tbody className={theme.timelineRows} ref={scrollerRef}>
				{data.map(({ id, label, items, maxLevel = 0 }, groupIndex) => {
					const itemsPerInterval = getItemsPerInterval(items, intervals, startName);
					const height = `${(maxLevel + 1) * measures.row.height}rem`;
					return (
						<tr
							key={id}
							className={theme.timelineRow}
							style={{ height }}
							data-group-index={groupIndex}
						>
							<th scope="row" key={id} className={`${theme.timelineSticky} ${theme.timelineTitle}`}>
								{label}
							</th>
							{itemsPerInterval.map(({ start, isNewDate, items }) => {
								return (
									<td
										key={start}
										className={`${theme.timelineCell} ${isNewDate ? theme.newDate : ''}`}
										style={{ width: measures.hour.widthUnit }}
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
											const itemProps = dataItemProps(item);
											return (
												<GridData
													{...itemProps}
													id={idValue}
													key={idValue}
													measures={measures}
													style={{
														...itemProps.style,
														left: measures.data.getLeftUnit(itemStart - start),
														width: measures.data.getWidthUnit(end - itemStart),
														top: measures.data.getTopUnit(level),
														height: measures.data.heightUnit,
													}}
													onClick={onClick}
													item={item}
													start={start}
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
				<tr style={{ height: measures.row.heightUnit }}>
					<th scope="row" rowSpan="2" className={theme.timelineSticky}>
						<span className="sr-only">Groups</span>
					</th>
					{intervals.hours.map(({ start }) => (
						<th
							scope="col"
							key={start.getTime()}
							className={theme.timelineHour}
							style={{ width: measures.hour.widthUnit }}
						>
							{format(start, timeFormat, locale)}
						</th>
					))}
				</tr>
				<tr className={theme.timelineDates} style={{ height: measures.row.heightUnit }}>
					{intervals.days.map(({ start, count }) => {
						const dateAsString = format(start, dayFormat, locale);
						return (
							<th
								scope="colgroup"
								colSpan={count}
								key={start.getTime()}
								className={`${theme.timelineDate} ${theme.newDate}`}
								style={{ width: `${measures.hour.width * count}rem` }}
							>
								{dateAsString}
								{(zoom > 1 || count > 8) && <span>{dateAsString}</span>}
							</th>
						);
					})}
				</tr>
			</tfoot>
		</table>
	);
}
