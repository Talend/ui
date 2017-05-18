import {
	CREATE_FORM,
	CHANGE_FORM,
	REMOVE_FORM,
	MUTATE_VALUE,
	VALIDATE_ALL,
	VALIDATE_PARTIAL,
} from '../actions';
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
				jsonSchema: action.jsonSchema,
				uiSchema: action.uiSchema,
				properties: action.properties || {},
				errors: action.errors || {},
			},
		};
	}
	case CHANGE_FORM: {
		const form = state[action.formName];
		if (!form) {
			return state;
		}
		return {
			...state,
			[action.formName]: {
				jsonSchema: action.jsonSchema || form.jsonSchema,
				uiSchema: action.uiSchema || form.uiSchema,
				properties: action.properties || form.properties,
				errors: action.errors || form.errors,
			},
		};
	}
	case REMOVE_FORM:
		return omit(state, action.formName);
	case MUTATE_VALUE:
	case VALIDATE_PARTIAL:
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
