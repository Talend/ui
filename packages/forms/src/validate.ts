import Ajv, { type ValidateFunction } from 'ajv';

import { FormDefinition } from './types';

export default function validate(
	jsonSchema: FormDefinition['jsonSchema'],
	data: Parameters<ValidateFunction>[0],
): ReturnType<ValidateFunction> {
	if (!data || !jsonSchema) {
		return false;
	}

	const validator = new Ajv().compile(jsonSchema);
	return validator && validator(data);
}
