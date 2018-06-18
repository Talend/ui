import React from 'react';
import PropTypes from 'prop-types';
import theme from './DateTimePicker.scss';
import DateTimeView from '../views/DateTimeView';
import MonthYearView from '../views/MonthYearView';

function DateTimePicker(props) {
	const isCalendarView = true;
	const viewComponent = isCalendarView
		? <DateTimeView />
		: <MonthYearView />;

	return (
		<div className={theme.container}>
			{viewComponent}
		</div>
	);
}

DateTimePicker.propTypes = {
};

export default DateTimePicker;
