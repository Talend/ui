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
	const onChange = event => inputManagement.onChange(event, props.onChange);

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
			{...partInputManagement}
			{...props}
			onChange={onChange}
		/>
	);
}

Input.defaultProps = {
	part: 'date',
};

Input.propTypes = {
	part: PropTypes.oneOf(['date', 'time']).isRequired,
	onChange: PropTypes.func,
};

Input.displayName = 'DateTime.Input';
