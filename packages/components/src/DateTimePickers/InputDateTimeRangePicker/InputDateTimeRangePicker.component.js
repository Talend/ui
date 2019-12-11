import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '../../Icon';

import InputDateTimePicker from '../InputDateTimePicker';
import DateTimeRange from '../DateTimeRange';
import { DateTimeRangeContext } from '../DateTimeRange/Context';

import getDefaultT from '../../translate';

import theme from './InputDateTimeRangePicker.scss';

function InputDateTimeRangePicker(props) {
	const { id, dateFormat, useSeconds, onChange, onBlur } = props;
	return (
		<DateTimeRange.Manager
			startDateTime={props.startDateTime}
			endDateTime={props.endDateTime}
			onChange={onChange}
		>
			<DateTimeRangeContext.Consumer>
				{({ startDateTime, endDateTime, onStartChange, onEndChange }) => (
					<div className={classnames(theme['range-picker'], 'range-picker')}>
						<div>
							<label htmlFor={props.id} className="control-label">
								{props.t('TC_DATE_PICKER_RANGE_FROM', { defaultValue: 'From' })}
							</label>
							<InputDateTimePicker
								id={`${id}-start`}
								dateFormat={dateFormat}
								useSeconds={useSeconds}
								selectedDateTime={startDateTime}
								endDate={endDateTime}
								onChange={onStartChange}
								onBlur={onBlur}
							/>
						</div>
						<span className={theme.arrow}>
							<Icon name="talend-arrow-right" className={theme.icon} />
						</span>
						<div>
							<label htmlFor={props.id} className="control-label">
								{props.t('TC_DATE_PICKER__RANGE_TO', { defaultValue: 'To' })}
							</label>
							<InputDateTimePicker
								id={`${id}-end`}
								dateFormat={dateFormat}
								useSeconds={useSeconds}
								selectedDateTime={endDateTime}
								startDate={startDateTime}
								onChange={onEndChange}
								onBlur={onBlur}
							/>
						</div>
					</div>
				)}
			</DateTimeRangeContext.Consumer>
		</DateTimeRange.Manager>
	);
}
InputDateTimeRangePicker.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	t: getDefaultT(),
};

InputDateTimeRangePicker.propTypes = {
	id: PropTypes.string.isRequired,
	dateFormat: PropTypes.string,
	useSeconds: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
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
	t: PropTypes.func.isRequired,
};

export default InputDateTimeRangePicker;
