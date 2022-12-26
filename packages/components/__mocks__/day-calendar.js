import { Component } from 'react';
import PropTypes from 'prop-types';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import { buildWeeks } from '../src/DateTimePickers/generator';

class DayCalendar extends Component {
	isCurrentMonth(date) {
		return getMonth(date) === this.props.month;
	}

	render() {
		const { year, month, onKeyDown } = this.props;
		const weeks = buildWeeks(year, month);
		return (
			<table
				ref={ref => {
					this.calendarRef = ref;
				}}
			>
				<tbody>
					{weeks.map((week, weekIndex) => (
						<tr key={weekIndex}>
							{week.map((date, dayIndex) => {
								if (getMonth(date) !== this.props.month) {
									return <td key={dayIndex} />;
								}
								const day = getDate(date);
								return (
									<td key={dayIndex}>
										<button
											data-value={this.isCurrentMonth(date) && day}
											onKeyDown={event => onKeyDown(event, this.calendarRef, day - 1)}
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
}
DayCalendar.displayName = 'DayCalendar';
DayCalendar.propTypes = {
	onKeyDown: PropTypes.func.isRequired,
	month: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
};

export default DayCalendar;
