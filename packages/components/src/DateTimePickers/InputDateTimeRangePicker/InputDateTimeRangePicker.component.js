import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'lodash/omit';

import Icon from '../../Icon';

import InputDateTimePicker from '../InputDateTimePicker';
import DateTimeRange from '../DateTimeRange';
import { DateTimeRangeContext } from '../DateTimeRange/Context';

import getDefaultT from '../../translate';

import theme from './InputDateTimeRangePicker.scss';

const PROPS_TO_OMIT_FOR_INPUT = [
	'id',
	'dateFormat',
	'onBlur',
	'onChange',
	'startDateTime',
	'endDateTime',
];

function InputDateTimeRangePicker(props) {
	const { id, dateFormat, useSeconds, onChange, onBlur } = props;
	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);

	const className = props.vertical
		? classnames(theme['range-picker-vertical'], 'range-picker-vertical')
		: classnames(theme['range-picker'], 'range-picker');

	return (
		<DateTimeRange.Manager
			startDateTime={props.startDateTime}
			endDateTime={props.endDateTime}
			onChange={onChange}
		>
			<DateTimeRangeContext.Consumer>
				{({ startDateTime, endDateTime, onStartChange, onEndChange }) => (
					<div className={className}>
						<div>
							<label htmlFor={props.id} className="control-label">
								{props.t('TC_DATE_PICKER_RANGE_FROM', { defaultValue: 'From' })}
							</label>
							<InputDateTimePicker
								{...inputProps}
								id={`${id}-start`}
								dateFormat={dateFormat}
								useSeconds={useSeconds}
								value={startDateTime}
								endDate={endDateTime}
								onChange={onStartChange}
								onBlur={onBlur}
							/>
						</div>
						<span className="arrow">
							<Icon name="talend-arrow-right" className="icon" />
						</span>
						<div>
							<label htmlFor={props.id} className="control-label">
								{props.t('TC_DATE_PICKER__RANGE_TO', { defaultValue: 'To' })}
							</label>
							<InputDateTimePicker
								{...inputProps}
								id={`${id}-end`}
								dateFormat={dateFormat}
								useSeconds={useSeconds}
								value={endDateTime}
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
	vertical: false,
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
	vertical: PropTypes.bool,
	t: PropTypes.func.isRequired,
};

export default InputDateTimeRangePicker;
