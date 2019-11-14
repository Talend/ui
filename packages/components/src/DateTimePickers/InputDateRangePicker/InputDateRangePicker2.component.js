import React from 'react';
import InputDatePicker from '../InputDatePicker';
import { DateRangeContext } from '../DateRange/Context';
import Manager from './Manager';

function InputDateRangePicker2(props) {
	return (
		<Manager onChange={props.onChange}>
			<DateRangeContext.Consumer>
				{({ startDate, endDate, onStartChange, onEndChange, onFocus, focusedInput }) => (
					<div>
						<InputDatePicker
							value={startDate}
							endDate={endDate}
							onChange={onStartChange}
							onFocus={event => onFocus(event, 'startDate')}
							focused={focusedInput === 'startDate'}
						/>
						<InputDatePicker
							value={endDate}
							startDate={startDate}
							onChange={onEndChange}
							onFocus={event => onFocus(event, 'endDate')}
							focused={focusedInput === 'endDate'}
						/>
					</div>
				)}
			</DateRangeContext.Consumer>
		</Manager>
	);
}

export default InputDateRangePicker2;
