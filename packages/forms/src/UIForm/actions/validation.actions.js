import { TF_SET_ALL_ERRORS, TF_SET_PARTIAL_ERROR } from './constants';

export function setError(formName, errors) {
	return {
		type: TF_SET_PARTIAL_ERROR,
		formName,
		errors,
	};
}

export function setErrors(formName, errors) {
	return {
		type: TF_SET_ALL_ERRORS,
		formName,
		errors,
	};
}
