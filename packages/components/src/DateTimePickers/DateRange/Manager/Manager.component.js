import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';

import { DateRangeContext } from '../Context';
import { START_DATE, END_DATE } from '../constants';
import {
	extractDate,
	extractFromDate,
	extractPartsFromTextInput,
} from '../../Date/date-extraction';

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

	function onDatesChange(event, nextState) {
		if (props.onChange) {
			const payload = {
				startDate: nextState.startDate.value,
				endDate: nextState.endDate.value,
				errors: nextState.errors,
				errorMessage: nextState.errorMessage,
				origin: 'RANGE_PICKER',
			};
			props.onChange(event, payload);
		}
	}

	function onFocusChange(event, focusedInput) {
		setState(prevState => ({
			...prevState,
			focusedInput,
		}));
	}

	function onStartChange(event, { date: startDate }) {
		const { date, textInput } = extractFromDate(startDate, options);
		const nextState = {};

		// clear endDate when new startDate is after existing endDate
		if (state.endDate.value && isAfter(date, state.endDate.value)) {
			nextState.endDate = {
				value: undefined,
				textInput: '',
			};
		}
		nextState.startDate = {
			value: date,
			textInput,
		};

		// move focus to endDate
		nextState.focusedInput = END_DATE;

		setState(prevState => ({
			...prevState,
			...nextState,
		}));
		onDatesChange(event, { ...state, ...nextState });
	}

	function onEndChange(event, { date: endDate }) {
		const { date, textInput } = extractFromDate(endDate, options);
		const nextState = {};

		// reset startDate when select a day before existing startDate
		if (state.startDate.value && isBefore(date, state.startDate.value)) {
			nextState.startDate = {
				value: date,
				textInput,
			};
		} else {
			nextState.endDate = {
				value: date,
				textInput,
			};

			// move focus to startDate is not selected yet
			nextState.focusedInput = state.startDate.value ? null : START_DATE;
		}
		setState(prevState => ({
			...prevState,
			...nextState,
		}));
		onDatesChange(event, { ...state, ...nextState });
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
		onDatesChange(event, { ...state, startDate: { value: localDate }, errors, errorMessage });
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
		onDatesChange(event, { ...state, endDate: { value: localDate }, errors, errorMessage });
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
					focusedInput: state.focusedInput,
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
