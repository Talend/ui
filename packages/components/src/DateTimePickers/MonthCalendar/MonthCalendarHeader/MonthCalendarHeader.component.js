import React from 'react';
import PropTypes from 'prop-types';
import theme from './MonthCalendarHeader.scss';

function MonthCalendarHeader(props) {
	const dayNames = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
	return (
		<div className={theme.container}>
			{dayNames.map((dayName, i) =>
				<div className={theme['day-of-week']} key={i}>
					<abbr>{dayName}</abbr>
				</div>
			)}
		</div>
	);
}

MonthCalendarHeader.propTypes = {
};

export default MonthCalendarHeader;
