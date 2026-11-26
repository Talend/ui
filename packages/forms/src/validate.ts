import Ajv, { type ValidateFunction } from 'ajv';
import { createSafeRegExp } from '@talend/json-schema-form-core';

import { FormDefinition } from './types';

// Ajv evaluates `pattern` and `patternProperties` using the linear-time RE2 engine (re2js)
// so pathological patterns cannot trigger catastrophic backtracking (ReDoS).
const safeRegExp = Object.assign(
	(pattern: string, flags: string) => createSafeRegExp(pattern, flags),
	{ code: 'createSafeRegExp' },
);

export default function validate(
	jsonSchema: FormDefinition['jsonSchema'],
	data: Parameters<ValidateFunction>[0],
): ReturnType<ValidateFunction> {
	if (!data || !jsonSchema) {
		return false;
	}

	const validator = new Ajv({ code: { regExp: safeRegExp } }).compile(jsonSchema);
	return validator && validator(data);
}
