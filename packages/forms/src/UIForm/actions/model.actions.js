import {
	TF_UPDATE_FORM_DATA,
	TF_UPDATE_FORM_DATA_ADD_ARRAY_ITEM,
	TF_UPDATE_FORM_DATA_REMOVE_ARRAY_ITEM,
	TF_UPDATE_FORM_DATA_REORDER_ARRAY_ITEM,
} from './constants';

export function updateFormData(formName, schema, value, error) {
	return {
		type: TF_UPDATE_FORM_DATA,
		error,
		formName,
		schema,
		value,
	};
}

export function updateFormDataAddArrayItem(formName, schema, index, value) {
	return {
		type: TF_UPDATE_FORM_DATA_ADD_ARRAY_ITEM,
		formName,
		index,
		schema,
		value,
	};
}

export function updateFormDataRemoveArrayItem(formName, schema, index) {
	return {
		type: TF_UPDATE_FORM_DATA_REMOVE_ARRAY_ITEM,
		formName,
		schema,
		index,
	};
}

export function updateFormDataReorderArrayItem(formName, schema, previousIndex, nextIndex) {
	return {
		type: TF_UPDATE_FORM_DATA_REORDER_ARRAY_ITEM,
		formName,
		schema,
		previousIndex,
		nextIndex,
	};
}
