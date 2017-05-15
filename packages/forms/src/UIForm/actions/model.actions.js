import { MUTATE_VALUE } from './constants';

export function mutateValue(schema, value, properties, customValidationFn) {
	return {
		type: MUTATE_VALUE,
		customValidationFn,
		properties,
		schema,
		value,
	};
}
