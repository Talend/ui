import React, { useContext } from 'react';
import DebounceInput from 'react-debounce-input';

import { DateTimeContext } from '../Context';

export default function Input(props) {
	const { datetime, inputManagement, errorManagement, date, time } = useContext(DateTimeContext);
	return (
		<DebounceInput
			aria-describedby={errorManagement.inputErrorId}
			autoComplete="off"
			className="form-control"
			debounceTimeout={300}
			onFocus={errorManagement.onInputFocus}
			type="text"
			value={datetime.textInput}
			{...inputManagement}
			{...props}
		/>
	);
}
Input.displayName = 'DateTime.Input';
