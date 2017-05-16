import { MUTATE_VALUE } from './constants';

export function mutateValue(formName, schema, value, error) {
	return {
		type: MUTATE_VALUE,
		error,
		formName,
		schema,
		value,
	};
}
