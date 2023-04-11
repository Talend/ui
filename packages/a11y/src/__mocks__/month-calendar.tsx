import { useRef } from 'react';
import { WithCalendarGestureInjectedProps } from '../Gesture/propTypes';

function MonthCalendar(props: WithCalendarGestureInjectedProps) {
	const calendarRef = useRef<HTMLTableElement>(null);
	const { onKeyDown } = props;
	return (
		<table ref={calendarRef}>
			<tbody>
				<tr>
					<td>
						<button
							data-value="0"
							data-testid="0"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 0)}
						>
							JAN
						</button>
					</td>
					<td>
						<button
							data-value="1"
							data-testid="1"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 1)}
						>
							FEB
						</button>
					</td>
					<td>
						<button
							data-value="2"
							data-testid="2"
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
							data-testid="3"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 3)}
						>
							APR
						</button>
					</td>
					<td>
						<button
							data-value="4"
							data-testid="4"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 4)}
						>
							MAY
						</button>
					</td>
					<td>
						<button
							data-value="5"
							data-testid="5"
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
							data-testid="6"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 6)}
						>
							JULY
						</button>
					</td>
					<td>
						<button
							data-value="7"
							data-testid="7"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 7)}
						>
							AUG
						</button>
					</td>
					<td>
						<button
							data-value="8"
							data-testid="8"
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
							data-testid="9"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 9)}
						>
							OCT
						</button>
					</td>
					<td>
						<button
							data-value="10"
							data-testid="10"
							onKeyDown={event => onKeyDown(event, calendarRef.current, 10)}
						>
							NOV
						</button>
					</td>
					<td>
						<button
							data-value="11"
							data-testid="11"
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
