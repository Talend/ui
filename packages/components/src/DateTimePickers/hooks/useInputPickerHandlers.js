import { useState } from 'react';
import keycode from 'keycode';


export default function useInputPikcerHandlers(props) {
	const [showPicker, setPickerVisibility] = useState(false);
	const [picked, setPicked] = useState(false);

	function openPicker() {
		setPickerVisibility(true);
	}
	function closePicker() {
		setPickerVisibility(false);
	}
	function onBlur(event) {
		setPicked(false);
		closePicker();
		if (props.onBlur) {
			props.onBlur(event);
		}
	}
	function onChange(event, payload, inputRef) {
		props.onChange(event, payload);
		if (
			(payload.origin !== 'INPUT')
		) {
			inputRef.focus();
			setPicked(true);
			closePicker();
		}
	}

	function onClick() {
		openPicker();
	}

	function onFocus() {
		if (!picked) {
			openPicker();
		}
	}
	function onKeyDown(event, inputRef, containerRef) {
		switch (event.keyCode) {
			case keycode.codes.esc:
				inputRef.focus();
				closePicker();
				break;
			case keycode.codes.down:
				if (event.target !== inputRef) {
					return;
				}

				if (this.state.showPicker) {
					// TODO: focuseOnTime();
				} else {
					openPicker();
				}
				break;
			default:
				break;
		}
	}
	function getPopperPlacement(input) {
		if (input) {
			const inputDimensions = input.getBoundingClientRect();
			if (inputDimensions.left > window.innerWidth / 2) {
				return 'bottom-end';
			}
		}
		return 'bottom-start';
	}

	return {
		showPicker,
		onBlur,
		onChange,
		onClick,
		onFocus,
		onKeyDown,
		getPopperPlacement,
	};
}
