export default function customRules(schema, customValidation, values) {
	if (!schema.customValidation || !customValidation) {
		return null;
	}

	return value => customValidation(schema, value, values);
}
