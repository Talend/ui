import React, { useEffect } from 'react';
import get from 'lodash/get';

import GridData from './GridData.component';

import { useTimelineContext } from './context';

import theme from './Grid.scss';

function getItemsPerInterval(items, intervals, startName) {
	return intervals.map(({ start, end, isNewDate }) => ({
		start,
		isNewDate,
		items: items.filter((item) => get(item, startName) >= start && get(item, startName) < end),
	}));
}
export default function Grid() {
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
		scale,
	} = useTimelineContext();
	const [, endTimestamp] = timeRange;

	return (
		<table className={theme.grid} style={{ position: 'relative', width: measures.total.widthUnit }}>
			<caption className={`${theme.timelineSticky} ${theme.timelineCaption}`}>{caption}</caption>
			<tbody className={theme.timelineRows}>
				{data.map(({ id, label, items, maxLevel = 0 }, groupIndex) => {
					const itemsPerInterval = getItemsPerInterval(items, scale.intervals.timeUnits, startName);
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
										style={{ width: measures.timeUnit.widthUnit }}
									>
										{items.map((item) => {
											const level = item._timelineLevel || 0;
											const idValue = get(item, idName);
											const itemStart = get(item, startName);
											let end = get(item, endName) || endTimestamp;
											// if the task finished after the last displayed time,
											// we create a block that stops at the last displayed time
											const endsOverFlow = end > endTimestamp;
											if (endsOverFlow) {
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
													endsOverFlow={endsOverFlow}
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
			<tfoot className={theme.timelineFooter}>
				<tr style={{ height: measures.row.heightUnit }}>
					<th scope="row" rowSpan="2" className={theme.timelineSticky}>
						<span className="sr-only">Groups</span>
					</th>
					{scale.intervals.timeUnits.map(({ start, startLabels }, index) => (
						<th
							scope="col"
							key={start}
							className={theme.timelineUnit}
							style={{ width: measures.timeUnit.widthUnit }}
						>
							{measures.timeUnit.width >= 5 || index === 0 ? startLabels.long : startLabels.short}
						</th>
					))}
				</tr>
				<tr className={theme.timelineDates} style={{ height: measures.row.heightUnit }}>
					{scale.intervals.days.map(({ start, count, label }) => {
						return (
							<th
								scope="colgroup"
								colSpan={count}
								key={start}
								className={`${theme.timelineDate} ${theme.newDate}`}
								style={{ width: `${measures.timeUnit.width * count}rem` }}
							>
								{label}
								{(zoom > 1 || count > 8) && <span>{label}</span>}
							</th>
						);
					})}
				</tr>
			</tfoot>
		</table>
	);
}
