import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { TimeContext } from '../Context';
import TimePicker from '../../pickers/TimePicker';

export default function Picker(props) {
	const { time, pickerManagement } = useContext(TimeContext);
	return (
		<TimePicker
			textInput={time.textInput}
			{...props}
			onChange={(...args) => {
				if (props.onChange) {
					props.onChange(...args);
				}
				pickerManagement.onChange(...args);
			}}
		/>
	);
}

Picker.propTypes = {
	onChange: PropTypes.func,
};

Picker.displayName = 'Time.Picker';
