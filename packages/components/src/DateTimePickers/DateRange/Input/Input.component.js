import { forwardRef, useContext } from 'react';
import DebounceInput from 'react-debounce-input';

import omit from 'lodash/omit';
import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

import InputSizer from '../../shared/InputSizer';
import { DateRangeContext } from '../Context';

const OMIT_INPUT_PROPS = ['date', 'onChange', 'onFocus', 'label', 'minWidth'];

const Input = forwardRef((props, ref) => {
	const { date, onChange, onFocus, label, minWidth } = props;
	const { inputManagement } = useContext(DateRangeContext);
	const { placeholder } = inputManagement;

	return (
		<div className="range-input">
			{label && <Form.Label htmlFor={props.id}>{label}</Form.Label>}
			<InputSizer inputText={placeholder} minWidth={minWidth}>
				{width => (
					<DebounceInput
						autoComplete="off"
						debounceTimeout={300}
						element={Form.Text}
						hideLabel
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
	minWidth: PropTypes.number,
};

export default Input;
