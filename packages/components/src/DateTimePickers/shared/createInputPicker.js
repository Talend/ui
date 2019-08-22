/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import omit from 'lodash/omit';
import uuid from 'uuid';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import DateTime from '../DateTime';
import { focusOnCalendar, focusOnTime } from '../../Gesture/withCalendarGesture';


const PROPS_TO_OMIT_FOR_INPUT = [
	'dateFormat',
	'id',
	'required',
	'selectedDateTime',
	'useSeconds',
	'useTime',
	'useUTC',
	'onChange',
];

export const INPUT_PICKER_PROPTYPES = {
	id: PropTypes.string.isRequired,
	onBlur: PropTypes.func,
	readOnly: PropTypes.bool,
};

export default function createInputPicker({ part, theme }) {
	return class InputPicker extends React.Component {
		static propTypes = INPUT_PICKER_PROPTYPES;

		constructor(props) {
			super(props);
			this.popoverId = `input-${part}-picker-${props.id || uuid.v4()}`;
			this.state = {
				showPicker: false,
			};

			this.onBlur = this.onBlur.bind(this);
			this.onChange = this.onChange.bind(this);
			this.onClick = this.onClick.bind(this);
			this.onFocus = this.onFocus.bind(this);
			this.onKeyDown = this.onKeyDown.bind(this);
			this.openPicker = this.setPickerVisibility.bind(this, true);
			this.closePicker = this.setPickerVisibility.bind(this, false);
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
		onBlur(event) {
			this.closePicker({ picked: false });
			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
		}
		onChange() {
			this.inputRef.focus();
			this.closePicker();
		}
		onClick() {
			this.openPicker();
		}
		onFocus() {
			if (!this.state.picked) {
				this.openPicker();
			}
		}
		onKeyDown(event) {
			switch (event.keyCode) {
				case keycode.codes.esc:
					this.inputRef.focus();
					this.closePicker();
					break;
				case keycode.codes.down:
					if (event.target !== this.inputRef) {
						return;
					}
					if (this.state.showPicker) {
						if (part === 'date') {
							focusOnCalendar(this.containerRef);
						} else {
							focusOnTime(this.containerRef);
						}
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
			const picker = [
				<DateTime.Input
					{...inputProps}
					id={`${this.props.id}-${part}-input`}
					key="input"
					inputRef={ref => {
						this.inputRef = ref;
					}}
					part={part}
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
								<DateTime.Picker {...this.props} onSubmit={this.onChange} part={part} />
							</div>
						)}
					</Popper>
				),
			].filter(Boolean);

			return (
				<FocusManager
					className="focus-manager"
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
					{picker}
				</FocusManager>
			);
		}
	};
}

