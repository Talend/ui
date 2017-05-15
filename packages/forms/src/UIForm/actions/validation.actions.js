import { VALIDATE_ALL } from './constants';

export function validateAll(schema, properties, customValidationFn) {
	return {
		type: VALIDATE_ALL,
		schema,
		properties,
		customValidationFn,
	};
}
