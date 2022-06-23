import Ajv from 'ajv';

export default function validate(
	jsonSchema: object,
	data: Parameters<Ajv.ValidateFunction>[0],
): ReturnType<Ajv.ValidateFunction> {
	if (!data || !jsonSchema) {
		return false;
	}

	const validator = new Ajv().compile(jsonSchema);
	return validator && validator(data);
}
