import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './DatePicker.scss';
import DayPickerAction from './DayPickerAction';

function DatePicker(props) {
	const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
	const days = (new Array(7))
					.fill(0)
					.map((_, i) => i + 1);

	const weeks = (new Array(4))
		.fill(0)
		.map((_, i) =>
			days.map(x => ({
				number: x + (i * 7),
			}))
		);

	const selectedDay = 12;
	const currentDay = 20;
	const disabledDays = [6, 15];

	function isSelectedDay(n) {
		return selectedDay === n;
	}

	function isCurrentDay(n) {
		return currentDay === n;
	}

	function isDisabledDay(n) {
		return disabledDays.includes(n);
	}

	return (
		<div className={theme.container}>
			<div className={classNames(theme['calendar-row'], theme['calendar-header-row'])}>
				{dayNames.map((dayName, i) =>
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
								isSelectedDay={isSelectedDay(day.number)}
								isDisabledDay={isDisabledDay(day.number)}
								isCurrentDay={isCurrentDay(day.number)}
								aria-label={isDisabledDay(day.number)
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

DatePicker.propTypes = {
};

export default DatePicker;
