import React from 'react';
import PropTypes from 'prop-types';

import DateTime from '../DateTime';
import InputDatePicker from '../InputDatePicker';
import InputTimePicker from '../InputTimePicker';

import { INPUT_PICKER_PROPTYPES } from '../shared/createInputPicker';

import theme from './InputDateTimePicker.scss';


function InputDateTimePicker(props) {
	const pickers = [
		<InputDatePicker {...props} />,
		props.useTime && <InputTimePicker {...props} />,
	].filter(Boolean);

	return (
		<DateTime.Manager
			dateFormat={props.dateFormat}
			id={props.id}
			required={props.required}
			selectedDateTime={props.selectedDateTime}
			useSeconds={props.useSeconds}
			useTime={props.useTime}
			useUTC={props.useUTC}
			onChange={props.onChange}
		>
			<div className={theme['pickers-container']}>
				{pickers}
			</div>
		</DateTime.Manager>
	);
}

InputDateTimePicker.propTypes = {
	...INPUT_PICKER_PROPTYPES,
	onChange: PropTypes.func,
	selectedDateTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
	dateFormat: PropTypes.string,
	useSeconds: PropTypes.bool,
	useTime: PropTypes.bool,
	useUTC: PropTypes.bool,
	required: PropTypes.bool,
};
InputDateTimePicker.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	useSeconds: false,
	useTime: false,
	useUTC: false,
	// default behaviour is to forbid empty values
	required: true,
};

export default InputDateTimePicker;
