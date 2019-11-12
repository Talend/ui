import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';

import { START_DATE, END_DATE } from './constants';
import { extractDate, extractPartsFromTextInput, extractFromDate } from '../Date/date-extraction';

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

function extractRangePartsFromDate(selectedDate, { startDate, endDate, focusedInput }, options) {
	const { date, textInput, errors, errorMessage } = extractFromDate(selectedDate, options);
	const rangeParts = {};

	if (focusedInput === START_DATE) {
		// clear endDate when new startDate is after existing endDate
		if (endDate.value && isAfter(date, endDate.value)) {
			rangeParts.endDate = {
				value: undefined,
				textInput: '',
			};
		}

		rangeParts.startDate = {
			value: date,
			textInput,
		};

		// move focus to endDate
		rangeParts.focusedInput = END_DATE;
	} else if (focusedInput === END_DATE) {
		// reset startDate when select a day before existing startDate
		if (startDate.value && isBefore(date, startDate.value)) {
			rangeParts.startDate = {
				value: date,
				textInput,
			};
		} else {
			rangeParts.endDate = {
				value: date,
				textInput,
			};

			// move focus to startDate is not selected yet
			rangeParts.focusedInput = startDate.value ? null : START_DATE;
		}
	}
	rangeParts.errors = errors;
	rangeParts.errorMessage = errorMessage;

	return rangeParts;
}

function extractRangePartsFromTextInput(userInput, focusedInput, options) {
	const { localDate, textInput, errors, errorMessage } = extractPartsFromTextInput(
		userInput,
		options,
	);
	const rangeParts = {};
	if (focusedInput === START_DATE) {
		rangeParts.startDate = {
			value: localDate,
			textInput,
		};
	} else if (focusedInput === END_DATE) {
		rangeParts.endDate = {
			value: localDate,
			textInput,
		};
	}
	rangeParts.errors = errors;
	rangeParts.errorMessage = errorMessage;

	return rangeParts;
}

export { extractRangeParts, extractRangePartsFromDate, extractRangePartsFromTextInput };
