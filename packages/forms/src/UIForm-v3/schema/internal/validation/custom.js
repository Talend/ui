export default function customRules({ schema, customValidation, rhf }) {
	if (!schema.customValidation || !customValidation) {
		return () => {};
	}

	return value => customValidation(schema, value, rhf.getValues({ nest: true }));
}
