import { TF_UPDATE_FORM_DATA } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function updateFormData(formName, schema, value) {
	return {
		type: TF_UPDATE_FORM_DATA,
		formName,
		schema,
		value,
	};
}
