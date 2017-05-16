import { MUTATE_VALUE, VALIDATE_ALL } from '../actions';
import { omit } from '../utils/properties';

/**
 * Form validations reducer
 * @param state The errors { propertyKey: errorMessage }
 * @param action The action to perform
 */
export default function validations(state = {}, action) {
	switch (action.type) {
	case MUTATE_VALUE: {
		const { schema, error } = action;
		if (error) {
			return {
				...state,
				[schema.key]: error,
			};
		}
		return omit(state, schema.key.toString());
	}
	case VALIDATE_ALL: {
		return action.errors;
	}
	default:
		return state;
	}
}
