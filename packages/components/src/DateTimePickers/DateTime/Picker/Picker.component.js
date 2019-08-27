import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import { DateTimeContext } from '../Context';
import DateTimePicker from '../../pickers/DateTimePicker';
import TimePicker from '../../pickers/TimePicker';

const PROPS_TO_OMIT = ['part'];

export default function Picker(props) {
	const { datetime, pickerManagement } = useContext(DateTimeContext);
	const PickerComponent = props.part === 'date' ? DateTimePicker : TimePicker;
	return (
		<PickerComponent
			manageFocus
			selection={{
				date: datetime.date,
				time: datetime.time,
			}}
			{...pickerManagement}
			{...omit(props, PROPS_TO_OMIT)}
		/>
	);
}

Picker.propTypes = {
	part: PropTypes.oneOf(['date', 'time']),
};

Picker.displayName = 'DateTime.Picker';
