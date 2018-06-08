import React from 'react';
import PropTypes from 'prop-types';
import theme from './DateTimePicker.scss';
import DateTimeView from '../DateTimeView';
import MonthYearView from '../MonthYearView';

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
