import Ajv from 'ajv';

export default function validate(jsonSchema, data) {
	if (!data || !jsonSchema) {
		return false;
	}
	const validator = new Ajv().compile(jsonSchema);
	const valid = validator(data);
	return valid;
}
