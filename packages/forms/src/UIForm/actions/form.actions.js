import { CREATE_FORM, CHANGE_FORM, REMOVE_FORM } from './constants';

export function createForm(formName, jsonSchema, uiSchema, properties, errors) {
	return {
		type: CREATE_FORM,
		formName,
		jsonSchema,
		uiSchema,
		properties,
		errors,
	};
}

export function changeForm(formName, jsonSchema, uiSchema, properties, errors) {
	return {
		type: CHANGE_FORM,
		formName,
		jsonSchema,
		uiSchema,
		properties,
		errors,
	};
}

export function removeForm(formName) {
	return {
		type: REMOVE_FORM,
		formName,
	};
}
