import React from 'react';
import PropTypes from 'prop-types';
import InputDateTimePicker from '../InputDateTimePicker';
import DateTimeRange from '../DateTimeRange';
import { DateTimeRangeContext } from '../DateTimeRange/Context';

function InputDateTimeRangePicker(props) {
	const { onChange } = props;
	return (
		<DateTimeRange.Manager
			startDateTime={props.startDateTime}
			endDateTime={props.endDateTime}
			onChange={onChange}
		>
			<DateTimeRangeContext.Consumer>
				{({ startDateTime, endDateTime, onStartChange, onEndChange }) => (
					<div>
						<InputDateTimePicker
							selectedDateTime={startDateTime}
							endDate={endDateTime}
							onChange={onStartChange}
						/>
						<InputDateTimePicker
							selectedDateTime={endDateTime}
							startDate={startDateTime}
							onChange={onEndChange}
						/>
					</div>
				)}
			</DateTimeRangeContext.Consumer>
		</DateTimeRange.Manager>
	);
}

InputDateTimeRangePicker.propTypes = {
	// id: PropTypes.string.isRequired,
	// dateFormat: PropTypes.string,
	onChange: PropTypes.func,
	// onBlur: PropTypes.func,
	startDateTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
	endDateTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
	// t: PropTypes.func.isRequired,
};

export default InputDateTimeRangePicker;
