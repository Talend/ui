import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputDateRangePicker from '../DateTimePickers/InputDateRangePicker';
import { useTimelineContext } from './context';

function getTimestampRange(startDate, endDate) {
	const startTimestamp = startDate instanceof Date ? startDate.getTime() : startDate;
	const endTimestamp = endDate instanceof Date ? endDate.getTime() : endDate;
	return [startTimestamp, endTimestamp];
}
export default function DateFilter({ initialStart, initialEnd, ...restProps }) {
	const { timeRange, setTimeRange } = useTimelineContext();

	useState(() => {
		if (initialStart || initialEnd) {
			setTimeRange(getTimestampRange(initialStart, initialEnd));
		}
	}, []);

	const onChange = (_, payload) => {
		const { startDate, endDate, errors } = payload;
		if (!errors.length) {
			setTimeRange(getTimestampRange(startDate, endDate));
		}
	};

	return (
		<form style={{ marginLeft: 'auto' }}>
			<InputDateRangePicker
				startDate={new Date(timeRange[0])}
				endDate={new Date(timeRange[1])}
				onChange={onChange}
				{...restProps}
			/>
		</form>
	);
}

DateFilter.propTypes = {
	initialStart: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
	initialEnd: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
};
