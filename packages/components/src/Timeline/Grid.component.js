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
const DEFAULT_DAY_LENGTH = 150; // rem
const DEFAULT_HEIGHT = 4; // rem
const DEFAULT_DATA_HEIGHT = 3; //rem
const MIN_DATA_WIDTH = 0.3; // rem

const HOURS = new Array(24).fill(0).map((_, index) => index);

const headerHeight = DEFAULT_HEIGHT * 2;
const headerHeightUnit = `${headerHeight}rem`;
const rowHeight = DEFAULT_HEIGHT;
const rowHeightUnit = `${rowHeight}rem`;
const dataHeight = DEFAULT_DATA_HEIGHT;
const dataHeightUnit = `${dataHeight}rem`;
const dataTop = (rowHeight - dataHeight) / 2;

export default function Grid(props) {
	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);
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
		onClick,
		dataItemPopover,
		dataItemTooltip,
		zoom,
	} = useTimelineContext();

	const [startTimestamp, endTimestamp] = timeRange;
	const dayWidth = DEFAULT_DAY_LENGTH * zoom;
	const dayWidthUnit = `${dayWidth}rem`;
	const hourWidthUnit = `${dayWidth / 24}rem`;
	const remPerMs = dayWidth / MILLISECONDS_IN_DAY;

	const totalDataLevels = data.reduce((accu, group) => accu + 1 + group.maxLevel, 0);
	const totalHeightUnit = `${totalDataLevels * DEFAULT_HEIGHT + headerHeight}rem`;
	const totalWidthUnit = `${(endTimestamp - startTimestamp) * remPerMs}rem`;

	const days = [];
	let marker = startTimestamp;
	do {
		days.push(marker);
		marker += MILLISECONDS_IN_DAY;
	} while (marker < endTimestamp);

	const onKeyDown = (event, groupIndex, itemIndex) => {
		let nextItemIndex;
		if (event.keyCode === keycode.codes.left && itemIndex > 0) {
			nextItemIndex = itemIndex - 1;
		} else if (event.keyCode === keycode.codes.right) {
			nextItemIndex = itemIndex + 1;
		}

		if (nextItemIndex === undefined || !scrollerRef.current) {
			return;
		}
		const nextItem = scrollerRef.current.querySelector(
			`[data-group-index="${groupIndex}"] [data-item-index="${nextItemIndex}"]`,
		);
		if (nextItem) {
			event.preventDefault();
			nextItem.focus();
		}
	};

	return (
		<div className={theme.grid}>
			<div className={theme.titles} style={{ height: totalHeightUnit }}>
				<div
					role="presentation"
					className={`${theme.title}`}
					style={{ height: headerHeightUnit }}
				/>
				{data.map(({ id, label, maxLevel = 0 }) => (
					<div
						key={id}
						className={theme.title}
						style={{ height: `${(maxLevel + 1) * rowHeight}rem` }}
					>
						{label}
					</div>
				))}
			</div>
			<div className={theme.rows} style={{ height: totalHeightUnit }} ref={scrollerRef}>
				<div
					role="presentation"
					className={`${theme.header}`}
					style={{ height: rowHeightUnit, width: totalWidthUnit }}
				>
					{days.map(day => (
						<div
							key={day}
							className={theme.day}
							style={{ width: dayWidthUnit, height: rowHeightUnit }}
						>
							{format(day, 'DD MMM', locale)}
						</div>
					))}
				</div>
				<div
					role="presentation"
					className={`${theme.header}`}
					style={{ height: rowHeightUnit, width: totalWidthUnit, top: rowHeightUnit }}
				>
					{days.map(_ =>
						HOURS.map(hour => (
							<div
								key={hour}
								className={theme.hour}
								style={{ width: hourWidthUnit, height: rowHeightUnit }}
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
					const top = `${topLevels * rowHeight + headerHeight}rem`;
					return (
						<ol
							key={id}
							className={theme.row}
							style={{ top, height: `${(maxLevel + 1) * rowHeight}rem`, width: totalWidthUnit }}
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
								const left = (start - startTimestamp) * remPerMs;
								const width = Math.max((end - start) * remPerMs, MIN_DATA_WIDTH);
								const itemProps = dataItemProps(item);

								return (
									<li key={id}>
										<GridData
											{...itemProps}
											id={id}
											style={{
												...itemProps.style,
												left: `${left}rem`,
												top: `${dataTop + level * (dataHeight + dataTop)}rem`,
												height: dataHeightUnit,
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
		</div>
	);
}
