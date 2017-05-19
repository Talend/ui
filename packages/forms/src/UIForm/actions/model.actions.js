import { TF_MUTATE_VALUE } from './constants';

export function mutateValue(formName, schema, value, error) {
	return {
		type: TF_MUTATE_VALUE,
		error,
		formName,
		schema,
		value,
	};
}
