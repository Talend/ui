import { TF_MUTATE_VALUE, TF_VALIDATE_ALL, TF_VALIDATE_PARTIAL } from '../actions';
import { omit } from '../utils/properties';

/**
 * Form validations reducer
 * @param state The errors { propertyKey: errorMessage }
 * @param action The action to perform
 */
export default function validations(state = {}, action) {
	switch (action.type) {
	case TF_MUTATE_VALUE: {
		const { schema, error } = action;
		if (error) {
			return {
				...state,
				[schema.key]: error,
			};
		}
		return omit(state, schema.key.toString());
	}
	case TF_VALIDATE_PARTIAL: {
		if (Object.keys(action.errors).length === 0) {
			return state;
		}
		return {
			...state,
			...action.errors,
		};
	}
	case TF_VALIDATE_ALL: {
		return action.errors;
	}
	default:
		return state;
	}
}
