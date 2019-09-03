import React, { useContext } from 'react';
import DebounceInput from 'react-debounce-input';

import { DateContext } from '../Context';

export default function Input(props) {
	const {
		value,
		inputManagement,
	} = useContext(DateContext);

	return (
		<DebounceInput
			autoComplete="off"
			className="form-control"
			debounceTimeout={300}
			type="text"
			value={value.textInput}
			{...inputManagement}
			{...props}
		/>
	);
}

Input.displayName = 'Date.Input';
