import React from 'react';
import PropTypes from 'prop-types';

import DateTime from '../DateTime';
import { DateTimeContext } from '../DateTime/Context';
import createInputPicker, { INPUT_PICKER_PROPTYPES } from './createInputPicker';

import theme from './InputDateTimePicker.scss';

function InputDateTimePicker(props) {
	const dateInputProps = {
		part: 'date',
		theme,
		Picker: DateTime.Picker,
	};
	const InputDatePicker = createInputPicker(dateInputProps);
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
				{({ formManagement }) => (props.formMode ? (
					<form
						key="form"
						onSubmit={(event, payload) => {
							formManagement.onSubmit(event, payload);
						}}
					>
						<InputDatePicker {...props} formManagement={formManagement} />
					</form>
				) : (
					<InputDatePicker {...props} formManagement={formManagement} />
				))}
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
