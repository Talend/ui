import {
	TF_CREATE_FORM,
	TF_REMOVE_FORM,
	TF_UPDATE_FORM,
	TF_UPDATE_FORM_DATA,
	TF_UPDATE_FORM_DATA_ADD_ARRAY_ITEM,
	TF_UPDATE_FORM_DATA_REMOVE_ARRAY_ITEM,
	TF_UPDATE_FORM_DATA_REORDER_ARRAY_ITEM,
	TF_SET_ALL_ERRORS,
	TF_SET_PARTIAL_ERROR,
} from '../actions';
import { omit } from '../utils/properties';
import modelReducer from './model.reducer';
import validationsReducer from './validations.reducer';

/**
 * Form reducer, that manage multiple form state, identified by their formName
 * Format : {
 *      [formName]: {
 *          jsonSchema: {},
 *          uiSchema: [],
 *          properties: {},
 *          errors: {},
 *      },
 *      ...
 * }
 */
export default function formReducer(state = {}, action) {
	const form = state[action.formName];

	switch (action.type) {
	case TF_CREATE_FORM: {
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
	case TF_UPDATE_FORM: {
		const { jsonSchema, uiSchema, properties, errors } = action;
		if (!form || (!jsonSchema && !uiSchema && !properties && !errors)) {
			return state;
		}
		return {
			...state,
			[action.formName]: {
				jsonSchema: action.jsonSchema || form.jsonSchema,
				uiSchema: action.uiSchema || form.uiSchema,
				properties: action.properties || form.properties,
				errors: {
					...form.errors,
					...action.errors,
				},
			},
		};
	}
	case TF_REMOVE_FORM:
		return omit(state, action.formName);
	case TF_UPDATE_FORM_DATA:
	case TF_UPDATE_FORM_DATA_ADD_ARRAY_ITEM:
	case TF_UPDATE_FORM_DATA_REMOVE_ARRAY_ITEM:
	case TF_UPDATE_FORM_DATA_REORDER_ARRAY_ITEM:
	case TF_SET_ALL_ERRORS:
	case TF_SET_PARTIAL_ERROR: {
		if (!form) {
			return state;
		}
		return {
			...state,
			[action.formName]: {
				...form,
				properties: modelReducer(form.properties, action),
				errors: validationsReducer(form.errors, action),
			},
		};
	}
	default:
		return state;
	}
}
