import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

import DateTime from '../DateTime';
import InputDatePicker from '../InputDatePicker';
import InputTimePicker from '../InputTimePicker';

import { INPUT_PICKER_PROPTYPES } from '../shared/createInputPicker';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';

import theme from './InputDateTimePicker.scss';


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
		this.openDatePicker = this.openPicker.bind(this, 'showDatePicker');
		this.openTimePicker = this.openPicker.bind(this, 'showTimePicker');
		this.closeDatePicker = this.closePicker.bind(this, 'showDatePicker');
		this.closeTimePicker = this.closePicker.bind(this, 'showTimePicker');

		this.state = {
			datePicked: false,
			showDatePicker: false,
			showTimePicker: false,
		};
	}

	onBlur(event, part) {
		if (part === 'date') {
			this.closeDatePicker({ datePicked: false });
		} else {
			this.closeTimePicker();
		}
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	}

	onChange(event, payload) {
		this.props.onChange(event, payload);
		if (
			(!this.props.useTime && payload.origin !== 'INPUT')
		) {
			this.dateInputRef.focus();
			this.closeDatePicker({ datePicked: true });
		}
	}

	onClick(event) {
		if (event.target === this.dateInputRef
			|| this.datePickerRef.contains(event.target)) {
			this.openDatePicker();
		} else if (event.target === this.timeInputRef
			|| this.timePickerRef.contains(event.target)) {
			this.openTimePicker();
		}
	}

	onFocus(event) {
		if (event.target === this.dateInputRef
			|| this.datePickerRef.contains(event.target)) {
			if (!this.state.datePicked) {
				this.openDatePicker();
			}
		} else if (event.target === this.timeInputRef
			|| this.timePickerRef.contains(event.target)) {
			this.openTimePicker();
		}
	}

	onKeyDown(event) {
		switch (event.keyCode) {
			case keycode.codes.esc:
				this.dateInputRef.focus();
				this.closeDatePicker();
				break;
			case keycode.codes.down:
				if (event.target !== this.dateInputRef) {
					return;
				}
				if (this.state.showDatePicker) {
					focusOnCalendar(this.datePickerRef);
				} else {
					this.openDatePicker();
				}
				break;
			default:
				break;
		}
	}

	setPickerVisibility(isShown, showWhichPicker, extra = {}) {
		if (this.props.readOnly) {
			return;
		}

		this.setState(({ [showWhichPicker]: showPicker }) => {
			if (showPicker === isShown) {
				return extra;
			}
			return {
				[showWhichPicker]: isShown,
				...extra,
			};
		});
	}
	render() {
		const eventProps = {
			onBlur: this.onBlur,
			onClick: this.onClick,
			onFocus: this.onFocus,
			onKeyDown: this.onKeyDown,
		};
		const pickers = [<InputDatePicker
			{...this.props}
			{...eventProps}
			showPicker={this.state.showDatePicker}
			setRef={ref => (this.dateInputRef = ref)}
			setContainerRef={ref => (this.datePickerRef = ref)}
		/>,
		this.props.useTime && <InputTimePicker
			{...this.props}
			{...eventProps}
			showPicker={this.state.showTimePicker}
			setRef={ref => (this.timeInputRef = ref)}
			setContainerRef={ref => (this.timePickerRef = ref)}
		/>].filter(Boolean);
		return (
			<DateTime.Manager
				dateFormat={this.props.dateFormat}
				id={this.props.id}
				required={this.props.required}
				selectedDateTime={this.props.selectedDateTime}
				useSeconds={this.props.useSeconds}
				useTime={this.props.useTime}
				useUTC={this.props.useUTC}
				onChange={this.onChange}
			>
				<div className={theme['pickers-container']}>
					{pickers}
				</div>
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
	// default behaviour is to forbid empty values
	required: true,
};

export default InputDateTimePicker;
