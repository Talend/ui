import { VALIDATE_ALL, VALIDATE_PARTIAL } from './constants';

export function validate(formName, errors) {
	return {
		type: VALIDATE_PARTIAL,
		formName,
		errors,
	};
}

export function validateAll(formName, errors) {
	return {
		type: VALIDATE_ALL,
		formName,
		errors,
	};
}
