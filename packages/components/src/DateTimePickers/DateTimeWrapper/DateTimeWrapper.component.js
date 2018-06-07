import React from 'react';
import PropTypes from 'prop-types';
import MonthCalendar from '../MonthCalendar';

function DateTimeWrapper(props) {
	return (
		<div>
			<MonthCalendar />
		</div>
	);
}

DateTimeWrapper.propTypes = {
};

export default DateTimeWrapper;
