import { TF_CREATE_FORM, TF_CHANGE_FORM, TF_REMOVE_FORM } from './constants';

export function createForm(formName, jsonSchema, uiSchema, properties, errors) {
	return {
		type: TF_CREATE_FORM,
		formName,
		jsonSchema,
		uiSchema,
		properties,
		errors,
	};
}

export function changeForm(formName, jsonSchema, uiSchema, properties, errors) {
	return {
		type: TF_CHANGE_FORM,
		formName,
		jsonSchema,
		uiSchema,
		properties,
		errors,
	};
}

export function removeForm(formName) {
	return {
		type: TF_REMOVE_FORM,
		formName,
	};
}
