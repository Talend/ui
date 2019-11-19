import React, { useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';

import { DateRangeContext } from '../Context';
import InputSizer from '../../shared/InputSizer';

function Input(props, ref) {
	const { date, onChange, onFocus, label } = props;
	const { inputManagement } = useContext(DateRangeContext);
	const { placeholder } = inputManagement;

	return (
		<div>
			<label htmlFor={props.id} className="control-label">
				{label}
			</label>
			<InputSizer placeholder={placeholder} inputText={date.value ? date.textInput : ''}>
				{width => (
					<DebounceInput
						id={props.id}
						autoComplete="off"
						className="form-control"
						debounceTimeout={300}
						type="text"
						placeholder={placeholder}
						value={date.textInput}
						style={{ width }}
						onChange={onChange}
						onFocus={onFocus}
						inputRef={ref}
					/>
				)}
			</InputSizer>
		</div>
	);
}

Input.displayName = 'DateRange.Input';
Input.propTypes = {
	id: PropTypes.string,
	date: PropTypes.object,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	label: PropTypes.string,
};

export default forwardRef(Input);
