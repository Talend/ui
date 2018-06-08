import React from 'react';
import PropTypes from 'prop-types';
import theme from './DateTimePicker.scss';
import PickerHeader from '../PickerHeader';
import DateTimeView from '../DateTimeView';
import MonthYearView from '../MonthYearView';

function DateTimePicker(props) {
	const isCalendarView = false;
	const viewComponent = isCalendarView
		? <DateTimeView />
		: <MonthYearView />;

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
