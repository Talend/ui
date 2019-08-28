import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';

import { DateTimeContext } from '../Context';

export default function Input(props) {
	const {
		datetime,
		inputManagement,
		dateInputManagement,
		timeInputManagement,
	} = useContext(DateTimeContext);
	const textInput = props.part === 'date' ? datetime.textInput : datetime.timeTextInput;
	const partInputManagement = props.part === 'date' ? dateInputManagement : timeInputManagement;

	return (
		<DebounceInput
			autoComplete="off"
			className="form-control"
			debounceTimeout={300}
			type="text"
			value={textInput}
			{...inputManagement}
			{...partInputManagement}
			{...props}
		/>
	);
}

Input.defaultProps = {
	part: 'date',
};

Input.propTypes = {
	part: PropTypes.oneOf(['date', 'time']).isRequired,
};

Input.displayName = 'DateTime.Input';
