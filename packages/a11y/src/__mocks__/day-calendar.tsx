/* eslint-disable import/no-extraneous-dependencies */
import { useRef } from 'react';

import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';

import { date } from '@talend/utils';

import { WithCalendarGestureInjectedProps } from '../Gesture/propTypes';

const buildWeeks = date.buildWeeks;

type DayCalendarProps = WithCalendarGestureInjectedProps & {
	month: number;
	year: number;
};

function DayCalendar(props: DayCalendarProps) {
	const calendarRef = useRef<HTMLTableElement>(null);

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
										data-testid={isCurrentMonth(dateOfTheWeek) && day}
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
