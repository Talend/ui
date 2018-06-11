import React from 'react';
import PropTypes from 'prop-types';
import theme from './DatePicker.scss';

function DatePicker(props) {
	const dayNames = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
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

	return (
		<div className={theme.container}>
			<div className={theme['calendar-header']}>
				{dayNames.map((dayName, i) =>
					<abbr className={theme['day-item']} key={i}>{dayName}</abbr>
				)}
			</div>
			<hr className={theme.separator} />
			<div className={theme['calendar-body']}>
				{weeks.map((week, i) =>
					<div className={theme.week} key={i}>
						{week.map((day, j) =>
							<div className={theme['day-item']} key={j}>
								{day.number}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

DatePicker.propTypes = {
};

export default DatePicker;
