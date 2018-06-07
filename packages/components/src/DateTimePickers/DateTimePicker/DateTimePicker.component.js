import React from 'react';
import PropTypes from 'prop-types';
import theme from './DateTimePicker.scss';
import PickerHeader from '../PickerHeader';
import DateTimeWrapper from '../DateTimeWrapper';
import MonthYearWrapper from '../MonthYearWrapper';

function DateTimePicker(props) {
	const isCalendarView = false;
	const viewComponent = isCalendarView
		? <DateTimeWrapper />
		: <MonthYearWrapper />;

	return (
		<div className={theme.container}>
			<div className={theme.header}>
				<PickerHeader />
			</div>
			<div className={theme.view}>
				{viewComponent}
			</div>
		</div>
	);
}

DateTimePicker.propTypes = {
};

export default DateTimePicker;
