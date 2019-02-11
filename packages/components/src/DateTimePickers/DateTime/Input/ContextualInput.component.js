import React from 'react';
import DebounceInput from 'react-debounce-input';

import { DateTimeContext } from '../Context';

export default function ContextualInput(props) {
	return (
		<DateTimeContext.Consumer>
			{({ datetime, inputManagement, errorManagement }) => (
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
			)}
		</DateTimeContext.Consumer>
	);
}
