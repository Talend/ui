import React, { useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import DebounceInput from 'react-debounce-input';

import { DateRangeContext } from '../Context';
import InputSizer from '../../shared/InputSizer';

const OMIT_INPUT_PROPS = ['date', 'onChange', 'onFocus', 'label'];

function Input(props, ref) {
	const {
		date,
		time,
		onChange,
		onTimeChange,
		onFocus,
		label,
		timeInputRef,
	} = props;
	const { inputManagement } = useContext(DateRangeContext);
	const { placeholder } = inputManagement;

	return (
		<div>
			<label htmlFor={props.id} className="control-label">
				{label}
			</label>
			<div style={{ display: 'flex' }}>
				<InputSizer inputText={placeholder}>
					{width => (
						<DebounceInput
							autoComplete="off"
							className="form-control"
							debounceTimeout={300}
							type="text"
							placeholder={placeholder}
							value={date.textInput}
							style={{ width }}
							onChange={onChange}
							onFocus={() => onFocus(ref)}
							inputRef={ref}
							{...omit(props, OMIT_INPUT_PROPS)}
						/>
					)}
				</InputSizer>
				<InputSizer inputText={placeholder}>
					{width => (
						<DebounceInput
							autoComplete="off"
							className="form-control"
							debounceTimeout={300}
							type="text"
							placeholder="HH:mm:ss"
							value={time.textInput}
							style={{ width }}
							onChange={onTimeChange}
							onFocus={() => onFocus(timeInputRef)}
							inputRef={timeInputRef}
							{...omit(props, OMIT_INPUT_PROPS)}
						/>
					)}
				</InputSizer>
			</div>
		</div>
	);
}

Input.displayName = 'DateRange.Input';
Input.propTypes = {
	id: PropTypes.string.required,
	date: PropTypes.shape({
		textInput: PropTypes.string,
	}),
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	label: PropTypes.string,
};

export default forwardRef(Input);
