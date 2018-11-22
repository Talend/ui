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
							<button onKeyDown={event => onKeyDown(event, this.calendarRef, 0)}>JAN</button>
						</td>
						<td>
							<button onKeyDown={event => onKeyDown(event, this.calendarRef, 1)}>FEB</button>
						</td>
						<td>
							<button onKeyDown={event => onKeyDown(event, this.calendarRef, 2)}>MAR</button>
						</td>
					</tr>
					<tr>
						<td>
							<button onKeyDown={event => onKeyDown(event, this.calendarRef, 3)}>APR</button>
						</td>
						<td>
							<button onKeyDown={event => onKeyDown(event, this.calendarRef, 4)}>MAY</button>
						</td>
						<td>
							<button onKeyDown={event => onKeyDown(event, this.calendarRef, 5)}>JUN</button>
						</td>
					</tr>
					<tr>
						<td>
							<button onKeyDown={event => onKeyDown(event, this.calendarRef, 6)}>JULY</button>
						</td>
						<td>
							<button onKeyDown={event => onKeyDown(event, this.calendarRef, 7)}>AUG</button>
						</td>
						<td>
							<button onKeyDown={event => onKeyDown(event, this.calendarRef, 8)}>SEP</button>
						</td>
					</tr>
					<tr>
						<td>
							<button onKeyDown={event => onKeyDown(event, this.calendarRef, 9)}>OCT</button>
						</td>
						<td>
							<button onKeyDown={event => onKeyDown(event, this.calendarRef, 10)}>NOV</button>
						</td>
						<td>
							<button onKeyDown={event => onKeyDown(event, this.calendarRef, 11)}>DEC</button>
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
