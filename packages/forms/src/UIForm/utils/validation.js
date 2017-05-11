import { validate } from 'talend-json-schema-form-core';

import { getValue } from './properties';

/**
 * Validate values.
 * @param mergedSchema The merged schema.
 * @param properties The values.
 * @returns {object} The validation result by field.
 */
export default function validateAll(mergedSchema, properties) {
	const validations = {};
	mergedSchema.forEach((schema) => {
		const { key, items } = schema;
		if (key) {
			validations[key] = validate(
				schema,
				getValue(properties, key)
			);
		}
		if (items) {
			const subValidations = validateAll(items, properties);
			Object.assign(validations, subValidations);
		}
	});
	return validations;
}
