import { TF_UPDATE_FORM_DATA } from '../actions';

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
	default:
		return state;
	}
}
