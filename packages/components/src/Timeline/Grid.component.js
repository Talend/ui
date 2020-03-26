import React, { useEffect, useMemo } from 'react';
import get from 'lodash/get';
import format from 'date-fns/format';
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

function intervals(startTimestamp, endTimestamp) {
	return new Array((endTimestamp - startTimestamp) / MILLISECONDS_IN_HOUR)
		.fill(0)
		.map((_, index) => startTimestamp + index * MILLISECONDS_IN_HOUR);
}

function updateItems(items, currentIntervals, startName) {
	const itemPerInterval = [];
	currentIntervals.forEach(time => {
		itemPerInterval.push({
			time,
			items: items.filter(
				item => get(item, startName) > time && get(item, startName) < time + MILLISECONDS_IN_HOUR,
			),
		});
	});
	return itemPerInterval;
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

	const [startTimestamp, endTimestamp] = timeRange;
	const dayWidth = DEFAULT_DAY_LENGTH * zoom;
	const intervalWidthUnit = `${dayWidth / 24}rem`;
	const remPerMs = dayWidth / 24 / MILLISECONDS_IN_HOUR;

	const totalDataLevels = data.reduce((accu, group) => accu + 1 + group.maxLevel, 0);
	const totalHeightUnit = `${totalDataLevels * DEFAULT_HEIGHT + headerHeight}rem`;
	const totalWidthUnit = `${(endTimestamp - startTimestamp) * remPerMs}rem`;

	return (
		<table className={theme.grid} style={{ position: 'relative', width: totalWidthUnit }}>
			<caption className={theme.timelineCaption}>{caption}</caption>
			<tbody className={theme.timelineRows} style={{ height: totalHeightUnit }} ref={scrollerRef}>
				{data.map(({ id, label, items, maxLevel = 0 }, groupIndex) => {
					const itemsPerInterval = updateItems(
						items,
						intervals(startTimestamp, endTimestamp),
						startName,
					);
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
							{itemsPerInterval.map(itemPerInterval => {
								return (
									<td key={itemPerInterval.time} className={theme.timelineCell}>
										{itemPerInterval.items.map(item => {
											const level = item._timelineLevel || 0;
											const idValue = get(item, idName);
											const start = get(item, startName);
											let end = get(item, endName) || endTimestamp;
											// if the task finished after the last displayed time,
											// we create a block that stops at the last displayed time
											if (end > endTimestamp) {
												end = endTimestamp;
											}
											const left = (start - itemPerInterval.time) * remPerMs;
											const width = Math.max((end - start) * remPerMs, MIN_DATA_WIDTH);
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
					<th scope="row" className={theme.timelineTitle}>
						<span className="sr-only">Time</span>
					</th>
					{intervals(startTimestamp, endTimestamp).map(interval => (
						<th
							scope="col"
							key={interval}
							className={theme.timelineInterval}
							style={{ width: intervalWidthUnit }}
						>
							{format(new Date(interval), timeFormat, locale)}
						</th>
					))}
				</tr>
			</tfoot>
		</table>
	);
}
