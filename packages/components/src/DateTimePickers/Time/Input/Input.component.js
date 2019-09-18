import React, { useContext } from 'react';
import DebounceInput from 'react-debounce-input';

import { TimeContext } from '../Context';
import InputSizer from '../../shared/InputSizer';

export default function Input(props) {
	const { time, inputManagement } = useContext(TimeContext);

	return (
		<InputSizer placeholder={inputManagement.placeholder} inputText={time.textInput}>
			{width => (
				<DebounceInput
					autoComplete="off"
					className="form-control"
					debounceTimeout={300}
					type="text"
					value={time.textInput}
					style={{ width }}
					{...inputManagement}
					{...props}
				/>
			)}
		</InputSizer>
	);
}

Input.displayName = 'Time.Input';
