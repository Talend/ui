import { TF_SET_ALL_ERRORS, TF_SET_PARTIAL_ERROR } from '../actions';

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
		default:
			return state;
	}
}
