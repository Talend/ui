import { extractDate, extractPartsFromTextInput } from '../Date/date-extraction';

function extractParts(startDate, endDate, options) {
	const startDateValues = extractDate(startDate, options);
	const endDateValues = extractDate(endDate, options);

	return {
		startDate: startDateValues.date,
		startDateTextInput: startDateValues.textInput,
		endDate: endDateValues.date,
		endDateTextInput: endDateValues.textInput,
	};
}

function extractPartsFromTextInputRange(textInput, focusedInput, options) {
	const parts = extractPartsFromTextInput(textInput, options);
	const nextState = {};
	if (focusedInput === 'startDate') {
		nextState.startDate = parts.date;
		nextState.startDateTextInput = parts.textInput;
	} else if (focusedInput === 'endDate') {
		nextState.endDate = parts.date;
		nextState.endDateTextInput = parts.textInput;
	}
	nextState.errors = parts.errors;
	nextState.errorMessage = parts.errorMessage;

	return nextState;
}

export { extractParts, extractPartsFromTextInputRange };
