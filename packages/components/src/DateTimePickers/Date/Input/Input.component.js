import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';

import { DateContext } from '../Context';
import InputSizer from '../../shared/InputSizer';

function Input(props) {
	const { value, inputManagement } = useContext(DateContext);
	const { minWidth, ...rest } = props;

	return (
		<InputSizer inputText={inputManagement.placeholder} minWidth={minWidth}>
			{width => (
				<DebounceInput
					autoComplete="off"
					className="form-control"
					debounceTimeout={300}
					type="text"
					value={value.textInput}
					style={{ width }}
					{...inputManagement}
					{...rest}
				/>
			)}
		</InputSizer>
	);
}

Input.displayName = 'Date.Input';

Input.propTypes = {
	minWidth: PropTypes.number,
};

export default Input;
