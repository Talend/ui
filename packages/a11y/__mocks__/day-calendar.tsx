import React from 'react';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import { date } from '@talend/utils';

const buildWeeks = date.generator.buildWeeks;
// DayCalendar.propTypes = {
// 	onKeyDown: PropTypes.func.isRequired,
// 	month: PropTypes.number.isRequired,
// 	year: PropTypes.number.isRequired,
// };

class DayCalendar extends React.Component {
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
											data-test={this.isCurrentMonth(date) && day}
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

export default DayCalendar;
