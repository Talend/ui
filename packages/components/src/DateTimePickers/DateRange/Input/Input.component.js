import React, { useContext, forwardRef } from 'react';
import omit from 'lodash/omit';
import DebounceInput from 'react-debounce-input';

import { DateRangeContext } from '../Context';
import InputSizer from '../../shared/InputSizer';

import getDefaultT from '../../../translate';

const OMIT_PROPS_INPUT = ['t', 'id'];

function Input(props, ref) {
	const { t, date, onChange, onFocus, label } = props;
	const { inputManagement } = useContext(DateRangeContext);
	const { placeholder } = inputManagement;

	return (
		<div>
			<label htmlFor={`${props.id}-start-date-input`} className="control-label">
				{label}
			</label>
			<InputSizer placeholder={placeholder} inputText={date.value ? date.textInput : ''}>
				{width => (
					<DebounceInput
						id={`${props.id}-start-date-input`}
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
Input.defaultProps = {
	t: getDefaultT(),
};

export default forwardRef(Input);
