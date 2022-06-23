import Ajv from 'ajv';

import { FormDefinition } from './types';

export default function validate(
	jsonSchema: FormDefinition['jsonSchema'],
	data: Parameters<Ajv.ValidateFunction>[0],
): ReturnType<Ajv.ValidateFunction> {
	if (!data || !jsonSchema) {
		return false;
	}

	const validator = new Ajv().compile(jsonSchema);
	return validator && validator(data);
}
