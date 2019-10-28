import { extractDate, extractPartsFromTextInput } from '../Date/date-extraction';

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

function extractPartsFromTextInputRange(textInput, focusedInput, options) {
	const parts = extractPartsFromTextInput(textInput, options);
	const nextState = {};
	if (focusedInput === 'startDate') {
		nextState.startDate = parts.localDate;
		nextState.startDateTextInput = parts.textInput;
	} else if (focusedInput === 'endDate') {
		nextState.endDate = parts.localDate;
		nextState.endDateTextInput = parts.textInput;
	}
	nextState.errors = parts.errors;
	nextState.errorMessage = parts.errorMessage;

	return nextState;
}

export { extractParts, extractPartsFromTextInputRange };
