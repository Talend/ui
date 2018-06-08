import React from 'react';
import PropTypes from 'prop-types';
import theme from './CalendarBody.scss';

function CalendarBody(props) {
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
			{weeks.map((week, i) =>
				<div className={theme.week} key={i}>
					{week.map((day, j) =>
						<div className={theme.day} key={j}>
							{day.number}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

CalendarBody.propTypes = {

};

export default CalendarBody;
