/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Overlay, Popover } from 'react-bootstrap';
import keycode from 'keycode';
import uuid from 'uuid';

import FocusManager from '../../FocusManager';
import { DateTimeContext } from '../DateTime/Context';
import DateTime from '../DateTime';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';

import theme from './InputDateTimePicker.scss';

const PROPS_TO_OMIT_FOR_INPUT = [
	'dateFormat',
	'formMode',
	'id',
	'required',
	'selectedDateTime',
	'useSeconds',
	'useTime',
	'useUTC',
	'onBlur',
	'onChange',
];

class InputDateTimePicker extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		selectedDateTime: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.number,
			PropTypes.string,
		]),
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		readOnly: PropTypes.bool,
		dateFormat: PropTypes.string,
		useSeconds: PropTypes.bool,
		useTime: PropTypes.bool,
		useUTC: PropTypes.bool,
		formMode: PropTypes.bool,
		required: PropTypes.bool,
	};

	static defaultProps = {
		dateFormat: 'YYYY-MM-DD',
		useSeconds: false,
		useTime: false,
		useUTC: false,
		formMode: false,
		// default behaviour is to forbid empty values
		required: true,
	};

	constructor(props) {
		super(props);

		this.popoverId = `date-time-picker-${props.id || uuid.v4()}`;
		this.state = {
			showPicker: false,
		};

		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.openPicker = this.setPickerVisibility.bind(this, true);
		this.closePicker = this.setPickerVisibility.bind(this, false);
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

				if (this.state.showPicker) {
					focusOnCalendar(this.containerRef);
				} else {
					this.openPicker();
				}
				break;
			default:
				break;
		}
	}

	onBlur(event, { onReset }) {
		onReset();
		this.closePicker();
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	}

	onFocus() {
		this.openPicker();
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

	setPickerVisibility(isShown) {
		if (this.props.readOnly) {
			return;
		}

		this.setState(({ showPicker }) => {
			if (showPicker === isShown) {
				return null;
			}
			return { showPicker: isShown };
		});
	}

	render() {
		const inputProps = omit(this.props, PROPS_TO_OMIT_FOR_INPUT);

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
					{({ formManagement }) => (
						<FocusManager
							onFocusIn={this.onFocus}
							onFocusOut={event => {
								this.onBlur(event, formManagement);
							}}
							onKeyDown={event => {
								this.onKeyDown(event, formManagement);
							}}
						>
							<DateTime.Input
								{...inputProps}
								key="input"
								inputRef={ref => {
									this.inputRef = ref;
								}}
							/>
							<Overlay target={this.inputRef} show={this.state.showPicker} placement="bottom">
								<Popover className={theme.popover} id={this.popoverId}>
									<div
										ref={ref => {
											this.containerRef = ref;
										}}
									>
										{this.props.formMode ? (
											<form key="form" onSubmit={formManagement.onSubmit}>
												<DateTime.Picker />
												<DateTime.Validation />
											</form>
										) : (
											<DateTime.Picker />
										)}
									</div>
								</Popover>
							</Overlay>
						</FocusManager>
					)}
				</DateTimeContext.Consumer>
			</DateTime.Manager>
		);
	}
}
export default InputDateTimePicker;

/*
* Scenarios to check
* - focus on input + ESC (close picker), we don't have the validation button anymore. Then on blur, value is reset
* - type in input, do I really have to press validation button ?
* - if we want that, we have to consider dropdown and input as separated entities
* */
