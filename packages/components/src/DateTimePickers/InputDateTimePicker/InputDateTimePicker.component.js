import React from 'react';
import PropTypes from 'prop-types';

import DateTime from '../DateTime';
import { DateTimeContext } from '../DateTime/Context';
import { INPUT_PICKER_PROPTYPES } from '../shared/createInputPicker';
import InputDatePicker from '../InputDatePicker';

function InputDateTimePicker(props) {
	return (
		<DateTime.Manager
			dateFormat={props.dateFormat}
			formMode={props.formMode}
			id={props.id}
			required={props.required}
			selectedDateTime={props.selectedDateTime}
			useSeconds={props.useSeconds}
			useTime={props.useTime}
			useUTC={props.useUTC}
			onChange={props.onChange}
		>
			<DateTimeContext.Consumer>
				{({ formManagement, inputManagement, pickerManagement }) => {
					const inputDatePicker = (<InputDatePicker
						{...props}
						formManagement={formManagement}
						inputManagement={inputManagement}
						pickerManagement={pickerManagement}
					/>);
					return props.formMode ? (
						<form key="form" onSubmit={formManagement.onSubmit}>
							{inputDatePicker}
						</form>
					) : inputDatePicker;
				}}
			</DateTimeContext.Consumer>
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
	formMode: false,
	// default behaviour is to forbid empty values
	required: true,
};

export default InputDateTimePicker;
