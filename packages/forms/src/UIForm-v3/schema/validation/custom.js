export default function customRules(schema, customValidation, getValues) {
	if (!schema.customValidation || !customValidation) {
		return () => {};
	}

	return value => customValidation(schema, value, getValues({ nest: true }));
}
