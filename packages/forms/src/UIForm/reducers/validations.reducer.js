import {
	TF_SET_ALL_ERRORS,
	TF_SET_PARTIAL_ERROR,
	TF_UPDATE_FORM_DATA,
	TF_UPDATE_FORM_DATA_REMOVE_ARRAY_ITEM,
	TF_UPDATE_FORM_DATA_REORDER_ARRAY_ITEM,
} from '../actions';
import { omit, omitAll } from '../utils/properties';

/**
 * Filter the errors from array which items are between a range
 * This returns only the keys within range.
 * @param errors The errors map
 * @param arrayKey The array key
 * @param minIndex The min item index (INCLUDED)
 * @param maxIndex The max item index (EXCLUDED)
 */
function filterArrayErrorsKeys(errors, arrayKey, minIndex, maxIndex) {
	const minArrayIndexKey = Number.isInteger(minIndex) && arrayKey.concat(minIndex).toString();
	const maxArrayIndexKey = Number.isInteger(maxIndex) && arrayKey.concat(maxIndex).toString();

	return Object.keys(errors)
		.filter(errorKey => errorKey.startsWith(arrayKey))
		.filter(errorKey => !minArrayIndexKey || errorKey >= minArrayIndexKey)
		.filter(errorKey => !maxArrayIndexKey || errorKey < maxArrayIndexKey)
		.sort();
}

/**
 * Given an error map:
 * Remove errors on array items if shouldRemoveIndex(index) is true
 * Shift the index of array items, where new index is getNextIndex(index)
 * @param state The errorMap
 * @param arrayKey The array key
 * @param minIndex The first index to manipulate
 * @param maxIndex The last (EXCLUDED) index to manipulate
 * @param shouldRemoveIndex Predicate to determine if this item errors should be removed
 * @param getNextIndex New index provider
 */
function shiftArrayErrorsKeys(
	state,
	{ arrayKey, minIndex, maxIndex, shouldRemoveIndex, getNextIndex }
) {
	// extract the errors included between the range
	const arrayErrorsToShiftOrRemove = filterArrayErrorsKeys(state, arrayKey, minIndex, maxIndex);

	// get all errors except those to remove or shift
	const errors = omitAll(state, arrayErrorsToShiftOrRemove);

	const indexPositionInKey = arrayKey.length;
	arrayErrorsToShiftOrRemove
		.map(errorKey => errorKey.split(','))
		// filter the index we want to remove (shouldRemoveIndex)
		.filter((errorKey) => {
			if (!shouldRemoveIndex) {
				return true;
			}
			const itemIndex = Number(errorKey[indexPositionInKey]);
			return !shouldRemoveIndex(itemIndex);
		})
		// shift the item index (getNextIndex)
		.map((oldErrorKey) => {
			const oldIndex = Number(oldErrorKey[indexPositionInKey]);
			const newErrorKey = oldErrorKey.slice(0);
			newErrorKey[indexPositionInKey] = getNextIndex(oldIndex);
			return [oldErrorKey, newErrorKey];
		})
		// populate the final error map
		.forEach(([oldErrorKey, newErrorKey]) => {
			errors[newErrorKey] = state[oldErrorKey];
		});

	return errors;
}

/**
 * Form validations reducer
 * @param state The errors { propertyKey: errorMessage }
 * @param action The action to perform
 */
export default function validations(state = {}, action) {
	switch (action.type) {

	case TF_SET_PARTIAL_ERROR: {
		if (Object.keys(action.errors).length === 0) {
			return state;
		}
		return {
			...state,
			...action.errors,
		};
	}

	case TF_SET_ALL_ERRORS: {
		return action.errors;
	}

	case TF_UPDATE_FORM_DATA: {
		const { schema, error } = action;
		if (error) {
			return {
				...state,
				[schema.key]: error,
			};
		}
		return omit(state, schema.key.toString());
	}

	case TF_UPDATE_FORM_DATA_REMOVE_ARRAY_ITEM: {
		return shiftArrayErrorsKeys(
			state,
			{
				arrayKey: action.schema.key,
				minIndex: action.index,
				shouldRemoveIndex(index) { return index === action.index; },
				getNextIndex(index) { return index - 1; },
			},
		);
	}

	case TF_UPDATE_FORM_DATA_REORDER_ARRAY_ITEM: {
		// determine the range [min, max[ of items to shift, with the pace
		const range = {};
		const switchPace = action.previousIndex - action.nextIndex;
		if (action.previousIndex < action.nextIndex) {
			range.min = action.previousIndex;
			range.max = action.nextIndex + 1;
		} else {
			range.min = action.nextIndex;
			range.max = action.previousIndex + 1;
		}

		return shiftArrayErrorsKeys(
			state,
			{
				arrayKey: action.schema.key,
				minIndex: range.min,
				maxIndex: range.max,
				getNextIndex(index) {
					return index === action.previousIndex ?
						action.nextIndex :
						index + switchPace;
				},
			},
		);
	}

	default:
		return state;
	}
}
