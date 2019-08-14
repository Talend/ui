import React from 'react';
import PropTypes from 'prop-types';

import DateTime from '../DateTime';
import { DateTimeContext } from '../DateTime/Context';
import InputDatePicker from '../InputDatePicker';
import { INPUT_PICKER_PROPTYPES } from '../shared/createInputPicker';

class InputDateTimePicker extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.openPicker = this.setPickerVisibility.bind(this, true);
		this.state = {
			showPicker: false,
			picked: false,
		};
	}

	onChange(event, payload) {
		this.props.onChange(event, payload);
		if (
			this.props.formMode ||
			(!this.props.formMode && !this.props.useTime && payload.origin !== 'INPUT')
		) {
			this.dateInputRef.focus();
			this.closeDatePicker();
		}
	}
	onClick() {
		this.openPicker();
	}

	onFocus() {
		if (!this.state.picked) {
			this.openPicker();
		}
	}

	setPickerVisibility(isShown, extra = {}) {
		if (this.props.readOnly) {
			return;
		}

		this.setState(({ showPicker }) => {
			if (showPicker === isShown) {
				return extra;
			}
			return {
				showPicker: isShown,
				...extra,
			};
		});
	}
	render() {
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
				onChange={this.onChange}
			>
				<DateTimeContext.Consumer>
					{({ formManagement }) => {
						const inputDatePicker = (<InputDatePicker
							{...this.props}
							formManagement={formManagement}
							setRef={ref => (this.dateInputRef = ref)}
							showPicker={this.state.showPicker}
							onFocus={this.onFocus}
							onClick={this.onClick}
						/>);
						return this.props.formMode ? (
							<form key="form" onSubmit={formManagement.onSubmit}>
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
