import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'lodash/memoize';
import theme from './DatePicker.scss';
import DayPickerAction from './DayPickerAction';

class DatePicker extends React.Component {

	static buildWeeks(year, monthIndex) {
		const days = (new Array(7))
						.fill(0)
						.map((_, i) => i + 1);

		return (new Array(4))
			.fill(0)
			.map((_, i) =>
				days.map(x => ({
					number: x + (i * 7),
				}))
			);
	}

	constructor(props) {
		super(props);

		this.dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

		this.getWeeks = memoize(DatePicker.buildWeeks, (year, monthIndex) => `${year}-${monthIndex}`);

		this.selectedDay = 12;
		this.currentDay = 20;
		this.disabledDays = [6, 15];
	}

	isSelectedDay(n) {
		return this.selectedDay === n;
	}

	isCurrentDay(n) {
		return this.currentDay === n;
	}

	isDisabledDay(n) {
		return this.disabledDays.includes(n);
	}

	render() {
		const { year, monthIndex } = this.props.calendar;

		const weeks = this.getWeeks(year, monthIndex);

		return (
			<div className={theme.container}>
				<div className={classNames(theme['calendar-row'], theme['calendar-header-row'])}>
					{this.dayNames.map((dayName, i) =>
						<abbr
							className={theme['calendar-item']}
							key={i}
							title={dayName}
						>
							{dayName.charAt(0)}
						</abbr>
					)}
				</div>

				<hr className={theme.separator} />

				{weeks.map((week, i) =>
					<div
						className={classNames(theme['calendar-row'], theme['calendar-body-row'])}
						key={i}
					>
						{week.map((day, j) =>
							<div
								className={theme['calendar-item']}
								key={j}
							>
								<DayPickerAction
									label={day.number.toString()}
									isSelectedDay={this.isSelectedDay(day.number)}
									isDisabledDay={this.isDisabledDay(day.number)}
									isCurrentDay={this.isCurrentDay(day.number)}
									aria-label={this.isDisabledDay(day.number)
										? 'Unselectable date'
										: `Select '${day.number}'`}
								/>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

DatePicker.propTypes = {
	calendar: PropTypes.shape({
		monthIndex: PropTypes.number.isRequired,
		year: PropTypes.number.isRequired,
	}).isRequired,
};

export default DatePicker;
