import { validate } from 'talend-json-schema-form-core';

import { getValue } from './propertiesNavigator';

/**
 * Validate values. This supports only 1 level of fields for now
 * @param mergedSchema The merged schema.
 * @param properties The values.
 * @returns {object} The validation result by field.
 */
export default function validateAll(mergedSchema, properties) {
	const validations = {};
	mergedSchema.forEach((schema) => {
		validations[schema.key] = validate(
			schema,
			getValue(properties, schema.key)
		);
	});
	return validations;
}
