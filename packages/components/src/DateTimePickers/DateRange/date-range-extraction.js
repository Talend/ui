import { extractDate } from '../Date/date-extraction';

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

export { extractParts };
