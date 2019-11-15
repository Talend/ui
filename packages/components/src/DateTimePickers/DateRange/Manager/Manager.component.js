import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isBefore from 'date-fns/is_before';

import { DateRangeContext } from '../Context';
import getErrorMessage from '../../shared/error-messages';

import {
	extractDate,
	extractFromDate,
	extractPartsFromTextInput,
} from '../../Date/date-extraction';

export function DateRangePickerException(code, message) {
	this.message = getErrorMessage(message);
	this.code = code;
}

function extractRangeParts(startDate, endDate, options) {
	const startDateParts = extractDate(startDate, options);
	const endDateParts = extractDate(endDate, options);

	return {
		startDate: {
			value: startDateParts.localDate,
			textInput: startDateParts.textInput,
		},
		endDate: {
			value: endDateParts.localDate,
			textInput: endDateParts.textInput,
		},
		errors: startDateParts.errors.concat(endDateParts.errors),
		errorMessage: startDateParts.errorMessage || endDateParts.errorMessage,
	};
}

function ContextualManager(props) {
	const options = {
		dateFormat: props.dateFormat,
	};
	const initialState = extractRangeParts(props.startDate, props.endDate, options);
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (props.startDate !== state.startDate.value || props.endDate !== state.endDate.value) {
			const parts = extractRangeParts(props.startDate, props.endDate, options);
			setState(parts);
		}
	}, [props.startDate, props.endDate]);

	function onFocusChange(event, focusedInput) {
		setState(prevState => ({
			...prevState,
			focusedInput,
		}));
	}

	function onChange(event, nextState) {
		const errors = [...(nextState.errors || [])];
		if (nextState.startDate.value && nextState.endDate.value) {
			if (!isBefore(nextState.startDate.value, nextState.endDate.value)) {
				errors.push(new DateRangePickerException('DATE_RANGE_INVALID', 'DATE_RANGE_INVALID'));
			}
		}
		if (props.onChange) {
			const payload = {
				startDate: nextState.startDate.value,
				endDate: nextState.endDate.value,
				errors: nextState.errors,
				errorMessage: nextState.errorMessage,
				origin: nextState.origin,
			};
			props.onChange(event, payload);
		}
	}

	function onStartChange(event, { date: startDate }) {
		const { date, textInput } = extractFromDate(startDate, options);
		const nextState = {};

		nextState.startDate = {
			value: date,
			textInput,
		};

		setState(prevState => ({
			...prevState,
			...nextState,
		}));
		onChange(event, { ...state, ...nextState, origin: 'START_PICKER' });
	}

	function onEndChange(event, { date: endDate }) {
		const { date, textInput } = extractFromDate(endDate, options);
		const nextState = {};

		nextState.endDate = {
			value: date,
			textInput,
		};

		setState(prevState => ({
			...prevState,
			...nextState,
		}));
		onChange(event, { ...state, ...nextState, origin: 'END_PICKER' });
	}

	function onStartInputChange(event) {
		const userInput = event.target.value;
		const { localDate, textInput, errors, errorMessage } = extractPartsFromTextInput(
			userInput,
			options,
		);
		setState(prevState => ({
			...prevState,
			startDate: {
				value: localDate,
				textInput,
			},
			errors,
			errorMessage,
		}));
		onChange(event, { ...state, startDate: { value: localDate }, errors, errorMessage });
	}

	function onEndInputChange(event) {
		const userInput = event.target.value;
		const { localDate, textInput, errors, errorMessage } = extractPartsFromTextInput(
			userInput,
			options,
		);
		setState(prevState => ({
			...prevState,
			endDate: {
				value: localDate,
				textInput,
			},
			errors,
			errorMessage,
		}));
		onChange(event, { ...state, endDate: { value: localDate }, errors, errorMessage });
	}

	return (
		<DateRangeContext.Provider
			value={{
				startDate: state.startDate,
				endDate: state.endDate,
				inputManagement: {
					onStartChange: onStartInputChange,
					onEndChange: onEndInputChange,
					onFocus: onFocusChange,
					placeholder: props.dateFormat,
				},
				pickerManagement: {
					onStartChange,
					onEndChange,
				},
			}}
		>
			{props.children}
		</DateRangeContext.Provider>
	);
}
ContextualManager.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
};
ContextualManager.displayName = 'DateRange.Manager';
ContextualManager.propTypes = {
	children: PropTypes.element,
	startDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	endDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	dateFormat: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default ContextualManager;
