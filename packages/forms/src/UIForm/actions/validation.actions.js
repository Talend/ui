import { TF_VALIDATE_ALL, TF_VALIDATE_PARTIAL } from './constants';

export function validate(formName, errors) {
	return {
		type: TF_VALIDATE_PARTIAL,
		formName,
		errors,
	};
}

export function validateAll(formName, errors) {
	return {
		type: TF_VALIDATE_ALL,
		formName,
		errors,
	};
}
