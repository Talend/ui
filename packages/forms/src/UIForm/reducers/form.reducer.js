import { CREATE_FORM, REMOVE_FORM, MUTATE_VALUE, VALIDATE_ALL } from '../actions';
import { omit } from '../utils/properties';
import modelReducer from './model.reducer';
import validationsReducer from './validations.reducer';

/**
 * Form reducer, that manage multiple form state.
 * Format : {
 *      [form_name]: {
 *          properties: {},
 *          errors: {},
 *      },
 *      ...
 * }
 */
export default function formReducer(state = {}, action) {
	switch (action.type) {
	case CREATE_FORM: {
		const form = state[action.formName];
		if (form) {
			return state;
		}
		return {
			...state,
			[action.formName]: {
				properties: action.properties || {},
				errors: action.errors || {},
			},
		};
	}
	case REMOVE_FORM:
		return omit(state, action.formName);
	case MUTATE_VALUE:
	case VALIDATE_ALL: {
		const form = state[action.formName];
		if (!form) {
			return state;
		}
		return {
			...state,
			[action.formName]: {
				properties: modelReducer(form.properties, action),
				errors: validationsReducer(form.errors, action),
			},
		};
	}
	default:
		return state;
	}
}
