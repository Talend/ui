import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
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

	const [vertical, setVertical] = useState(false);
	const containerRef = useRef();

	const className = vertical
		? classnames(theme['range-picker-vertical'], 'range-picker-vertical')
		: classnames(theme['range-picker'], 'range-picker');

	function showHorizontalAndTest() {
		if (vertical) {
			setVertical(false);
		}
		// delay for the display to update
		setTimeout(() => {
			const rangeContainer = containerRef.current;
			if (rangeContainer && rangeContainer.scrollWidth > rangeContainer.offsetWidth) {
				setVertical(true);
			}
		});
	}

	useEffect(() => {
		const resizeListener = window.addEventListener('resize', debounce(showHorizontalAndTest, 200));
		return () => window.removeEventListener('resize', resizeListener);
	}, [showHorizontalAndTest]);

	useEffect(() => {
		showHorizontalAndTest();
	}, []);

	return (
		<DateTimeRange.Manager
			startDateTime={props.startDateTime}
			endDateTime={props.endDateTime}
			onChange={onChange}
		>
			<DateTimeRangeContext.Consumer>
				{({ startDateTime, endDateTime, onStartChange, onEndChange }) => (
					<div className={className} ref={containerRef}>
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
								defaultTimeValue={props.defaultTimeStart}
							/>
						</div>
						<span className={classnames(theme.arrow, 'arrow')}>
							<Icon name="talend-arrow-right" className={classnames(theme.icon, 'icon')} />
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
								defaultTimeValue={props.defaultTimeEnd}
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
	defaultTimeStart: InputDateTimePicker.propTypes.defaultTimeValue,
	defaultTimeEnd: InputDateTimePicker.propTypes.defaultTimeValue,
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
