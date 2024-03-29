/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import omit from 'lodash/omit';
import PropTypes from 'prop-types';

import { focus } from '@talend/react-a11y';
import { randomUUID } from '@talend/utils';

import FocusManager from '../../../FocusManager';
import DateTime from '../DateTime';
import { DateTimeContext } from '../DateTime/Context';

import theme from './InputDateTimePicker.module.scss';

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
	'hybridMode',
	'isDisabledChecker',
];

function onMouseDown(event) {
	event.stopPropagation();
}

function InputDateTimePicker(props) {
	const containerRef = useRef(null);

	const [showPicker, setShowPicker] = useState(false);
	const [picked, setPicked] = useState(false);

	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		modifiers: [
			{ name: 'hide', enabled: false },
			{ name: 'preventOverflow', enabled: false },
		],
		strategy: 'fixed',
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		placement: getPopperPlacement(),
	});

	const popoverId = `date-time-picker-${props.id || randomUUID()}`;
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	const openPicker = isPicked => setPickerVisibility(true, isPicked);
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	const closePicker = isPicked => setPickerVisibility(false, isPicked);

	function onKeyDown(event, { onReset }) {
		switch (event.key) {
			case 'Esc':
			case 'Escape':
				onReset();
				referenceElement.focus();
				closePicker();
				break;
			case 'Down':
			case 'ArrowDown':
				if (event.target !== referenceElement) {
					return;
				}

				if (showPicker) {
					focus.focusOnCalendar(containerRef.current);
				} else {
					openPicker();
				}
				break;
			default:
				break;
		}
	}

	function onBlur(event, { onReset }) {
		onReset();
		closePicker(false);
		if (props.onBlur) {
			props.onBlur(event);
		}
	}

	function onFocus() {
		if (!picked) {
			openPicker();
		}
	}

	function onClick() {
		openPicker();
	}

	function onChange(event, payload) {
		props.onChange(event, payload);
		if (props.formMode || (!props.formMode && !props.useTime && payload.origin !== 'INPUT')) {
			referenceElement.focus();
			closePicker(true);
		}
	}

	function getPopperPlacement() {
		const input = referenceElement;
		if (input) {
			const inputDimensions = input.getBoundingClientRect();
			if (inputDimensions.left > window.innerWidth / 2) {
				return 'bottom-end';
			}
		}
		return 'bottom-start';
	}

	function setPickerVisibility(isShown, isPicked) {
		if (props.readOnly) {
			return;
		}

		setShowPicker(isShown);
		setPicked(isPicked);
	}

	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);
	const dateTimePicker = [
		<DateTime.Input
			{...inputProps}
			id={`${props.id}-input`}
			key="input"
			inputRef={setReferenceElement}
		/>,
		showPicker && (
			<div
				key="popper"
				id={popoverId}
				className={theme.popper}
				onMouseDown={onMouseDown}
				ref={setPopperElement}
				style={styles.popper}
				{...attributes.popper}
			>
				<DateTime.Picker />
				{props.formMode && <DateTime.Validation />}
			</div>
		),
	].filter(Boolean);

	return (
		<DateTime.Manager
			dateFormat={props.dateFormat}
			formMode={props.formMode}
			id={props.id}
			required={props.required}
			selectedDateTime={props.selectedDateTime}
			useSeconds={props.useSeconds}
			useTime={props.useTime}
			useUTC={props.useUTC}
			hybridMode={props.hybridMode}
			onChange={onChange}
		>
			<DateTimeContext.Consumer>
				{({ formManagement }) => (
					<FocusManager
						divRef={containerRef}
						onClick={onClick}
						onFocusIn={onFocus}
						onFocusOut={event => {
							onBlur(event, formManagement);
						}}
						onKeyDown={event => {
							onKeyDown(event, formManagement);
						}}
					>
						{props.formMode ? (
							<form key="form" onSubmit={formManagement.onSubmit}>
								{dateTimePicker}
							</form>
						) : (
							dateTimePicker
						)}
					</FocusManager>
				)}
			</DateTimeContext.Consumer>
		</DateTime.Manager>
	);
}

InputDateTimePicker.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	hybridMode: false,
	useSeconds: false,
	useTime: false,
	useUTC: false,
	formMode: false,
	// default behaviour is to forbid empty values
	required: true,
};

InputDateTimePicker.propTypes = {
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
	hybridMode: PropTypes.bool,
	formMode: PropTypes.bool,
	required: PropTypes.bool,
};

export default InputDateTimePicker;
