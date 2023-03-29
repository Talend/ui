import React from 'react';
import PropTypes from 'prop-types';

class MonthCalendar extends React.Component {
	render() {
		const { onKeyDown } = this.props;
		return (
			<table
				ref={ref => {
					this.calendarRef = ref;
				}}
			>
				<tbody>
					<tr>
						<td>
							<button
								data-value="0"
								data-test="0"
								onKeyDown={event => onKeyDown(event, this.calendarRef, 0)}
							>
								JAN
							</button>
						</td>
						<td>
							<button
								data-value="1"
								data-test="1"
								onKeyDown={event => onKeyDown(event, this.calendarRef, 1)}
							>
								FEB
							</button>
						</td>
						<td>
							<button
								data-value="2"
								data-test="2"
								onKeyDown={event => onKeyDown(event, this.calendarRef, 2)}
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
								onKeyDown={event => onKeyDown(event, this.calendarRef, 3)}
							>
								APR
							</button>
						</td>
						<td>
							<button
								data-value="4"
								data-test="4"
								onKeyDown={event => onKeyDown(event, this.calendarRef, 4)}
							>
								MAY
							</button>
						</td>
						<td>
							<button
								data-value="5"
								data-test="5"
								onKeyDown={event => onKeyDown(event, this.calendarRef, 5)}
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
								onKeyDown={event => onKeyDown(event, this.calendarRef, 6)}
							>
								JULY
							</button>
						</td>
						<td>
							<button
								data-value="7"
								data-test="7"
								onKeyDown={event => onKeyDown(event, this.calendarRef, 7)}
							>
								AUG
							</button>
						</td>
						<td>
							<button
								data-value="8"
								data-test="8"
								onKeyDown={event => onKeyDown(event, this.calendarRef, 8)}
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
								onKeyDown={event => onKeyDown(event, this.calendarRef, 9)}
							>
								OCT
							</button>
						</td>
						<td>
							<button
								data-value="10"
								data-test="10"
								onKeyDown={event => onKeyDown(event, this.calendarRef, 10)}
							>
								NOV
							</button>
						</td>
						<td>
							<button
								data-value="11"
								data-test="11"
								onKeyDown={event => onKeyDown(event, this.calendarRef, 11)}
							>
								DEC
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}
MonthCalendar.displayName = 'MonthCalendar';
MonthCalendar.propTypes = {
	onKeyDown: PropTypes.func.isRequired,
};

export default MonthCalendar;
