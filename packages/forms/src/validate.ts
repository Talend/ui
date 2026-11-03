import Ajv, { type ValidateFunction } from 'ajv';
import { isSafePattern } from '@talend/json-schema-form-core';

import { FormDefinition } from './types';

// Ajv evaluates `pattern` with the native backtracking RegExp: refuse the ones that may trigger ReDoS.
const safeRegExp = Object.assign(
	(pattern: string, flags: string) => {
		if (!isSafePattern(pattern)) {
			throw new Error(`Unsafe pattern: ${pattern}`);
		}
		return new RegExp(pattern, flags);
	},
	{ code: 'new RegExp' },
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
