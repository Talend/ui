import React from 'react';
import InputDatePicker from '../InputDatePicker';
import { DateRangeContext } from '../DateRange/Context';
import Manager from './Manager';

function InputDateRangePicker2(props) {
	return (
		<Manager onChange={props.onChange}>
			<DateRangeContext.Consumer>
				{({ startDate, endDate, setStartRef, setEndRef, onChange, onFocus }) => (
					<div>
						<InputDatePicker
							value={startDate}
							endDate={endDate}
							onChange={onChange}
							onFocus={event => onFocus(event, 'startDate')}
							setRef={setStartRef}
						/>
						<InputDatePicker
							value={endDate}
							startDate={startDate}
							onChange={onChange}
							onFocus={event => onFocus(event, 'endDate')}
							setRef={setEndRef}
						/>
					</div>
				)}
			</DateRangeContext.Consumer>
		</Manager>
	);
}

export default InputDateRangePicker2;
