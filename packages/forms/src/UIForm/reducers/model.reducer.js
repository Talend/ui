import {
	TF_UPDATE_FORM_DATA,
	TF_UPDATE_FORM_DATA_ADD_ARRAY_ITEM,
	TF_UPDATE_FORM_DATA_REMOVE_ARRAY_ITEM,
	TF_UPDATE_FORM_DATA_REORDER_ARRAY_ITEM,
} from '../actions';
import { getValue } from '../utils/properties';

/**
 * Mutate the properties, setting the value in the path identified by key
 * @param {object} properties The original properties store
 * @param {array} key The key chain (array of strings) to identify the path
 * @param {any} value The value to set
 * @returns {object} The new mutated properties store.
 */
function mutateValue(properties, key, value) {
	if (!key.length) {
		return value;
	}

	const nextKey = key[0];
	const restKeys = key.slice(1);
	const nextValue = mutateValue(properties[nextKey], restKeys, value);

	let nextProperties;
	if (properties instanceof Array) {
		nextProperties = properties.slice(0);
	} else {
		nextProperties = { ...properties };
	}

	nextProperties[nextKey] = nextValue;
	return nextProperties;
}

/**
 * Form model change reducer
 * @param state The model
 * @param action The action to perform
 */
export default function modelReducer(state = {}, action) {
	switch (action.type) {
	case TF_UPDATE_FORM_DATA:
		return mutateValue(state, action.schema.key, action.value);

	case TF_UPDATE_FORM_DATA_ADD_ARRAY_ITEM: {
		const arrayKey = action.schema.key;
		const arrayValue = getValue(state, arrayKey).slice(0);
		arrayValue.splice(action.index, 0, action.value);
		return mutateValue(state, arrayKey, arrayValue);
	}

	case TF_UPDATE_FORM_DATA_REMOVE_ARRAY_ITEM: {
		const arrayKey = action.schema.key;
		const arrayValue = getValue(state, arrayKey).slice(0);
		arrayValue.splice(action.index, 1);
		return mutateValue(state, arrayKey, arrayValue);
	}

	case TF_UPDATE_FORM_DATA_REORDER_ARRAY_ITEM: {
		const arrayKey = action.schema.key;
		const arrayValue = getValue(state, arrayKey).slice(0);
		const [item] = arrayValue.splice(action.previousIndex, 1);
		arrayValue.splice(action.nextIndex, 0, item);
		return mutateValue(state, arrayKey, arrayValue);
	}

	default:
		return state;
	}
}
