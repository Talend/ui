import React from 'react';
import PropTypes from 'prop-types';

import InputDatePicker from '../InputDatePicker';
import InputTimePicker from '../InputTimePicker';

import DateTime from '../DateTime';
import { DateTimeContext } from '../DateTime/Context';

import theme from './InputDateTimePicker.scss';

function InputDateTimePicker(props) {
	return (
		<DateTime.Manager
			id={props.id}
			value={props.selectedDateTime}
			useSeconds={props.useSeconds}
			useUTC={props.useUTC}
			onChange={props.onChange}
		>
			<DateTimeContext.Consumer>
				{({ date, time, onDateChange, onTimeChange }) => {
					return (
						<div className={theme['pickers-container']}>
							<InputDatePicker
								id={`${props.id}-date-picker`}
								value={date}
								onChange={onDateChange}
								dateFormat={props.dateFormat}
							/>
							<InputTimePicker
								id={`${props.id}-time-picker`}
								value={time}
								onChange={onTimeChange}
								useSeconds={props.useSeconds}
							/>
						</div>
					);
				}}
			</DateTimeContext.Consumer>
		</DateTime.Manager>
	);
}
InputDateTimePicker.propTypes = {
	id: PropTypes.string.isRequired,
	selectedDateTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	readOnly: PropTypes.bool,
	dateFormat: PropTypes.string,
	useSeconds: PropTypes.bool,
	useUTC: PropTypes.bool,
};

InputDateTimePicker.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	useSeconds: false,
	useTime: false,
	useUTC: false,
	// default behaviour is to forbid empty values
	required: true,
};

export default InputDateTimePicker;
