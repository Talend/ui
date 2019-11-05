import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';

import { START_DATE, END_DATE } from './constants';
import { extractDate, extractPartsFromTextInput, extractFromDate } from '../Date/date-extraction';

function extractParts(startDate, endDate, options) {
	const startDateParts = extractDate(startDate, options);
	const endDateParts = extractDate(endDate, options);

	return {
		startDate: startDateParts.localDate,
		startDateTextInput: startDateParts.textInput,
		endDate: endDateParts.localDate,
		endDateTextInput: endDateParts.textInput,
		errors: startDateParts.errors.concat(endDateParts.errors),
		errorMessage: startDateParts.errorMessage || endDateParts.errorMessage,
	};
}

function extractPartsFromDateRange(selectedDate, { startDate, endDate, focusedInput }, options) {
	const parts = extractFromDate(selectedDate, options);
	const dateParts = {};
	if (focusedInput === START_DATE) {
		if (endDate && isAfter(parts.date, endDate)) {
			dateParts.endDate = undefined;
			dateParts.endDateTextInput = '';
		}
		dateParts.startDate = parts.date;
		dateParts.startDateTextInput = parts.textInput;
		dateParts.focusedInput = END_DATE;
	} else if (focusedInput === END_DATE) {
		if (startDate && isBefore(parts.date, startDate)) {
			dateParts.startDate = parts.date;
			dateParts.startDateTextInput = parts.textInput;
			dateParts.focusedInput = START_DATE;
		} else {
			dateParts.endDate = parts.date;
			dateParts.endDateTextInput = parts.textInput;
			dateParts.focusedInput = startDate ? null : START_DATE;
		}
	}

	return dateParts;
}

function extractPartsFromTextInputRange(textInput, focusedInput, options) {
	const parts = extractPartsFromTextInput(textInput, options);
	const nextState = {};
	if (focusedInput === START_DATE) {
		nextState.startDate = parts.localDate;
		nextState.startDateTextInput = parts.textInput;
	} else if (focusedInput === END_DATE) {
		nextState.endDate = parts.localDate;
		nextState.endDateTextInput = parts.textInput;
	}
	nextState.errors = parts.errors;
	nextState.errorMessage = parts.errorMessage;

	return nextState;
}

export { extractParts, extractPartsFromDateRange, extractPartsFromTextInputRange };
