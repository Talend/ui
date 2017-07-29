import { validate } from 'talend-json-schema-form-core';
import { getValue, omitAll } from '../utils/properties';

/**
 * Validate a value.
 * @param schema The merged schema.
 * @param value The value.
 * @param properties The values.
 * @param customValidationFn A custom validation function.
 * that is applied on schema.customValidation = true.
 * @returns {object} The validation result.
 */
export function validateValue(schema, value, properties, customValidationFn) {
	const staticResult = validate(schema, value);
	if (staticResult.valid && schema.customValidation && customValidationFn) {
		return customValidationFn(schema, value, properties);
	}
	return staticResult.valid ? null : staticResult.error.message;
}

/**
 * Validate an array.
 * @param mergedSchema The array schema.
 * @param value The value.
 * @param properties All the values.
 * @param customValidationFn A custom validation function.
 * that is applied on schema.customValidation = true.
 * @param deepValidation Validate the array values if set to true.
 * @returns {object} The validation result.
 */
export function validateArray(mergedSchema, value, properties, customValidationFn, deepValidation) {
	const results = {};
	const { key, items } = mergedSchema;

	// validate array definition, not its sub-items here
	const schemaWithoutItems = {
		...mergedSchema,
		schema: {
			...mergedSchema.schema,
			items: [],
		},
	};
	const error = validateValue(schemaWithoutItems, value, properties, customValidationFn);
	if (error) {
		results[key] = error;
	}

	// validate each value of the array
	if (deepValidation && value) {
		for (let valueIndex = 0; valueIndex < value.length; valueIndex += 1) {
			// adapt items schema with value index
			const indexedItems = items.map((item) => {
				const indexedKey = [...item.key];
				indexedKey[key.length] = valueIndex;
				return {
					...item,
					key: indexedKey,
				};
			});
			// eslint-disable-next-line no-use-before-define
			const subResults = validateAll(indexedItems, properties, customValidationFn);
			Object.assign(results, subResults);
		}
	}

	return results;
}

/**
 * Validate a simple value.
 * @param mergedSchema The schema to validate.
 * @param value The value.
 * @param properties All the values.
 * @param customValidationFn A custom validation function.
 * that is applied on schema.customValidation = true.
 * @param deepValidation Validate subItems if true.
 * @returns {object} The validation result.
 */
export function validateSimple(
	mergedSchema,
	value,
	properties,
	customValidationFn,
	deepValidation
) {
	const results = {};
	const { key, items } = mergedSchema;

	const error = validateValue(mergedSchema, value, properties, customValidationFn);
	if (error) {
		results[key] = error;
	}
	if (deepValidation && items) {
		// eslint-disable-next-line no-use-before-define
		const subResults = validateAll(items, properties, customValidationFn);
		Object.assign(results, subResults);
	}

	return results;
}

/**
 * Execute the right validation depending on the schema type.
 * @param mergedSchema The merged schema.
 * @param value The value.
 * @param properties All the values.
 * @param customValidationFn A custom validation function.
 * that is applied on schema.customValidation = true.
 * @param deepValidation Validate subItems if true.
 * @returns {Object} The validation result by field.
 */
export function validateSingle(
	mergedSchema,
	value,
	properties,
	customValidationFn,
	deepValidation
) {
	if (mergedSchema.type === 'array') {
		return validateArray(mergedSchema, value, properties, customValidationFn, deepValidation);
	}

	return validateSimple(mergedSchema, value, properties, customValidationFn, deepValidation);
}

/**
 * Validate all values in the schema.
 * @param mergedSchema The merged schema array.
 * @param properties The values.
 * @param customValidationFn A custom validation function
 * that is applied on schema.customValidation = true.
 * @returns {object} The validation result by field.
 */
export function validateAll(mergedSchema, properties, customValidationFn) {
	const results = {};
	mergedSchema.forEach((schema) => {
		const { key } = schema;
		const value = key && getValue(properties, key);
		const subResults = validateSingle(
			schema,
			value,
			properties,
			customValidationFn,
			true /* deep validation */
		);
		Object.assign(results, subResults);
	});
	return results;
}

/**
 * Check if a schema value is valid.
 * It is invalid if :
 * - the schema is an invalid field (errors[key] is falsy)
 * - the schema has items (ex: fieldset, tabs, ...), and at least one of them is invalid
 * @param schema The schema.
 * @param errors The errors.
 * @returns {boolean} true if it is invalid, false otherwise.
 */
export function isValid(schema, errors) {
	const { key, items } = schema;
	if (key && errors[key]) {
		return false;
	}

	if (items) {
		for (const itemSchema of items) {
			if (!isValid(itemSchema, errors)) {
				return false;
			}
		}
	}

	return true;
}

/**
 * Filter the errors on array which items indexes are between a range
 * This returns only the errors keys.
 * @param errors The errors map
 * @param arrayKey The array key
 * @param minIndex The min item index (INCLUDED)
 * @param maxIndex The max item index (EXCLUDED)
 */
export function filterArrayErrorsKeys(errors, arrayKey, minIndex, maxIndex) {
	const minArrayIndexKey = Number.isInteger(minIndex) && arrayKey.concat(minIndex).toString();
	const maxArrayIndexKey = Number.isInteger(maxIndex) && arrayKey.concat(maxIndex).toString();

	return Object.keys(errors)
		.filter(errorKey => errorKey.startsWith(arrayKey))
		.filter(errorKey => !minArrayIndexKey || errorKey >= minArrayIndexKey)
		.filter(errorKey => !maxArrayIndexKey || errorKey < maxArrayIndexKey);
}

/**
 * Given an error map:
 * Remove errors on array items if shouldRemoveIndex(index) is true
 * Shift the index of array items, where new index is getNextIndex(index)
 * @param oldErrors The errorMap
 * @param arrayKey The array key
 * @param minIndex The first index to manipulate
 * @param maxIndex The last (EXCLUDED) index to manipulate
 * @param shouldRemoveIndex Predicate to determine if this item errors should be removed
 * @param getNextIndex New index provider
 */
export function shiftArrayErrorsKeys(
	oldErrors,
	{ arrayKey, minIndex, maxIndex, shouldRemoveIndex, getNextIndex }
) {
	// extract the errors included between the range
	const arrayErrorsToShiftOrRemove = filterArrayErrorsKeys(oldErrors, arrayKey, minIndex, maxIndex);

	// get all errors except those to remove or shift
	const errors = omitAll(oldErrors, arrayErrorsToShiftOrRemove);

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
			errors[newErrorKey] = oldErrors[oldErrorKey];
		});

	return errors;
}
