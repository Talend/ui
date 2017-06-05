import { TF_UPDATE_FORM_DATA } from './constants';

export function updateFormData(formName, schema, value, error) {
	return {
		type: TF_UPDATE_FORM_DATA,
		error,
		formName,
		schema,
		value,
	};
}
