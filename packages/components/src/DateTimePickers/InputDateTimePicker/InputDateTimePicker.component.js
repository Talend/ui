import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

import DateTime from '../DateTime';
import { DateTimeContext } from '../DateTime/Context';
import InputDatePicker from '../InputDatePicker';
import { INPUT_PICKER_PROPTYPES } from '../shared/createInputPicker';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';


class InputDateTimePicker extends React.Component {
	constructor(props) {
		super(props);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.openPicker = this.setPickerVisibility.bind(this, true);
		this.closePicker = this.setPickerVisibility.bind(this, false);

		this.state = {
			showDatePicker: false,
			datePicked: false,
		};
	}

	onBlur(event, { onReset }) {
		onReset();
		this.closePicker({ datePicked: false });
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	}

	onChange(event, payload) {
		this.props.onChange(event, payload);
		if (
			this.props.formMode ||
			(!this.props.formMode && !this.props.useTime && payload.origin !== 'INPUT')
		) {
			this.inputRef.focus();
			this.closePicker();
		}
	}

	onClick() {
		this.openPicker();
	}

	onFocus() {
		if (!this.state.datePicked) {
			this.openPicker();
		}
	}

	onKeyDown(event, { onReset }) {
		switch (event.keyCode) {
			case keycode.codes.esc:
				onReset();
				this.inputRef.focus();
				this.closePicker();
				break;
			case keycode.codes.down:
				if (event.target !== this.inputRef) {
					return;
				}
				if (this.state.showDatePicker) {
					focusOnCalendar(this.containerRef);
				} else {
					this.openPicker();
				}
				break;
			default:
				break;
		}
	}

	setPickerVisibility(isShown, extra = {}) {
		if (this.props.readOnly) {
			return;
		}

		this.setState(({ showDatePicker }) => {
			if (showDatePicker === isShown) {
				return extra;
			}
			return {
				showDatePicker: isShown,
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
							setRef={ref => (this.inputRef = ref)}
							setContainerRef={ref => (this.containerRef = ref)}
							showPicker={this.state.showDatePicker}
							onBlur={this.onBlur}
							onClick={this.onClick}
							onFocus={this.onFocus}
							onKeyDown={this.onKeyDown}
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
