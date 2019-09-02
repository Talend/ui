import React, { useContext } from 'react';
import DebounceInput from 'react-debounce-input';

import { TimeContext } from '../Context';

export default function Input(props) {
	const { time, inputManagement } = useContext(TimeContext);

	return (
		<DebounceInput
			autoComplete="off"
			className="form-control"
			debounceTimeout={300}
			type="text"
			value={time.textInput}
			{...inputManagement}
			{...props}
		/>
	);
}

Input.displayName = 'Time.Input';
