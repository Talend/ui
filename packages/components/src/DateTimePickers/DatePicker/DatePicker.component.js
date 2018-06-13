import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './DatePicker.scss';

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

	function getClassIfSelected(n) {
		return selectedDay === n ? theme.selected : undefined;
	}

	function getClassIfCurrentDay(n) {
		return currentDay === n ? theme.today : undefined;
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
							className={classNames(
								theme['calendar-item'],
								getClassIfSelected(day.number),
								getClassIfCurrentDay(day.number),
							)}
							key={j}
						>
							<button
								className={theme['calendar-day-action']}
								disabled={isDisabledDay(day.number)}
								aria-label={isDisabledDay(day.number)
									? 'Unselectable date'
									: `Select '${day.number}'`}
							>
								{day.number}
							</button>
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
