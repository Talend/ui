import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import keycode from 'keycode';
import get from 'lodash/get';
import getLocale from '../DateFnsLocale/locale';
import GridData from './GridData.component';

import { useTimelineContext } from './context';

import theme from './Grid.scss';

const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const HOURS = new Array(24).fill(0).map((_, index) => index);

const getDays = ([startTimestamp, endTimestamp]) => {
	const days = [];
	let marker = startTimestamp;
	do {
		days.push(marker);
		marker += MILLISECONDS_IN_DAY;
	} while (marker < endTimestamp);
	return days;
};

export default function GridRows(props) {
	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);
	const rowsRef = React.createRef();

	useEffect(() => {
		if (rowsRef.current) {
			rowsRef.current.scrollLeft = rowsRef.current.scrollWidth - rowsRef.current.offsetWidth;
		}
	}, [rowsRef.current]);

	const {
		data,
		timeRange,
		idName,
		startName,
		endName,
		dataItemProps,
		onClick,
		dataItemPopover,
		dataItemTooltip,
		zoom,
		measures,
	} = useTimelineContext();

	const [startTimestamp, endTimestamp] = timeRange;
	const days = getDays(timeRange);

	const onKeyDown = (event, groupIndex, itemIndex) => {
		let nextItemIndex;
		if (event.keyCode === keycode.codes.left && itemIndex > 0) {
			nextItemIndex = itemIndex - 1;
		} else if (event.keyCode === keycode.codes.right) {
			nextItemIndex = itemIndex + 1;
		}

		if (nextItemIndex === undefined || !rowsRef.current) {
			return;
		}
		const nextItem = rowsRef.current.querySelector(
			`[data-group-index="${groupIndex}"] [data-item-index="${nextItemIndex}"]`,
		);
		if (nextItem) {
			event.preventDefault();
			nextItem.focus();
		}
	};

	return (
		<div className={theme.rows} style={{ height: measures.total.heightUnit }} ref={rowsRef}>
			<div
				role="presentation"
				className={`${theme.header}`}
				style={{ height: measures.row.heightUnit, width: measures.total.widthUnit }}
			>
				{days.map(day => (
					<div
						key={day}
						className={theme.day}
						style={{ width: measures.header.day.widthUnit, height: measures.row.heightUnit }}
					>
						{format(day, 'DD MMM', locale)}
					</div>
				))}
			</div>
			<div
				role="presentation"
				className={`${theme.header}`}
				style={{
					height: measures.row.heightUnit,
					width: measures.total.widthUnit,
					top: measures.row.heightUnit,
				}}
			>
				{days.map(_ =>
					HOURS.map(hour => (
						<div
							key={hour}
							className={theme.hour}
							style={{ width: measures.header.hour.widthUnit, height: measures.row.heightUnit }}
						>
							{hour}
						</div>
					)),
				)}
			</div>
			{data.map(({ id, label, items, maxLevel = 0 }, groupIndex) => {
				const topLevels = data
					.filter((_, topGroupIndex) => topGroupIndex < groupIndex)
					.reduce((accu, { maxLevel }) => accu + 1 + maxLevel, 0);
				const top = `${topLevels * measures.row.height + measures.header.height}rem`;
				return (
					<ol
						key={id}
						className={theme.row}
						style={{
							top,
							height: `${(maxLevel + 1) * measures.row.height}rem`,
							width: measures.total.widthUnit,
						}}
						data-group-index={groupIndex}
						aria-label={label}
					>
						{items.map((item, itemIndex) => {
							const level = item._timelineLevel || 0;
							const id = get(item, idName);
							const start = get(item, startName);
							let end = get(item, endName) || endTimestamp;
							// if the task finished after the last displayed time, we create a block that stops at the last displayed time
							if (end > endTimestamp) {
								end = endTimestamp;
							}
							const left = (start - startTimestamp) * measures.remPerMs;
							const width = Math.max((end - start) * measures.remPerMs, measures.data.minWidth);
							const itemProps = dataItemProps(item);

							return (
								<li key={id}>
									<GridData
										{...itemProps}
										id={id}
										style={{
											...itemProps.style,
											left: `${left}rem`,
											top: `${measures.data.top +
												level * (measures.data.height + measures.data.top)}rem`,
											height: measures.data.heightUnit,
											width: `${width}rem`,
										}}
										onClick={onClick}
										tabIndex={itemIndex === 0 ? 0 : -1}
										onKeyDown={event => onKeyDown(event, groupIndex, itemIndex)}
										data-item-index={itemIndex}
										item={item}
										dataItemPopover={dataItemPopover}
										dataItemTooltip={dataItemTooltip}
									/>
								</li>
							);
						})}
					</ol>
				);
			})}
		</div>
	);
}
