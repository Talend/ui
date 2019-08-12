import React from 'react';
import PropTypes from 'prop-types';

import DateTime from '../DateTime';
import { DateTimeContext } from '../DateTime/Context';
import createInputPicker, { INPUT_PICKER_PROPTYPES } from './createInputPicker';

import theme from './InputDateTimePicker.scss';

class InputDateTimePicker extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const dateInputProps = {
			part: 'date',
			theme,
			Picker: DateTime.Picker,
		};
		const InputDatePicker = createInputPicker(dateInputProps);

		return (
			<DateTime.Manager
				dateFormat={this.props.dateFormat}
				formMode={this.props.formMode}
				id={this.props.id}
				required={this.props.required}
				selectedDateTime={this.props.selectedDateTime}
				useSeconds={this.props.useSeconds}
				useTime={this.props.useTime}
				useUTC={this.props.useUTC}
				onChange={this.props.onChange}
			>
				<DateTimeContext.Consumer>
					{({ formManagement, inputManagement, pickerManagement }) => {
						const inputDatePicker = (<InputDatePicker
							{...this.props}
							formManagement={formManagement}
							inputManagement={inputManagement}
							pickerManagement={pickerManagement}
							setRef={ref => (this.dateInputRef = ref)}
						/>);
						return this.props.formMode ? (
							<form
								key="form"
								onSubmit={(event, payload) => {
									formManagement.onSubmit(event, payload);
								}}
							>
								{inputDatePicker}
							</form>
						) : inputDatePicker;
					}}
				</DateTimeContext.Consumer>
			</DateTime.Manager>
		);
	}
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
