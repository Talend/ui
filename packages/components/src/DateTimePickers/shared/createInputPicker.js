/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import keycode from 'keycode';
import uuid from 'uuid';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import DateTime from '../DateTime';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';


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
	'onClick',
	'onFocus',
	'formManagement',
];

export const INPUT_PICKER_PROPTYPES = {
	id: PropTypes.string.isRequired,
	onBlur: PropTypes.func,
	readOnly: PropTypes.bool,
	formMode: PropTypes.bool,
};

export default function createInputPicker({ part, theme, Picker }) {
	return class InputPicker extends React.Component {
		static propTypes = {
			...INPUT_PICKER_PROPTYPES,
			formManagement: PropTypes.object,
		};

		constructor(props) {
			super(props);

			this.popoverId = `input-${part}-picker-${props.id || uuid.v4()}`;
			this.state = {
				showPicker: false,
			};

			this.onBlur = this.onBlur.bind(this);
			this.onKeyDown = this.onKeyDown.bind(this);
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
			if (this.props.onBlur) {
				this.props.onBlur(event);
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
				this.props.showPicker && (
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
								<Picker {...this.props} />
								{this.props.formMode && <DateTime.Validation />}
							</div>
						)}
					</Popper>
				),
			].filter(Boolean);

			return (
				<FocusManager
					style={{ display: 'inline-block' }}
					divRef={ref => {
						this.containerRef = ref;
					}}
					onClick={this.props.onClick}
					onFocusIn={this.props.onFocus}
					onFocusOut={event => {
						this.onBlur(event, this.props.formManagement);
					}}
					onKeyDown={event => {
						this.onKeyDown(event, this.props.formManagement);
					}}
				>
					{picker}
				</FocusManager>
			);
		}
	};
}

