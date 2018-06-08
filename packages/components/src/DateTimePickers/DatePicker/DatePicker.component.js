import React from 'react';
import PropTypes from 'prop-types';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import theme from './DatePicker.scss';

function DatePicker(props) {
	return (
		<div className={theme.container}>
			<CalendarHeader />
			<hr className={theme.separator} />
			<CalendarBody />
		</div>
	);
}

DatePicker.propTypes = {
};

export default DatePicker;
