/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import { date } from '@talend/utils';
import { WithCalendarGestureInjectedProps } from '../Gesture/propTypes';

const buildWeeks = date.buildWeeks;

type DayCalendarProps = WithCalendarGestureInjectedProps & {
	month: number;
	year: number;
};

function DayCalendar(props: DayCalendarProps) {
	const calendarRef = React.useRef<HTMLTableElement>(null);

	function isCurrentMonth(currentDate: Date) {
		return getMonth(currentDate) === props.month;
	}

	const { year, month, onKeyDown } = props;
	const weeks = buildWeeks(year, month);

	return (
		<table ref={calendarRef}>
			<tbody>
				{weeks.map((week, weekIndex) => (
					<tr key={weekIndex}>
						{week.map((dateOfTheWeek, dayIndex) => {
							if (getMonth(dateOfTheWeek) !== props.month) {
								return <td key={dayIndex} />;
							}
							const day = getDate(dateOfTheWeek);
							return (
								<td key={dayIndex}>
									<button
										data-test={isCurrentMonth(dateOfTheWeek) && day}
										data-value={isCurrentMonth(dateOfTheWeek) && day}
										onKeyDown={event => {
											if (calendarRef.current) {
												onKeyDown(event, calendarRef.current, day - 1);
											}
										}}
									>
										{day}
									</button>
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}

DayCalendar.displayName = 'DayCalendar';

export default DayCalendar;
