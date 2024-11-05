import { useState } from 'react';

export default function useInputPickerHandlers({
	disabled = false,
	handleBlur,
	handleChange,
	handleKeyDown,
}) {
	const [showPicker, setPickerVisibility] = useState(false);
	const [picked, setPicked] = useState(false);

	function openPicker() {
		if (!disabled) {
			setPickerVisibility(true);
		}
	}
	function closePicker() {
		setPickerVisibility(false);
	}
	function onBlur(event) {
		setPicked(false);
		closePicker();
		if (handleBlur) {
			handleBlur(event);
		}
	}
	function onChange(event, payload, inputRef) {
		if (handleChange) {
			handleChange(event, payload);
		}
		if (['PICKER', 'END_PICKER'].includes(payload.origin)) {
			inputRef.focus();
			setPicked(true);
			closePicker();
		}

		if (['INPUT'].includes(payload.origin)) {
			if (!payload.errorMessage) {
				inputRef.focus();
				closePicker();
			} else {
				openPicker();
			}
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
	function onKeyDown(event, inputRef) {
		switch (event.key) {
			case 'Esc':
			case 'Escape':
				inputRef.focus();
				closePicker();
				break;
			case 'Down':
			case 'ArrowDown':
				if (event.target !== inputRef) {
					return;
				}

				if (showPicker) {
					if (handleKeyDown) {
						handleKeyDown();
					}
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
		picked,
		onBlur,
		onChange,
		onClick,
		onFocus,
		onKeyDown,
		getPopperPlacement,
	};
}
