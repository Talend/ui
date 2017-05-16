import { CREATE_FORM, REMOVE_FORM } from './constants';

export function createForm(formName, properties) {
	return {
		type: CREATE_FORM,
		formName,
		properties,
	};
}

export function removeForm(formName) {
	return {
		type: REMOVE_FORM,
		formName,
	};
}
