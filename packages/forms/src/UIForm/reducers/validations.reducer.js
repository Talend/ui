import { validate } from 'talend-json-schema-form-core';
import { MUTATE_VALUE, VALIDATE_ALL } from '../actions';
import { getValue } from '../utils/properties';

/**
 * Validate values.
 * @param schema The merged schema.
 * @param value The value.
 * @param properties The values.
 * @param customValidationFn A custom validation function
 * that is applied on schema.customValidation = true
 * @returns {object} The validation result.
 */
function validateValue(schema, value, properties, customValidationFn) {
	const staticResult = validate(schema, value);
	if (staticResult.valid && schema.customValidation && customValidationFn) {
		return customValidationFn(properties, schema, value);
	}
	return staticResult.valid ? null : staticResult.error.message;
}

/**
 * Validate values.
 * @param mergedSchema The merged schema array.
 * @param properties The values.
 * @param customValidationFn A custom validation function
 * that is applied on schema.customValidation = true
 * @returns {object} The validation result by field.
 */
function validateAll(mergedSchema, properties, customValidationFn) {
	const results = {};
	mergedSchema.forEach((schema) => {
		const { key, items } = schema;
		if (key) {
			const value = getValue(properties, key);
			const error = validateValue(schema, value, properties, customValidationFn);
			if (error) {
				results[key] = error;
			}
		}
		if (items) {
			const subResults = validateAll(items, properties);
			Object.assign(results, subResults);
		}
	});
	return results;
}

/**
 * Omit a property from an object
 * @param errors The object
 * @param key The key to omit
 */
function omit(errors, key) {
	if (!key) {
		return errors;
	}
	const result = {};
	Object.keys(errors)
		.filter(nextKey => nextKey !== key)
		.forEach((nextKey) => {
			result[nextKey] = errors[nextKey];
		});
	return result;
}

/**
 * Form validations reducer
 * @param state The errors { propertyKey: errorMessage }
 * @param action The action to perform
 */
export default function validations(state = {}, action) {
	switch (action.type) {
	case MUTATE_VALUE: {
		const { schema, value, properties, customValidationFn } = action;
		const error = validateValue(schema, value, properties, customValidationFn);
		if (error) {
			return {
				...state,
				[action.schema.key]: error,
			};
		}
		return omit(state, action.schema.key.toString());
	}
	case VALIDATE_ALL: {
		const { schema, properties, customValidationFn } = action;
		return validateAll(schema, properties, customValidationFn);
	}
	default:
		return state;
	}
}
