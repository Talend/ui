import React from 'react';
import PropTypes from 'prop-types';
import MonthCalendarHeader from './MonthCalendarHeader';
import MonthCalendarDays from './MonthCalendarDays';
import theme from './MonthCalendar.scss';

function MonthCalendar(props) {
	return (
		<div className={theme.container}>
			<MonthCalendarHeader />
			<hr className={theme.separator} />
			<MonthCalendarDays />
		</div>
	);
}

MonthCalendar.propTypes = {
};

export default MonthCalendar;
