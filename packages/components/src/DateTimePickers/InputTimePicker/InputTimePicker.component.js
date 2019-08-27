import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uuid from 'uuid';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import DateTime from '../DateTime';
import TimePicker from '../pickers/TimePicker';

import theme from './InputTimePicker.scss';


const PROPS_TO_OMIT_FOR_INPUT = [
	'id',
	'required',
	'selectedTime',
	'useSeconds',
	'onBlur',
	'onChange',
];

class InputTimePicker extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		selectedTime: PropTypes.string,
		useSeconds: PropTypes.bool,
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
	};
	static defaultProps = {
		useSeconds: false,
	};
	constructor(props) {
		super(props);
		this.popoverId = `time-picker-${props.id || uuid.v4()}`;
		this.state = {
			showPicker: false,
		};

		this.onBlur = this.onBlur.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.openPicker = this.setPickerVisibility.bind(this, true);
		this.closePicker = this.setPickerVisibility.bind(this, false);
	}
	onClick() {
		this.openPicker();
	}
	onChange(event, payload) {
		this.props.onChange(event, payload);
		if (
			(payload.origin !== 'INPUT')
		) {
			this.inputRef.focus();
			this.closePicker({ picked: true });
		}
	}
	onBlur(event) {
		this.closePicker({ picked: false });
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	}
	onFocus() {
		if (!this.state.picked) {
			this.openPicker();
		}
	}
	getPopperPlacement() {
		const input = this.inputRef;
		if (input) {
			const inputDimensions = input.getBoundingClientRect();
			if (inputDimensions.left > window.innerWidth / 2) {
				return 'bottom-end';
			}
		}
		return 'bottom-start';
	}
	setPickerVisibility(isShown, extra = {}) {
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
		const inputProps = omit(this.props, PROPS_TO_OMIT_FOR_INPUT);
		const dateTimePicker = [
			<DateTime.Input
				{...inputProps}
				id={`${this.props.id}-input`}
				key="input"
				inputRef={ref => {
					this.inputRef = ref;
				}}
				part="time"
			/>,
			this.state.showPicker && (
				<Popper
					key="popper"
					modifiers={{
						hide: {
							enabled: false,
						},
						preventOverflow: {
							enabled: false,
						},
					}}
					placement={this.getPopperPlacement()}
					positionFixed
					referenceElement={this.inputRef}
				>
					{({ ref, style }) => (
						<div id={this.popoverId} className={theme.popper} style={style} ref={ref}>
							<TimePicker useSeconds={this.props.useSeconds} onSubmit={this.onChange} />
						</div>
					)}
				</Popper>
			),
		].filter(Boolean);
		return (
			<DateTime.Manager
				selectedTime={this.props.selectedTime}
				useSeconds={this.props.useSeconds}
				onChange={this.onChange}
			>
				<FocusManager
					divRef={ref => {
						this.containerRef = ref;
					}}
					onClick={this.onClick}
					onFocusIn={this.onFocus}
					onFocusOut={event => {
						this.onBlur(event);
					}}
					onKeyDown={event => {
						this.onKeyDown(event);
					}}
				>
					{dateTimePicker}
				</FocusManager>
			</DateTime.Manager>
		);
	}
}

export default InputTimePicker;
