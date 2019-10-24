import React, { useContext } from 'react';
import DebounceInput from 'react-debounce-input';

import { DateRangeContext } from '../Context';

function Inputs(props) {
	const { startDate, endDate, inputManagement } = useContext(DateRangeContext);

	return [
		<DebounceInput
			autoComplete="off"
			className="form-control"
			debounceTimeout={300}
			type="text"
			value={startDate.textInput}
			style={{ width: 150 }}
			{...inputManagement}
			{...props}
		/>,
		<DebounceInput
			autoComplete="off"
			className="form-control"
			debounceTimeout={300}
			type="text"
			value={endDate.textInput}
			style={{ width: 150 }}
			{...inputManagement}
			{...props}
		/>,
	];
}

Inputs.displayName = 'DateRange.Inputs';

export default Inputs;
