import React, { useContext } from 'react';
import DebounceInput from 'react-debounce-input';

import { DateContext } from '../Context';
import InputSizer from '../../shared/InputSizer';

export default function Input(props) {
	const { value, inputManagement } = useContext(DateContext);
	const { minWidth } = props;

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
					{...props}
				/>
			)}
		</InputSizer>
	);
}

Input.displayName = 'Date.Input';
