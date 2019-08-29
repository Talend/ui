import { strToTime, checkTime } from '../DateTime/date-extraction';

export default function extractTime(selectedTime, useSeconds) {
	const errors = [];
	let time;
	if (!selectedTime) {
		return {
			time: null,
			textInput: '',
			errors: [],
			errorMessage: null,
		};
	}
	try {
		time = strToTime(selectedTime, useSeconds);
		checkTime(time);
	} catch (error) {
		errors.push(error);
	}

	return {
		time,
		textInput: selectedTime,
		errors,
		errorMessage: errors[0] ? errors[0].message : null,
	};
}
