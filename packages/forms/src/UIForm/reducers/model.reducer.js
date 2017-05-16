import { MUTATE_VALUE } from '../actions';

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
	return {
		...properties,
		[nextKey]: mutateValue(properties[nextKey], restKeys, value),
	};
}

/**
 * Form model change reducer
 * @param state The model
 * @param action The action to perform
 */
export default function modelReducer(state = {}, action) {
	switch (action.type) {
	case MUTATE_VALUE:
		return mutateValue(state, action.schema.key, action.value);
	default:
		return state;
	}
}
