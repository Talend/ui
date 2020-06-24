import React, { useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import DebounceInput from 'react-debounce-input';

import { DateRangeContext } from '../Context';
import InputSizer from '../../shared/InputSizer';

const OMIT_INPUT_PROPS = ['date', 'onChange', 'onFocus', 'label'];

const Input = forwardRef((props, ref) => {
	const { date, onChange, onFocus, label } = props;
	const { inputManagement } = useContext(DateRangeContext);
	const { placeholder } = inputManagement;

	return (
		<div>
			<label htmlFor={props.id} className="control-label">
				{label}
			</label>
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
						onFocus={onFocus}
						inputRef={ref}
						{...omit(props, OMIT_INPUT_PROPS)}
					/>
				)}
			</InputSizer>
		</div>
	);
});

Input.displayName = 'DateRange.Input';
Input.propTypes = {
	id: PropTypes.string.isRequired,
	date: PropTypes.shape({
		textInput: PropTypes.string,
	}),
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	label: PropTypes.string,
};

export default Input;
