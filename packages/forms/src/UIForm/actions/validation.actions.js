import { VALIDATE_ALL } from './constants';

export function validateAll(formName, errors) {
	return {
		type: VALIDATE_ALL,
		formName,
		errors,
	};
}
