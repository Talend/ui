import React, { useContext } from 'react';
import DebounceInput from 'react-debounce-input';

import { DateContext } from '../Context';

export default function Input(props) {
	const {
		datetime,
		inputManagement,
		dateInputManagement,
	} = useContext(DateContext);

	return (
		<DebounceInput
			autoComplete="off"
			className="form-control"
			debounceTimeout={300}
			type="text"
			value={datetime.textInput}
			{...inputManagement}
			{...dateInputManagement}
			{...props}
		/>
	);
}

Input.displayName = 'Date.Input';
