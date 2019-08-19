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
		errorManagement,
	} = useContext(DateTimeContext);
	const partInputManagement = props.part === 'date' ? dateInputManagement : timeInputManagement;
	const value = props.part === 'date' ? datetime.dateTextInput : datetime.timeTextInput;
	let defaultWidth = 10;
	if (props.part === 'time' && partInputManagement.useSeconds) {
		defaultWidth = 8;
	} else {
		defaultWidth = 5;
	}
	return (
		<DebounceInput
			style={{ width: `${partInputManagement.placeholder.length || defaultWidth}ch` }}
			aria-describedby={errorManagement.inputErrorId}
			autoComplete="off"
			className="form-control"
			debounceTimeout={300}
			onFocus={errorManagement.onInputFocus}
			type="text"
			value={value}
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
