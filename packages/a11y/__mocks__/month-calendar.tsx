import React from 'react';
import { WithCalendarGestureInjectedProps } from '../src/Gesture/propTypes';

function MonthCalendar(props: WithCalendarGestureInjectedProps) {
	const calendarRef = React.useRef<HTMLTableElement>(null);
	const { onKeyDown } = props;
	return (
		<table ref={calendarRef}>
			<tbody>
				<tr>
					<td>
						<button
							data-value="0"
							data-test="0"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 0)}
						>
							JAN
						</button>
					</td>
					<td>
						<button
							data-value="1"
							data-test="1"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 1)}
						>
							FEB
						</button>
					</td>
					<td>
						<button
							data-value="2"
							data-test="2"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 2)}
						>
							MAR
						</button>
					</td>
				</tr>
				<tr>
					<td>
						<button
							data-value="3"
							data-test="3"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 3)}
						>
							APR
						</button>
					</td>
					<td>
						<button
							data-value="4"
							data-test="4"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 4)}
						>
							MAY
						</button>
					</td>
					<td>
						<button
							data-value="5"
							data-test="5"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 5)}
						>
							JUN
						</button>
					</td>
				</tr>
				<tr>
					<td>
						<button
							data-value="6"
							data-test="6"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 6)}
						>
							JULY
						</button>
					</td>
					<td>
						<button
							data-value="7"
							data-test="7"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 7)}
						>
							AUG
						</button>
					</td>
					<td>
						<button
							data-value="8"
							data-test="8"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 8)}
						>
							SEP
						</button>
					</td>
				</tr>
				<tr>
					<td>
						<button
							data-value="9"
							data-test="9"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 9)}
						>
							OCT
						</button>
					</td>
					<td>
						<button
							data-value="10"
							data-test="10"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 10)}
						>
							NOV
						</button>
					</td>
					<td>
						<button
							data-value="11"
							data-test="11"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 11)}
						>
							DEC
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	);
}
MonthCalendar.displayName = 'MonthCalendar';

export default MonthCalendar;
