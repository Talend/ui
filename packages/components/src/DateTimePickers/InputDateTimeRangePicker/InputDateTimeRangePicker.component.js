import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

import InputDateTimePicker from '../InputDateTimePicker';
import DateTimeRange from '../DateTimeRange';
import { DateTimeRangeContext } from '../DateTimeRange/Context';

import theme from './InputDateTimeRangePicker.scss';

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
					<div className={theme['range-picker']}>
						<InputDateTimePicker
							selectedDateTime={startDateTime}
							endDate={endDateTime}
							onChange={onStartChange}
						/>
						<span className={theme.arrow}>
							<Icon name="talend-arrow-right" className={theme.icon} />
						</span>
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
