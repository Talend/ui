import {
	TF_SET_ALL_ERRORS,
	TF_SET_PARTIAL_ERROR,
	TF_UPDATE_FORM_DATA,
} from '../actions';
import { omit } from '../utils/properties';

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

	default:
		return state;
	}
}
